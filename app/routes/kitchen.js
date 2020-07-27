const kitchenController = require('../controllers/kitchenController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage })

module.exports = (app) => {
    app.route('/api/kitchens') //url
        .get(kitchenController.getKitchen)
        .post(kitchenController.postKitchen)

    
    app.post('/api/kitchens/authorize', kitchenController.authorizeKitchen)
    app.get('/api/kitchens/authenticate', kitchenController.authenticateToken)
    app.post('/api/kitchens/addItem/:id', kitchenController.addItem)

    app.post('/api/upload', upload.single('file'), kitchenController.uploadFile)

    app.route('/api/kitchens/:id') //url
        .put(kitchenController.putKitchen)
        .get(kitchenController.getItem)
        .delete(kitchenController.deleteKitchen)
        // .post(kitchenController.addItem)

    app.route('/api/kitchens/email/:email') //url
        .get(kitchenController.getKitchenByEmail)
};