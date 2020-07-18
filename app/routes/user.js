const userController = require('../controllers/user');
// const user = require('../controllers/user');

// This is the middle man between server and controller
module.exports = (app) => {
    app.route('/api/users') //url
        .get(userController.getUser)
        .post(userController.whichUser)

    app.route('/api/users/:id') //url
        .post(userController.update)
};