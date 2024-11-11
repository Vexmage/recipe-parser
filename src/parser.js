// src/parser.js

function parseRecipe(recipeText) {
    const lines = recipeText.split('\n');
    const ingredients = [];
    const instructions = [];
    let prepTime = null;
    let cookTime = null;
    let servings = null;

    let parsingInstructions = false;
    let hasIngredients = false;

    lines.forEach(line => {
        line = line.trim();

        // Check for metadata lines
        if (line.toLowerCase().startsWith('prep time:')) {
            prepTime = line.split(':')[1].trim();
            return;
        }
        if (line.toLowerCase().startsWith('cook time:')) {
            cookTime = line.split(':')[1].trim();
            return;
        }
        if (line.toLowerCase().startsWith('servings:')) {
            servings = line.split(':')[1].trim();
            return;
        }

        // Check if we've reached the instructions section
        if (line.toLowerCase() === 'instructions:') {
            parsingInstructions = true;
            return;
        }

        if (parsingInstructions) {
            // Treat each line as a separate instruction if we're in the instructions section
            if (line) instructions.push(line);
        } else {
            // Parse as ingredient line if not in instructions section
            const match = line.match(/^(?:(\d+\s*\d*\/?\d*)\s*)?(?:([a-zA-Z]+)\s+)?(.+)$/);
            if (match) {
                hasIngredients = true;
                const [, quantity, unit, ingredient] = match;
                ingredients.push({
                    quantity: quantity ? quantity.trim() : null,
                    unit: unit || null,
                    ingredient: ingredient.trim()
                });
            }
        }
    });

    // Basic validation checks
    if (!hasIngredients) {
        return { error: "No ingredients found. Please add at least one ingredient." };
    }
    if (instructions.length === 0) {
        return { error: "No instructions found. Please add instructions after 'Instructions:'." };
    }

    return { prepTime, cookTime, servings, ingredients, instructions };
}

module.exports = { parseRecipe };
