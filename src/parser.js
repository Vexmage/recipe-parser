// src/parser.js

class RecipeNode {
    constructor() {
        this.metadata = {};      // Holds MetadataNodes
        this.ingredients = [];    // Holds IngredientNodes
        this.instructions = [];   // Holds InstructionNodes
    }
}

class IngredientNode {
    constructor(quantity, unit, ingredient, descriptor = null, optional = false) {
        this.quantity = quantity || null;
        this.unit = unit || null;
        this.ingredient = ingredient || null;
        this.descriptor = descriptor;
        this.optional = optional;
    }
}



class InstructionNode {
    constructor(step) {
        this.step = step;
    }
}

class MetadataNode {
    constructor(type, value) {
        this.type = type; // "prepTime", "cookTime", or "servings"
        this.value = value;
    }
}

function parseRecipe(recipeText) {
    const recipeNode = new RecipeNode();
    const lines = recipeText.split('\n');

    let parsingInstructions = false;

    lines.forEach(line => {
        line = line.trim();

        // Metadata parsing
        if (line.toLowerCase().startsWith('prep time:')) {
            recipeNode.metadata.prepTime = new MetadataNode('prepTime', line.split(':')[1].trim());
            return;
        }
        if (line.toLowerCase().startsWith('cook time:')) {
            recipeNode.metadata.cookTime = new MetadataNode('cookTime', line.split(':')[1].trim());
            return;
        }
        if (line.toLowerCase().startsWith('servings:')) {
            recipeNode.metadata.servings = new MetadataNode('servings', line.split(':')[1].trim());
            return;
        }

        // Instructions section
        if (line.toLowerCase() === 'instructions:') {
            parsingInstructions = true;
            return;
        }

        if (parsingInstructions) {
            if (line) {
                recipeNode.instructions.push(new InstructionNode(line));
            }
        } else {
            // Step 1: Manually separate descriptor after the comma
            const [mainPart, descriptor] = line.split(/,\s*(.+)/); // Splits on first comma, capturing the rest as descriptor

            // Step 2: Parse quantity, unit, and ingredient from main part
            const match = mainPart.match(/^(\d+\s*\d*\/?\d*)?\s*([a-zA-Z]+)?\s+(.+)$/);
            if (match) {
                const [, quantity, unit, ingredient] = match;

                recipeNode.ingredients.push(new IngredientNode(
                    quantity ? quantity.trim() : null,
                    unit || null,
                    ingredient.trim(),
                    descriptor || null,  // Now this should capture text after the comma
                    false  // Default optional to false for now
                ));
            }
        }
    });

    return recipeNode;
}






function parseTreeToJson(recipeNode) {
    return {
        prepTime: recipeNode.metadata.prepTime ? recipeNode.metadata.prepTime.value : null,
        cookTime: recipeNode.metadata.cookTime ? recipeNode.metadata.cookTime.value : null,
        servings: recipeNode.metadata.servings ? recipeNode.metadata.servings.value : null,
        ingredients: recipeNode.ingredients.map(ingredient => ({
            quantity: ingredient.quantity,
            unit: ingredient.unit,
            ingredient: ingredient.ingredient,
            descriptor: ingredient.descriptor
        })),
        instructions: recipeNode.instructions.map(instruction => instruction.step)
    };
}

module.exports = { parseRecipe, parseTreeToJson, RecipeNode, IngredientNode, InstructionNode, MetadataNode };

