// models/index.js

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config/config.json')['development'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

// Initialize models
const db = {};

// Import models
db.User = require('./user')(sequelize);
db.Recipe = require('./recipe')(sequelize);

// Define associations
db.Recipe.belongsTo(db.User, { onDelete: 'SET NULL', onUpdate: 'CASCADE' }); // Associate Recipe with User
db.User.hasMany(db.Recipe, { foreignKey: 'UserId' }); // A user can have multiple recipes

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
