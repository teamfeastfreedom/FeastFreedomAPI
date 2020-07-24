const kitchenController = require('../controllers/kitchenController');

module.exports = (app) => {
    app.route('/api/kitchens') //url
        .get(kitchenController.getKitchen)
        .post(kitchenController.postKitchen)

    
    app.post('/api/kitchens/authorize', kitchenController.authorizeKitchen)
    app.get('/api/kitchens/authenticate', kitchenController.authenticateToken)
    app.post('/api/kitchens/addItem/:id', kitchenController.addItem)

    app.route('/api/kitchens/:id') //url
        .put(kitchenController.putKitchen)
        .get(kitchenController.getItem)
        .delete(kitchenController.deleteKitchen)
        // .post(kitchenController.addItem)

    app.route('/api/kitchens/email/:email') //url
        .get(kitchenController.getKitchenByEmail)
};