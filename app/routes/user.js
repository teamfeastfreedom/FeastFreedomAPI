const userController = require('../controllers/userController');
// const user = require('../controllers/user');

// This is the middle man between server and controller
module.exports = (app) => {
    app.route('/api/users') //url
        .get(userController.getUser)
        .post(userController.postUser)

    app.route('/api/users/:id') //url
        .put(userController.putUser)
        .get(userController.getUserByID)
        .delete(userController.deleteUser)

    app.route('/api/users/email/:email') //url
        .get(userController.getUserByEmail)
};