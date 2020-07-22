const cartController = require('../controllers/cartController');

module.exports = (app) => {
    app.route('/api/carts') //url
        .get(cartController.getCart)
        .post(cartController.postCart)

    app.route('/api/carts/:id') //url
        .put(cartController.putCart)
        .get(cartController.getCartByID)
        .delete(cartController.deleteCart)
        .post(cartController.postCart)

    // app.route('/api/items/email/:email') //url
    //     .get(itemController.getItemByEmail)
};