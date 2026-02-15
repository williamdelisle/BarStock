# Implementation Notes: Transitioning to Database

## Summary of Changes Required

This document outlines the specific JavaScript changes needed in `index.html` to use the database API instead of localStorage.

## Key Changes by Function

### 1. Data Initialization (CHANGED)

**OLD - Using localStorage:**
```javascript
let cocktails = JSON.parse(localStorage.getItem('cocktails')) || [/* defaults */];
let barInventory = JSON.parse(localStorage.getItem('barInventory')) || [];
```

**NEW - Using Database API:**
```javascript
let cocktails = [];
let barInventory = [];

// Load data from database on app init
async function initializeApp() {
    cocktails = await getCocktails();
    barInventory = await getInventory();
    renderFilters();
    renderCocktails();
    renderInventoryFilters();
    renderInventory();
}
```

### 2. Saving Cocktails (CHANGED)

**OLD - localStorage:**
```javascript
localStorage.setItem('cocktails', JSON.stringify(cocktails));
```

**NEW - Database:**
```javascript
if (editingCocktailId !== null) {
    await updateCocktail(editingCocktailId, {
        name, category, baseSpirit, image, color, source, ingredients, steps
    });
} else {
    await createCocktail({
        name, category, baseSpirit, image, color, source, ingredients, steps
    });
}
```

### 3. Saving Inventory (CHANGED)

**OLD - localStorage:**
```javascript
localStorage.setItem('barInventory', JSON.stringify(barInventory));
```

**NEW - Database:**
```javascript
const newItem = {
    name, category, brand, volume, abv, sugarContent, year, image
};

if (editingIndex !== null) {
    await updateInventoryItem(barInventory[editingIndex].id, newItem);
} else {
    await createInventoryItem(newItem);
}
```

### 4. Deleting Cocktails (CHANGED)

**OLD - localStorage:**
```javascript
cocktails = cocktails.filter(c => c.id !== cocktailId);
localStorage.setItem('cocktails', JSON.stringify(cocktails));
```

**NEW - Database:**
```javascript
await deleteCocktail(cocktailId);
cocktails = cocktails.filter(c => c.id !== cocktailId);
```

### 5. Deleting Inventory (CHANGED)

**OLD - localStorage:**
```javascript
barInventory.splice(index, 1);
localStorage.setItem('barInventory', JSON.stringify(barInventory));
```

**NEW - Database:**
```javascript
const itemId = barInventory[index].id;
await deleteInventoryItem(itemId);
barInventory.splice(index, 1);
```

## Functions That Need Updates

1. **init()** - Add `await` to load from API
2. **saveCocktail()** - Use `createCocktail()` or `updateCocktail()`
3. **addInventoryItem()** - Use `createInventoryItem()`
4. **updateInventoryItem()** - Use `updateInventoryItem()` API call
5. **removeInventoryItem()** - Use `deleteInventoryItem()`
6. **editInventoryItem()** - Fetch from API if needed
7. **openModal()** - May need to fetch fresh data
8. **renderCocktails()** - Data already loaded from API
9. **renderInventory()** - Data already loaded from API

## Async/Await Pattern

All database operations are asynchronous. Functions calling API methods must be async:

```javascript
async function saveCocktail() {
    // ... validation code ...
    
    const cocktailData = {
        name, category, baseSpirit, image, color, source, ingredients, steps
    };
    
    if (editingCocktailId !== null) {
        const result = await updateCocktail(editingCocktailId, cocktailData);
    } else {
        const result = await createCocktail(cocktailData);
    }
    
    // Refresh data after save
    cocktails = await getCocktails();
    renderCocktails();
}
```

## Error Handling

The api.js file already includes error handling that shows notifications. However, you should also handle errors in the calling code:

```javascript
async function saveCocktail() {
    try {
        const result = await createCocktail(cocktailData);
        if (!result) {
            showErrorNotification('Failed to save cocktail');
            return;
        }
        showErrorNotification(`Cocktail saved!`, 'success');
    } catch (error) {
        showErrorNotification('Unexpected error: ' + error.message);
    }
}
```

## Data Flow Comparison

### OLD (localStorage):
```
User Input → JavaScript → localStorage → reload → render
```

### NEW (Database):
```
User Input → JavaScript → API → Server → SQLite → API Response → render
```

## Testing the Migration

1. Start the server: `npm start`
2. Open DevTools (F12) → Network tab
3. Perform actions (add cocktail, add item, etc.)
4. Verify API calls appear in Network tab
5. Check SQLite database: `barstock.db` file size increases
6. Refresh page - data should persist

## Rollback Plan

If issues occur:
1. Data is still in localStorage until explicitly cleared
2. Keep backup of `barstock.db`
3. Can export data as JSON for safekeeping
4. Revert to localStorage by reverting code changes

## Performance Considerations

- API calls are network requests - slightly slower than localStorage
- Initial load requires server to be running
- Consider caching frequently accessed data
- May want to add pagination for large datasets

## Database File Location

The SQLite database `barstock.db` is created in the same directory as `server.js`:
- Windows: `d:\Git\BarStock\barstock.db`
- Can view with SQLite Browser: https://sqlitebrowser.org/

## Backing Up Data

To backup your database:
```powershell
Copy-Item barstock.db barstock-backup.db
```

Or export to JSON:
- Click 💾 Export Cocktails button
- Click 💾 Export Inventory button

## Important Notes

1. **Server Required**: The server MUST be running for the app to work
2. **CORS**: The api.js uses CORS - if you get CORS errors, check CORS settings in server.js
3. **Local Only**: This setup is designed for local/LAN use, not internet deployment
4. **Single Database**: All users share the same database file (no user accounts yet)

## Future Enhancements

- Add user authentication
- Multi-user support with separate inventories
- Real-time sync across devices
- Backup to cloud storage
- API documentation (Swagger/OpenAPI)
- WebSocket for real-time updates
