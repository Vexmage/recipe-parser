// src/parser.js

function parseRecipe(recipeText) {
    const lines = recipeText.split('\n');
    const ingredients = [];
    const instructions = [];

    let parsingInstructions = false;

    lines.forEach(line => {
        line = line.trim();

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
                const [, quantity, unit, ingredient] = match;
                ingredients.push({
                    quantity: quantity || null,
                    unit: unit || null,
                    ingredient: ingredient.trim()
                });
            }
        }
    });

    return { ingredients, instructions };
}

module.exports = { parseRecipe };
