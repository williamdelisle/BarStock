const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// Initialize SQLite Database
const db = new sqlite3.Database(path.join(__dirname, 'barstock.db'), (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to SQLite database');
        initializeDatabase();
    }
});

// Initialize database tables
function initializeDatabase() {
    // Create cocktails table
    db.run(`
        CREATE TABLE IF NOT EXISTS cocktails (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            category TEXT NOT NULL,
            baseSpirit TEXT NOT NULL,
            image TEXT,
            color TEXT,
            source TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) console.error('Error creating cocktails table:', err.message);
        else console.log('Cocktails table initialized');
    });

    // Create ingredients table
    db.run(`
        CREATE TABLE IF NOT EXISTS ingredients (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cocktailId INTEGER NOT NULL,
            name TEXT NOT NULL,
            amount TEXT NOT NULL,
            unit TEXT,
            FOREIGN KEY (cocktailId) REFERENCES cocktails(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) console.error('Error creating ingredients table:', err.message);
        else console.log('Ingredients table initialized');
    });

    // Create steps table
    db.run(`
        CREATE TABLE IF NOT EXISTS steps (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            cocktailId INTEGER NOT NULL,
            stepNumber INTEGER NOT NULL,
            description TEXT NOT NULL,
            FOREIGN KEY (cocktailId) REFERENCES cocktails(id) ON DELETE CASCADE
        )
    `, (err) => {
        if (err) console.error('Error creating steps table:', err.message);
        else console.log('Steps table initialized');
    });

    // Create inventory table
    db.run(`
        CREATE TABLE IF NOT EXISTS inventory (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL UNIQUE,
            category TEXT,
            brand TEXT,
            volume INTEGER,
            abv REAL,
            sugarContent REAL,
            year INTEGER,
            image TEXT,
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `, (err) => {
        if (err) console.error('Error creating inventory table:', err.message);
        else console.log('Inventory table initialized');
    });
}

// ==================== COCKTAIL ENDPOINTS ====================

// GET all cocktails with their ingredients and steps
app.get('/api/cocktails', (req, res) => {
    db.all(`
        SELECT c.id, c.name, c.category, c.baseSpirit, c.image, c.color, c.source
        FROM cocktails c
        ORDER BY c.name
    `, (err, cocktails) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        // Fetch ingredients and steps for each cocktail
        let completedCocktails = 0;
        const results = cocktails.map(cocktail => {
            return new Promise((resolve) => {
                let fetchedIngredients = false;
                let fetchedSteps = false;

                // Fetch ingredients
                db.all(
                    `SELECT name, amount, unit FROM ingredients WHERE cocktailId = ? ORDER BY id`,
                    [cocktail.id],
                    (err, ingredients) => {
                        cocktail.ingredients = ingredients || [];
                        fetchedIngredients = true;
                        if (fetchedIngredients && fetchedSteps) resolve(cocktail);
                    }
                );

                // Fetch steps
                db.all(
                    `SELECT description FROM steps WHERE cocktailId = ? ORDER BY stepNumber`,
                    [cocktail.id],
                    (err, steps) => {
                        cocktail.steps = steps ? steps.map(s => s.description) : [];
                        fetchedSteps = true;
                        if (fetchedIngredients && fetchedSteps) resolve(cocktail);
                    }
                );
            });
        });

        Promise.all(results).then(completedCocktails => {
            res.json(completedCocktails);
        });
    });
});

// GET single cocktail
app.get('/api/cocktails/:id', (req, res) => {
    const { id } = req.params;
    
    db.get(
        `SELECT * FROM cocktails WHERE id = ?`,
        [id],
        (err, cocktail) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!cocktail) return res.status(404).json({ error: 'Cocktail not found' });

            db.all(
                `SELECT name, amount, unit FROM ingredients WHERE cocktailId = ? ORDER BY id`,
                [id],
                (err, ingredients) => {
                    db.all(
                        `SELECT description FROM steps WHERE cocktailId = ? ORDER BY stepNumber`,
                        [id],
                        (err, steps) => {
                            cocktail.ingredients = ingredients || [];
                            cocktail.steps = steps ? steps.map(s => s.description) : [];
                            res.json(cocktail);
                        }
                    );
                }
            );
        }
    );
});

