// models/recipe.js

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Recipe extends Model {}

  Recipe.init(
    {
      title: DataTypes.STRING,
      ingredients: DataTypes.JSON,
      instructions: DataTypes.JSON,
      prepTime: DataTypes.STRING,
      cookTime: DataTypes.STRING,
      servings: DataTypes.STRING,
    },
    { sequelize, modelName: 'Recipe' }
  );

  // Associations are handled in models/index.js
  return Recipe;
};
