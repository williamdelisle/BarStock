# Recipe Import - Recommended Test URLs

Use these URLs to test the recipe import feature.

## Popular Recipe Websites

### CocktailDB.com (Excellent - JSON-LD Support)
```
https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Mojito
```
Direct API endpoint for cocktails.

### Liquor.com (Good - Well-Structured)
```
https://www.liquor.com/cocktails/margarita/
https://www.liquor.com/cocktails/daiquiri/
https://www.liquor.com/cocktails/old-fashioned/
```

### The Spruce Eats (Good - Recipe Schema)
```
https://www.thespruceeats.com/mojito-recipe-759523
https://www.thespruceeats.com/margarita-recipe-759537
https://www.thespruceeats.com/manhattan-cocktail-recipe-759571
```

### Food & Wine (Good)
```
https://www.foodandwine.com/recipes/classic-martini
https://www.foodandwine.com/recipes/cosmopolitan
https://www.foodandwine.com/recipes/sidecar
```

### AllRecipes - Cocktails (Good)
```
https://www.allrecipes.com/recipe/12690/margarita/
https://www.allrecipes.com/recipe/12691/daiquiri/
https://www.allrecipes.com/recipe/12692/mojito/
```

### Wikipedia (Fair - Good for classic cocktails)
```
https://en.wikipedia.org/wiki/Daiquiri
https://en.wikipedia.org/wiki/Martini_(cocktail)
https://en.wikipedia.org/wiki/Margarita
https://en.wikipedia.org/wiki/Manhattan_(cocktail)
https://en.wikipedia.org/wiki/Cosmopolitan_(cocktail)
```

### Serious Eats (Good)
```
https://www.seriouseats.com/recipes/2016/11/how-to-make-a-perfect-margarita-recipe.html
https://www.seriouseats.com/recipes/2016/11/how-to-make-perfect-daiquiri-recipe.html
```

### Bon Appétit (Good)
```
https://www.bonappetitmag.com/recipe/classic-margarita
https://www.bonappetitmag.com/recipe/bloody-mary
```

## Quick Test Recipe URLs (Tested & Working)

These URLs have been tested with the import feature:

### Classic Cocktails with Great Parsing
1. **Mojito**
   ```
   https://en.wikipedia.org/wiki/Mojito
   ```
   Expected: rum, lime juice, mint, sugar, soda water

2. **Margarita**
   ```
   https://en.wikipedia.org/wiki/Margarita
   ```
   Expected: tequila, lime juice, triple sec

3. **Daiquiri**
   ```
   https://en.wikipedia.org/wiki/Daiquiri
   ```
   Expected: rum, lime juice, sugar

4. **Manhattan**
   ```
   https://en.wikipedia.org/wiki/Manhattan_(cocktail)
   ```
   Expected: whiskey, vermouth, bitters

5. **Cosmopolitan**
   ```
   https://en.wikipedia.org/wiki/Cosmopolitan_(cocktail)
   ```
   Expected: vodka, cranberry juice, triple sec, lime

## Testing Tips

### Step-by-Step Testing
1. Copy one of the URLs above
2. Click the 🌐 button in BarStock header
3. Paste the URL
4. Click "Fetch Recipe"
5. Watch the status message
6. Verify the recipe imported correctly
7. Check ingredients, instructions, base spirit

### What to Look For
✓ Recipe name is correct  
✓ All ingredients extracted  
✓ Ingredient amounts preserved  
✓ Instructions are clear  
✓ Base spirit is identified  
✓ Category is reasonable  

### Troubleshooting Tips
- If a URL fails, try another source for the same cocktail
- Some websites may have changed structure
- JavaScript-heavy sites may not parse well
- Wikipedia pages are most reliable

### Reporting Issues
If you find a website that:
- Should work but doesn't
- Parses incorrectly
- Has great data but fails

Try the same recipe on another website to confirm it's a site-specific issue.

## Advanced Testing

### JSON-LD Detection
Sites with explicit JSON-LD `Recipe` schema will have the most accurate parsing:
- TheSpruceEats
- AllRecipes
- Food & Wine
- Bon Appétit

### Fallback HTML Parsing
Sites that rely on HTML parsing (JSON-LD not available):
- Wikipedia
- Some specialty cocktail blogs
- Recipe aggregators

### Testing Different Scenarios
1. **Simple recipes** (few ingredients, short instructions)
2. **Complex recipes** (many ingredients, detailed steps)
3. **Different spirits** (vodka, gin, rum, whiskey, tequila)
4. **Modern cocktails** (newer recipes, creative names)
5. **Classic cocktails** (Martini, Manhattan, Daiquiri, etc.)

## If Imports Fail

### Common Issues & Solutions

**"Failed to fetch: 404"**
- URL is incorrect
- Website changed its URL structure
- Try the same cocktail on a different site

**"Could not parse recipe from this website"**
- Website doesn't have recipe schema
- HTML structure is too complex
- Try Wikipedia as fallback

**Incomplete import**
- Some data may not parse (images, dietary info)
- You can manually edit the recipe after import
- This is normal - all imports are editable

**Empty ingredients list**
- Website uses non-standard markup
- Try another recipe source
- Manually recreate the recipe instead

## Resources

### Recipe Schema Standards
- [Schema.org Recipe](https://schema.org/Recipe)
- [JSON-LD Format](https://json-ld.org/)

### Cocktail References
- [IBA Official Cocktails](https://www.iba-world.com/the-unforgettable-iba-cocktails/)
- [CocktailDB API](https://www.thecocktaildb.com/api.php)
- [Cocktails by Spirit](https://www.liquor.com/cocktails/)

## Contributing

Found a great recipe source? Have URLs that work well?  
Share them in the project documentation!

Current tested sites:
- Wikipedia (Very Good)
- Liquor.com (Good)
- TheSpruceEats (Good)
- AllRecipes (Good)
- Food & Wine (Good)
