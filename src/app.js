// src/app.js

const express = require('express');
const session = require('express-session');
const passport = require('../config/passport');
const routes = require('../routes');
const db = require('../models'); // Importing the database instance to initialize models
const path = require('path');
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Initialize session and passport
app.use(
  session({
    secret: 'yourSecretKey',
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../public')));


// Use main router for API routes
app.use('/api', routes); // Prefix API routes with /api to differentiate from frontend routes

// Serve index.html for the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  });


// Sync database models and start the server
db.sequelize
  .sync()
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
  })
  .catch((err) => console.error('Unable to connect to the database:', err));
