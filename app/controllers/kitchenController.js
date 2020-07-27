const bodyParser = require('body-parser');
const KitchenModel = require('../models/kitchen/index.js');
const ItemModel = require('../models/item/index.js');
const multer = require('multer');


const express = require('express');
const router = express.Router();
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage })

//app.post('/api/upload', upload.single('file'), (req, res, next) => {
const uploadFile = (req, res, next) => {
    //upload.single('file')
    console.log('HELLO FROM UPLOAD')
    const file = req.body.file;
    if (!file) {
      console.log('no file')
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
    console.log('found file: ' + file)
    res.status(200).send(file);
}


/**
 * Collect all the information from all kitchens
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const getKitchen = (req, res) => {
    KitchenModel.find({})
    .then(kitchens => {
        res.send(kitchens);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving kitchens."
        });
    });
};

/**
 * Collect the kitchens information
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const postKitchen = (req, res) => {
    const KitchenName = req.body.KitchenName;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const KitchenType = req.body.KitchenType;
    const WorkingDays = req.body.WorkingDays;
    const OpenTime = req.body.OpenTime;
    const CloseTime = req.body.CloseTime;
    const ImagePath = req.body.ImagePath;

    KitchenModel.create({
        KitchenName,
        Email,
        Password,
        KitchenType,
        WorkingDays,
        OpenTime,
        CloseTime,
        ImagePath,
    }).then((kitchen) => { // kitchen created successfully
        return res.json({
            message: 'You have now signed up.', kitchen
        })
    }).catch((error) => { // kitchen not created and throw indicating error
        if(error.name === 'ValidationError') {
            console.log('Hit error in ValidationError.')
            console.log(error);
            return res.status(422).json({
                message: 'There was an issue with your signup request',
                errors: error.errors
            })
        } else if(error.code == 11000) {
            console.log(error);
            return res.status(422).json ({
                message: `That Email or Name is already a registered kitchen.`,
                errors: error.errors
            })
        }
        else {
            console.log(error);
            return res.status(500).json({
                message: 'There was an unexpected error during signup.'
            })
        }
    });
};

/**
 * Collect the kitchens information
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const putKitchen = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Kitchen content can not be empty"
        });
    }
     // Find kitchen and update it with the request body
    KitchenModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true, useFindAndModify: false})
    .then(kitchen => {
        if(!kitchen) {
            return res.status(404).send({
                message: "Kitchen not found with id " + req.params.id
            });
        }

        res.send(kitchen);
    }).catch(err => {
        console.log(err)
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Kitchen not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id + 
                '/n email is already registered'
        });
    });
};
  


/**
 * Collect the kitchens information
 * 
 * @param {object} id   This is passed in the url and signifies the user to query
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const getKitchenByID = (req, res) => {
    KitchenModel.findById(req.params.id)
    .then(kitchen => {
        if(!kitchen) {
            return res.status(404).send({
                message: "Kitchen not found with id = " + req.params.id
            });            
        }
        res.send(kitchen);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Kitchen not found with id = " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id = " + req.params.id
        });
    });
};

/** DONE
 * Collect a single users information by passing email
 * 
 * @param {object} email    This is passed in the url and signifies  the user to query
 * @param {object} req      This is the request object
 * @param {object} res      This is the response object
 */
const getKitchenByEmail = (req, res) => {
    KitchenModel.findOne({Email: req.params.email})
    .then(kitchen => {
        if(!kitchen) {
            return res.status(404).send({
                message: "User not found with id = " + req.params.email
            });            
        }
        res.send(kitchen);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id = " + req.params.email
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id = " + req.params.email
        });
    });
};

/**
 * Collect the kitchens information
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const deleteKitchen = (req, res) => {
    KitchenModel.findOneAndRemove({_id: req.params.id}, {rawResult:true})
    .then(kitchen => {
        if(!kitchen.value) {
            return res.status(404).send({
                message: "Kitchen not found with id " + req.params.id
            });
        }
        res.send({
            message: "Kitchen deleted successfully!", kitchen
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Kitchen not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete Kitchen with id " + req.params.id
        });
    });
};

const authenticateToken = (req, res) => {
    var token = req.headers['x-access-token'];
    if (!token) { //if token not found
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
    if (err) {
        return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    }
    
    res.status(200).send(decoded);
  });
};


const authorizeKitchen = (req, res) => {
    console.log("Inside Auth Kitchen")
    KitchenModel.findOne({Email: req.body.Email})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with email = " + req.params.email
            });            
        }
        if(user.Password != req.body.Password) {
            return res.status(400).send({
                message: "Email or password is incorrect."
            });
        }
        console.log(user)
        const token = jwt.sign({id: user._id}, process.env.SECRET, {
            expiresIn: 3600 //expires after 1 hour
        });
        //return res.status(200).send({ auth: true, token: token });
        return res.status(200).send({
            message: 'You have been authorized', 
            user: user,
            auth: true,
            token: token,
            date: Date()
        })
    }).catch(err => {
        console.log('hit error in authkitchen')
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id = " + req.params.email
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id = " + req.params.email
        });
    });
};

const addItem = async (req, res) => {
    if(!req.body.ItemName) {
        res.status(400).send({
            message: "Please enter an ItemName."
        });
    }
    await ItemModel.create(req.body)
    .then((item) => {
      console.log('createed item?' + item)
      console.log(req.params.id)
    //   let isUnique = await (testMenu(item.ItemName, req.params.id))
    //   if(!isUnique) {
    //       console.log('deleteing item')
    //       (ItemModel.deleteOne({_id: item._id}))
    //   }
      //else {
          //console.log('not deleting')
        KitchenModel.findOneAndUpdate({ _id: req.params.id }, {$push: {items: item}}, { new: true })
        .then((kitchen) => {
          // If we were able to successfully update a Product, send it back to the client
          res.json(kitchen);
        })
      //}
    })
    .catch(function(err) {
      // If an error occurred, send it to the client
      res.json(err);
    });
}

async function testMenu(itemName, kitchenid) {
    console.log('inside testMenu')
    await KitchenModel.findOne({_id: kitchenid})
    .then((kitchen) => {
        kitchen.items.forEach((item) => {
            if(item.itemName == itemName) {
                return false;
            }
        })
        return true;
    })
}

const getItem = (req, res) => {
    KitchenModel.findOne({ _id: req.params.id })
      .populate("items")
      .then((kitchen) => {
        //console.log('somtehing with kitchen' + kitchen);
        // If we were able to successfully update a Product, send it back to the client
        res.json(kitchen);
      })
    // console.log('inside item')
    // ItemModel.create(req.body)
    // .then((item) => {
    //   //console.log('createed item?' + item)
    //   console.log(req.params.id)
    //   //added HEReEEEEEE
    // })
    // .catch(function(err) {
    //   // If an error occurred, send it to the client
    //   res.json(err);
    // });
};

module.exports = {
    getKitchen,
    postKitchen,
    putKitchen,
    getKitchenByID,
    getKitchenByEmail,
    deleteKitchen,
    authenticateToken,
    authorizeKitchen,
    addItem,
    getItem,
    uploadFile
};