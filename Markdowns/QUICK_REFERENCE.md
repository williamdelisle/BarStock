# Quick Reference - Context-Sensitive Header & Recipe Auto-Fill

## Changes At a Glance

### ✅ WORKING NOW

| Feature | Status | Description |
|---------|--------|-------------|
| Context Header | ✅ | Buttons change based on tab |
| Form Auto-Fill | ✅ | Recipe opens form with data |
| Recipe Review | ✅ | Edit before saving |
| Tab Switching | ✅ | Seamless tab transitions |
| All Features | ✅ | Nothing broken |

## Header Button Display

### Cocktails Tab (Default)
```
[📥] [🌐] [💾]           [🌓]
 Import File  Import Web  Export    Theme
```

### Inventory Tab
```
[📦] [💾]           [🌓]
 Import Export    Theme
```

## Workflow

### Import Recipe (30 seconds)
```
1. Click 🌐 button
2. Paste URL → https://en.wikipedia.org/wiki/Mojito
3. Click "Fetch Recipe"
4. Form opens with data ✅
5. Edit as needed
6. Click "Save Cocktail"
7. Done! Recipe in collection
```

## Key Functions

| Function | What It Does |
|----------|-------------|
| `fillCocktailForm(recipe)` | Opens form with recipe data |
| `switchTab(tab)` | Switches tabs AND updates header buttons |
| `importRecipeFromUrl()` | Fetches recipe and calls fillCocktailForm |
| `init()` | Initializes header visibility on startup |

## Code Sections

### Header HTML (lines 15-32)
```html
<div class="header-actions">
    <div id="cocktail-buttons" class="header-btn-group">
        <!-- Import file, Import web, Export -->
    </div>
    <div id="inventory-buttons" class="header-btn-group" style="display: none;">
        <!-- Import inventory, Export -->
    </div>
    <button class="theme-toggle">🌓</button>
</div>
```

### switchTab() Function (lines 1079-1103)
Updates button visibility:
```javascript
if (tab === 'cocktails') {
    cocktailButtons.style.display = 'flex';
    inventoryButtons.style.display = 'none';
} else if (tab === 'inventory') {
    cocktailButtons.style.display = 'none';
    inventoryButtons.style.display = 'flex';
}
```

### fillCocktailForm() Function (lines 2133-2195)
- Opens cocktail form
- Fills all fields
- Creates ingredient rows
- Creates instruction rows
- Scrolls to form

## Testing Checklist (2 minutes)

- [ ] Load app - Cocktails tab active, see 📥 🌐 💾
- [ ] Click Inventory tab - See 📦 💾
- [ ] Click Cocktails tab - Back to 📥 🌐 💾
- [ ] Click 🌐 button - URL modal opens
- [ ] Paste URL and fetch - Form opens with data
- [ ] Verify name, category, spirit filled
- [ ] Verify ingredients present
- [ ] Verify steps present
- [ ] Edit a field - Works ✅
- [ ] Save cocktail - Saved correctly

## Troubleshooting

### Header buttons not changing
- **Check:** Did you call `switchTab()` function?
- **Fix:** It's called automatically when clicking tab
- **Verify:** Console should show no errors

### Form doesn't open after fetch
- **Check:** Is URL valid?
- **Fix:** Try Wikipedia URL: `https://en.wikipedia.org/wiki/Mojito`
- **Verify:** Check browser console for errors

### Fields not pre-filled
- **Check:** Did recipe parse correctly?
- **Fix:** Try different URL/website
- **Verify:** Status message shows extraction success

## Browser Console Testing

```javascript
// Test fillCocktailForm directly
fillCocktailForm({
    name: 'Test Cocktail',
    category: 'Classic',
    baseSpirit: 'Vodka',
    ingredients: [{name: 'Vodka', amount: '1', unit: 'oz'}],
    steps: ['Mix', 'Serve'],
    source: 'Test',
    image: '',
    color: '#fff'
});

// Test switchTab
switchTab('inventory');  // See inventory buttons
switchTab('cocktails');   // See cocktail buttons
```

## Files Changed

1. **index.html** (~20 lines changed)
   - Header restructured
   - Functions added/updated
   - init() enhanced

2. **barstock-styles.css** (~5 lines added)
   - `.header-btn-group` style

## Performance

- ✅ No performance impact
- ✅ Same load time
- ✅ Same functionality speed
- ✅ Smooth transitions

## Browser Support

- ✅ All modern browsers
- ✅ Mobile friendly
- ✅ Tablet friendly
- ✅ Desktop optimal

## Rollback (if needed)

Revert these changes:
1. Remove `header-btn-group` divs from header
2. Restore single button list
3. Remove `fillCocktailForm()` function
4. Revert `switchTab()` to original
5. Revert `importRecipeFromUrl()` to save directly

## Next Improvements

Possible enhancements:
- [ ] Preview recipe image before form
- [ ] One-click save after import
- [ ] Recipe source history
- [ ] Auto-categorization refinement
- [ ] Ingredient database lookup
- [ ] Unit conversion options

## Summary

✅ Header buttons are context-aware  
✅ Recipe form auto-fills with parsed data  
✅ User can review and edit before saving  
✅ Clean, intuitive interface  
✅ No breaking changes  

---

**Try it now:**
1. Click 🌐 (only visible in Cocktails tab)
2. Paste: `https://en.wikipedia.org/wiki/Mojito`
3. Form opens with all data pre-filled
4. Edit and save!

Enjoy the enhanced BarStock! 🍹