// POST create cocktail
app.post('/api/cocktails', (req, res) => {
    const { name, category, baseSpirit, image, color, source, ingredients, steps } = req.body;

    if (!name || !category || !baseSpirit) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    db.run(
        `INSERT INTO cocktails (name, category, baseSpirit, image, color, source)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [name, category, baseSpirit, image || null, color, source || 'User Created'],
        function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'A cocktail with this name already exists' });
                }
                return res.status(500).json({ error: err.message });
            }

            const cocktailId = this.lastID;

            // Insert ingredients
            ingredients.forEach((ing, index) => {
                db.run(
                    `INSERT INTO ingredients (cocktailId, name, amount, unit)
                     VALUES (?, ?, ?, ?)`,
                    [cocktailId, ing.name, ing.amount, ing.unit || '']
                );
            });

            // Insert steps
            steps.forEach((step, index) => {
                db.run(
                    `INSERT INTO steps (cocktailId, stepNumber, description)
                     VALUES (?, ?, ?)`,
                    [cocktailId, index + 1, step]
                );
            });

            res.status(201).json({
                id: cocktailId,
                name,
                category,
                baseSpirit,
                image: image || null,
                color,
                source: source || 'User Created',
                ingredients,
                steps
            });
        }
    );
});

// PUT update cocktail
app.put('/api/cocktails/:id', (req, res) => {
    const { id } = req.params;
    const { name, category, baseSpirit, image, color, source, ingredients, steps } = req.body;

    db.run(
        `UPDATE cocktails
         SET name = ?, category = ?, baseSpirit = ?, image = ?, color = ?, source = ?, updatedAt = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [name, category, baseSpirit, image || null, color, source, id],
        function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'A cocktail with this name already exists' });
                }
                return res.status(500).json({ error: err.message });
            }

            // Delete old ingredients and steps
            db.run(`DELETE FROM ingredients WHERE cocktailId = ?`, [id]);
            db.run(`DELETE FROM steps WHERE cocktailId = ?`, [id]);

            // Insert new ingredients
            ingredients.forEach((ing) => {
                db.run(
                    `INSERT INTO ingredients (cocktailId, name, amount, unit)
                     VALUES (?, ?, ?, ?)`,
                    [id, ing.name, ing.amount, ing.unit || '']
                );
            });

            // Insert new steps
            steps.forEach((step, index) => {
                db.run(
                    `INSERT INTO steps (cocktailId, stepNumber, description)
                     VALUES (?, ?, ?)`,
                    [id, index + 1, step]
                );
            });

            res.json({
                id: parseInt(id),
                name,
                category,
                baseSpirit,
                image: image || null,
                color,
                source,
                ingredients,
                steps
            });
        }
    );
});

// DELETE cocktail
app.delete('/api/cocktails/:id', (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM cocktails WHERE id = ?`, [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Cocktail not found' });

        res.json({ message: 'Cocktail deleted successfully' });
    });
});

// ==================== INVENTORY ENDPOINTS ====================

// GET all inventory items
app.get('/api/inventory', (req, res) => {
    db.all(
        `SELECT * FROM inventory ORDER BY name`,
        (err, items) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json(items || []);
        }
    );
});

// GET single inventory item
app.get('/api/inventory/:id', (req, res) => {
    const { id } = req.params;

    db.get(
        `SELECT * FROM inventory WHERE id = ?`,
        [id],
        (err, item) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!item) return res.status(404).json({ error: 'Inventory item not found' });
            res.json(item);
        }
    );
});

// POST create inventory item
app.post('/api/inventory', (req, res) => {
    const { name, category, brand, volume, abv, sugarContent, year, image } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Name is required' });
    }

    db.run(
        `INSERT INTO inventory (name, category, brand, volume, abv, sugarContent, year, image)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [name, category || null, brand || null, volume || null, abv || null, sugarContent || null, year || null, image || null],
        function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'An item with this name already exists' });
                }
                return res.status(500).json({ error: err.message });
            }

            res.status(201).json({
                id: this.lastID,
                name,
                category: category || null,
                brand: brand || null,
                volume: volume || null,
                abv: abv || null,
                sugarContent: sugarContent || null,
                year: year || null,
                image: image || null
            });
        }
    );
});

// PUT update inventory item
app.put('/api/inventory/:id', (req, res) => {
    const { id } = req.params;
    const { name, category, brand, volume, abv, sugarContent, year, image } = req.body;

    db.run(
        `UPDATE inventory
         SET name = ?, category = ?, brand = ?, volume = ?, abv = ?, sugarContent = ?, year = ?, image = ?, updatedAt = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [name, category || null, brand || null, volume || null, abv || null, sugarContent || null, year || null, image || null, id],
        function(err) {
            if (err) {
                if (err.message.includes('UNIQUE constraint failed')) {
                    return res.status(400).json({ error: 'An item with this name already exists' });
                }
                return res.status(500).json({ error: err.message });
            }

            res.json({
                id: parseInt(id),
                name,
                category: category || null,
                brand: brand || null,
                volume: volume || null,
                abv: abv || null,
                sugarContent: sugarContent || null,
                year: year || null,
                image: image || null
            });
        }
    );
});

// DELETE inventory item
app.delete('/api/inventory/:id', (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM inventory WHERE id = ?`, [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Inventory item not found' });

        res.json({ message: 'Inventory item deleted successfully' });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`BarStock server running at http://localhost:${PORT}`);
});
