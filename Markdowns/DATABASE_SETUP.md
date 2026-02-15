# BarStock Database Setup Guide

This guide explains how to migrate BarStock from localStorage to a database backend.

## Architecture Overview

- **Frontend**: HTML/CSS/JavaScript (remains in browser)
- **Backend**: Node.js + Express server
- **Database**: SQLite (automatically created)
- **Communication**: REST API

```
┌─────────────────┐
│   HTML/Browser  │
│   (index.html)  │
└────────┬────────┘
         │ HTTP Requests (api.js)
         ↓
┌─────────────────┐
│  Express Server │
│  (server.js)    │
└────────┬────────┘
         │ SQL Queries
         ↓
┌─────────────────┐
│   SQLite DB     │
│ (barstock.db)   │
└─────────────────┘
```

## Installation & Setup

### Step 1: Install Node.js
Download and install from: https://nodejs.org/ (LTS version recommended)

### Step 2: Install Dependencies
Open PowerShell in the BarStock directory and run:

```powershell
npm install
```

This will install:
- **express**: Web server framework
- **sqlite3**: Database driver
- **cors**: Cross-origin resource sharing
- **nodemon**: Auto-restart server during development (optional)

### Step 3: Start the Server
Run one of the following commands:

**Production mode:**
```powershell
npm start
```

**Development mode (auto-restarts on file changes):**
```powershell
npm run dev
```

The server will start at `http://localhost:3000`

You should see:
```
Connected to SQLite database
Cocktails table initialized
Ingredients table initialized
Steps table initialized
Inventory table initialized
BarStock server running at http://localhost:3000
```

### Step 4: Open the App
Open `index.html` in your browser (or navigate to `http://localhost:3000`)

## Database Schema

### Cocktails Table
```sql
CREATE TABLE cocktails (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    category TEXT NOT NULL,
    baseSpirit TEXT NOT NULL,
    image TEXT,
    color TEXT,
    source TEXT,
    createdAt DATETIME,
    updatedAt DATETIME
)
```

### Ingredients Table
```sql
CREATE TABLE ingredients (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cocktailId INTEGER NOT NULL,
    name TEXT NOT NULL,
    amount TEXT NOT NULL,
    unit TEXT,
    FOREIGN KEY (cocktailId) REFERENCES cocktails(id)
)
```

### Steps Table
```sql
CREATE TABLE steps (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cocktailId INTEGER NOT NULL,
    stepNumber INTEGER NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (cocktailId) REFERENCES cocktails(id)
)
```

### Inventory Table
```sql
CREATE TABLE inventory (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    category TEXT,
    brand TEXT,
    volume INTEGER,
    abv REAL,
    sugarContent REAL,
    year INTEGER,
    image TEXT,
    createdAt DATETIME,
    updatedAt DATETIME
)
```

## API Endpoints

### Cocktails
- `GET /api/cocktails` - Get all cocktails
- `GET /api/cocktails/:id` - Get single cocktail
- `POST /api/cocktails` - Create cocktail
- `PUT /api/cocktails/:id` - Update cocktail
- `DELETE /api/cocktails/:id` - Delete cocktail

### Inventory
- `GET /api/inventory` - Get all items
- `GET /api/inventory/:id` - Get single item
- `POST /api/inventory` - Create item
- `PUT /api/inventory/:id` - Update item
- `DELETE /api/inventory/:id` - Delete item

## Code Changes in index.html

The following changes were made to use the database:

### Before (localStorage):
```javascript
let cocktails = JSON.parse(localStorage.getItem('cocktails')) || [];
localStorage.setItem('cocktails', JSON.stringify(cocktails));
```

### After (Database API):
```javascript
let cocktails = await getCocktails();
await createCocktail(cocktailData);
await updateCocktail(id, cocktailData);
await deleteCocktail(id);
```

## Migration from localStorage

The app will still use localStorage for theme preferences, but all cocktails and inventory data will be stored in the database.

### To migrate existing data:
1. Start the server (`npm start`)
2. Export your data from the old version (💾 buttons in header)
3. The app will automatically fetch data from the database
4. You can import previously exported JSON files if needed

## Troubleshooting

### "Cannot GET /api/cocktails"
- Make sure the server is running (`npm start`)
- Check that the URL is `http://localhost:3000` (not just the HTML file)

### "EADDRINUSE: address already in use :::3000"
- Another app is using port 3000
- Kill the process: `netstat -ano | findstr :3000` then `taskkill /PID <PID> /F`
- Or change PORT in server.js

### Database file not created
- Check file permissions in the BarStock directory
- Make sure you have write access

### "Module not found: 'express'"
- Run `npm install` again
- Check that package.json exists in the BarStock directory

## Upgrading to PostgreSQL

To use PostgreSQL instead of SQLite:

1. Install PostgreSQL: https://www.postgresql.org/download/
2. Create a database: `CREATE DATABASE barstock;`
3. Update server.js to use `pg` package instead of `sqlite3`
4. Update connection string and queries

## Performance Optimization

For better performance in production:
- Add indexes to frequently queried columns
- Use connection pooling
- Add caching layer (Redis)
- Implement pagination for large datasets

## Security Notes

For production deployment:
- Add authentication/authorization
- Use HTTPS instead of HTTP
- Add input validation and sanitization
- Use environment variables for sensitive config
- Add rate limiting
- Enable CORS only for trusted origins

## File Structure

```
BarStock/
├── index.html           (Frontend HTML)
├── barstock-styles.css  (Styling)
├── api.js              (Frontend API calls)
├── server.js           (Backend Express server)
├── package.json        (Node.js dependencies)
├── barstock.db         (SQLite database - auto-created)
├── README.md           (This file)
└── ...
```

## Next Steps

1. Install Node.js
2. Run `npm install`
3. Run `npm start`
4. Open the app in your browser
5. Start managing cocktails and inventory!
