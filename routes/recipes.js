// routes/recipes.js

const express = require('express');
const router = express.Router();
const { Recipe } = require('../models'); 
const { ensureAuthenticated } = require('../config/auth'); 
const { parseRecipe, parseTreeToJson } = require('../src/parser'); // Import parsing functions

// Route to parse a recipe
router.post('/parse', async (req, res) => {
  try {
    const { recipe: recipeText } = req.body; // Get recipe text from request
    
    // Parse the recipe text
    const parsedRecipe = parseRecipe(recipeText);
    const jsonResponse = parseTreeToJson(parsedRecipe);
    
    console.log("Parsed Recipe JSON:", jsonResponse); // Debugging line to confirm JSON structure

    // Respond with the parsed recipe in JSON format
    res.json(jsonResponse);
  } catch (error) {
    console.error('Error parsing recipe:', error);
    res.status(500).json({ error: 'Failed to parse recipe' });
  }
});

// Route to save a recipe
router.post('/save', ensureAuthenticated, async (req, res) => {
    try {
        const { name, recipe } = req.body;
        const userId = req.user.id;

        await Recipe.create({
            title: name,
            ingredients: recipe.ingredients,
            instructions: recipe.instructions,
            prepTime: recipe.prepTime,
            cookTime: recipe.cookTime,
            servings: recipe.servings,
            UserId: userId
        });

        res.json({ success: true });
    } catch (error) {
        console.error('Error saving recipe:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Route to get saved recipes
router.get('/saved', ensureAuthenticated, async (req, res) => {
  const userId = req.user.id;
  const recipes = await Recipe.findAll({ where: { UserId: userId } });
  res.json(recipes);
});

module.exports = router;
