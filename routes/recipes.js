// routes/recipes.js

const express = require('express');
const router = express.Router();
const parseRecipe = require('../src/parser').parseRecipe;
const parseTreeToJson = require('../src/parser').parseTreeToJson;

// Route to parse recipe
router.post('/parse', (req, res) => {
  const recipeText = req.body.recipe;
  try {
    const recipeNode = parseRecipe(recipeText);
    const parsedRecipe = parseTreeToJson(recipeNode);
    res.json(parsedRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to parse recipe' });
  }
});

module.exports = router;
