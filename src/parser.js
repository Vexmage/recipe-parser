// src/parser.js

function parseIngredients(recipeText) {
    const lines = recipeText.split('\n');
    const ingredients = lines.map(line => {
        // Updated regular expression to capture optional quantity and unit
        const match = line.match(/^(?:(\d+\s*\d*\/?\d*)\s*)?(?:([a-zA-Z]+)\s+)?(.+)$/);
        
        if (match) {
            const [, quantity, unit, ingredient] = match;
            return {
                quantity: quantity || null,    // If no quantity is found, set to null
                unit: unit || null,            // If no unit is found, set to null
                ingredient: ingredient.trim()   // Ingredient name, trimmed of extra spaces
            };
        }
        return null;
    }).filter(Boolean); // Filters out any lines that didn't match
    return ingredients;
}

module.exports = { parseIngredients };
