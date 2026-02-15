// API Configuration
const API_BASE_URL = 'http://localhost:3000/api';

// ==================== COCKTAIL API CALLS ====================

async function getCocktails() {
    try {
        const response = await fetch(`${API_BASE_URL}/cocktails`);
        if (!response.ok) throw new Error('Failed to fetch cocktails');
        return await response.json();
    } catch (error) {
        console.error('Error fetching cocktails:', error);
        showErrorNotification('Failed to load cocktails from database');
        return [];
    }
}

async function getCocktail(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/cocktails/${id}`);
        if (!response.ok) throw new Error('Failed to fetch cocktail');
        return await response.json();
    } catch (error) {
        console.error('Error fetching cocktail:', error);
        showErrorNotification('Failed to load cocktail from database');
        return null;
    }
}

async function createCocktail(cocktailData) {
    try {
        const response = await fetch(`${API_BASE_URL}/cocktails`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cocktailData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create cocktail');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error creating cocktail:', error);
        showErrorNotification('Failed to save cocktail: ' + error.message);
        return null;
    }
}

async function updateCocktail(id, cocktailData) {
    try {
        const response = await fetch(`${API_BASE_URL}/cocktails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cocktailData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update cocktail');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error updating cocktail:', error);
        showErrorNotification('Failed to update cocktail: ' + error.message);
        return null;
    }
}

async function deleteCocktail(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/cocktails/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete cocktail');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error deleting cocktail:', error);
        showErrorNotification('Failed to delete cocktail: ' + error.message);
        return null;
    }
}

// ==================== INVENTORY API CALLS ====================

async function getInventory() {
    try {
        const response = await fetch(`${API_BASE_URL}/inventory`);
        if (!response.ok) throw new Error('Failed to fetch inventory');
        return await response.json();
    } catch (error) {
        console.error('Error fetching inventory:', error);
        showErrorNotification('Failed to load inventory from database');
        return [];
    }
}

async function getInventoryItem(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/inventory/${id}`);
        if (!response.ok) throw new Error('Failed to fetch inventory item');
        return await response.json();
    } catch (error) {
        console.error('Error fetching inventory item:', error);
        showErrorNotification('Failed to load inventory item from database');
        return null;
    }
}

async function createInventoryItem(itemData) {
    try {
        const response = await fetch(`${API_BASE_URL}/inventory`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to create inventory item');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error creating inventory item:', error);
        showErrorNotification('Failed to save inventory item: ' + error.message);
        return null;
    }
}

async function updateInventoryItem(id, itemData) {
    try {
        const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(itemData)
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to update inventory item');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error updating inventory item:', error);
        showErrorNotification('Failed to update inventory item: ' + error.message);
        return null;
    }
}

async function deleteInventoryItem(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/inventory/${id}`, {
            method: 'DELETE'
        });
        
        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Failed to delete inventory item');
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error deleting inventory item:', error);
        showErrorNotification('Failed to delete inventory item: ' + error.message);
        return null;
    }
}
