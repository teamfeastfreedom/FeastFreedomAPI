const kitchenController = require('../controllers/kitchenController');

module.exports = (app) => {
    app.route('/api/kitchens') //url
        .get(kitchenController.getKitchen)
        .post(kitchenController.postKitchen)

    
    app.get('/api/kitchens/authorize', kitchenController.authorizeKitchen)
    app.get('/api/kitchens/authenticate', kitchenController.authenticateToken)

    app.route('/api/kitchens/:id') //url
        .put(kitchenController.putKitchen)
        .get(kitchenController.getKitchenByID)
        .delete(kitchenController.deleteKitchen)

    app.route('/api/kitchens/email/:email') //url
        .get(kitchenController.getKitchenByEmail)

};