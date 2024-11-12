// routes/index.js

const express = require('express');
const authRoutes = require('./auth');
const recipeRoutes = require('./recipes');

const router = express.Router();

// Mount authentication routes at /api/auth
router.use('/auth', authRoutes);

// Mount recipe routes at /api/recipes
router.use('/recipes', recipeRoutes);

module.exports = router;
