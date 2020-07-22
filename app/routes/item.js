const itemController = require('../controllers/itemController');

module.exports = (app) => {
    app.route('/api/items') //url
        .get(itemController.getItem)
        .post(itemController.postItem)

    app.route('/api/items/:id') //url
        .put(itemController.putItem)
        .get(itemController.getItemByID)
        .delete(itemController.deleteItem)
        .post(itemController.postItem)

    // app.route('/api/items/email/:email') //url
    //     .get(itemController.getItemByEmail)
};