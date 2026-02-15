# Recipe Import from Website Guide

## Overview

The BarStock app now supports importing cocktail recipes directly from website URLs. This feature automatically extracts recipe information (name, ingredients, instructions) from cocktail recipe websites.

## How to Use

### Step 1: Click the Web Import Button
In the header, click the **🌐** button (next to the file import button).

### Step 2: Paste Recipe URL
A modal window will appear asking for a recipe website URL. Paste the full URL of a cocktail recipe page:

Examples:
- `https://www.cocktaildb.com/recipe/mojito`
- `https://www.liquor.com/cocktails/margarita/`
- `https://en.wikipedia.org/wiki/Daiquiri`

### Step 3: Fetch the Recipe
Click the **🔗 Fetch Recipe** button. The app will:
1. Fetch the website content
2. Extract recipe data (name, ingredients, instructions)
3. Create a new cocktail entry
4. Show success notification

### Step 4: Verify & Edit
The imported recipe will appear in your cocktails list. You can:
- Edit ingredients, amounts, and units
- Add or remove preparation steps
- Change category or base spirit
- Adjust the color/appearance

## Supported Websites

The import feature works best with websites that have:
- **JSON-LD structured data** (most reliable)
- Clear ingredient and instruction sections
- Proper HTML semantics

### Popular Supported Sites:
✅ CocktailDB.com  
✅ Liquor.com  
✅ TheSpruceEats.com  
✅ Food & Wine recipes  
✅ AllRecipes cocktail section  
✅ Wikipedia cocktail pages  
✅ Most major food/recipe blogs  

### May Have Limited Data:
⚠️ Pinterest recipe links (often requires login)  
⚠️ Instagram recipe posts (not supported)  
⚠️ Heavy JavaScript-heavy sites  

## Data Extraction Logic

The app uses a multi-level approach to extract recipe data:

### Level 1: JSON-LD (Most Reliable)
- Looks for structured JSON-LD recipe data
- Extracts official recipe fields
- Most accurate format

### Level 2: Open Graph & HTML Parsing
- Falls back to meta tags and HTML structure
- Searches for common class names like `ingredient`, `step`, `instruction`
- Parses text content for ingredient patterns

### Ingredient Parsing
Automatically recognizes patterns like:
- `2 oz vodka`
- `1/2 cup fresh lemon juice`
- `1 dash Angostura bitters`
- `3-4 fresh mint leaves`

## What Gets Imported

Each imported recipe includes:

| Field | Source | Auto-Detected |
|-------|--------|---|
| Name | Recipe title | ✓ |
| Ingredients | Ingredient list | ✓ |
| Instructions | Preparation steps | ✓ |
| Base Spirit | From ingredients | ✓ (if possible) |
| Category | Recipe name patterns | ✓ (if matches known cocktails) |
| Source | Website domain | ✓ |
| Color | Random from palette | ✓ |
| Image | Recipe image URL | Attempted |

## Limitations

1. **Accuracy**: Website markup varies; some recipes may not parse perfectly
2. **Ingredient Units**: Different websites use different units (cups, oz, ml, etc.)
3. **Images**: Image extraction depends on website structure
4. **Complex Instructions**: Multi-step instructions may be split differently
5. **Dietary Info**: Allergens and special notes are not extracted

## Tips for Best Results

1. **Use dedicated recipe sites** - Specialized cocktail sites have better structured data
2. **Check parsed data** - Always review the imported recipe before using it
3. **Edit if needed** - You can manually adjust ingredients, units, and instructions
4. **Standard measures** - The app defaults to ounces (oz); convert if needed

## Error Messages

### "Failed to fetch: 404"
- URL is incorrect or website is down
- Try copying the URL again from your browser

### "Could not parse recipe from this website"
- Website structure is too complex or non-standard
- Try another source for the same cocktail

### "Paste the full URL..."
- You need to enter a complete URL starting with `http://` or `https://`

## Technical Details

The app uses:
- **CORS Proxy**: AllOrigins.win (free, public service)
- **HTML Parser**: Built-in browser DOMParser
- **JSON-LD**: Schema.org Recipe vocabulary
- **No external dependencies** beyond existing code

## Privacy

- Recipes are stored locally (localStorage)
- Website content is fetched through a CORS proxy
- No personal data is collected or transmitted
- All processing happens in your browser

## Future Improvements

Planned enhancements:
- [ ] Support for more recipe formats
- [ ] Bulk import from multiple URLs
- [ ] Custom parsing rules per website
- [ ] Better image extraction
- [ ] Recipe scaling/measurement conversion
- [ ] Integration with recipe API services
