const authController = require('../controllers/authController');
// const user = require('../controllers/user');

// This is the middle man between server and controller
module.exports = (app) => {
    app.post('/api/auth/signup', authController.signupUser)
    app.get('/api/auth/authenticate', authController.authenticateToken)
    app.get('/api/auth/authorize', authController.authorizeUser)
};