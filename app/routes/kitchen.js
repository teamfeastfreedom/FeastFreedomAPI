const kitchenController = require('../controllers/kitchenController');

module.exports = (app) => {
    app.route('/api/kitchens') //url
        .get(kitchenController.getKitchen)
        .post(kitchenController.postKitchen)

    app.route('/api/kitchens/:id') //url
        .put(kitchenController.putKitchen)
        .get(kitchenController.getKitchenByID)
        .delete(kitchenController.deleteKitchen)
};