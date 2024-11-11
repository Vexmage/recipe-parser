// src/app.js
const express = require('express');
const app = express();
const { parseRecipe } = require('./parser');
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

app.post('/parse', (req, res) => {
    const { recipe } = req.body;
    const parsedRecipe = parseRecipe(recipe);
    res.json(parsedRecipe);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
