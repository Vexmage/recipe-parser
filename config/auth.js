// config/auth.js

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next(); // User is authenticated, allow them to proceed
    }
    res.status(401).json({ error: 'Unauthorized access' }); // Send unauthorized status if not authenticated
}

module.exports = { ensureAuthenticated };
