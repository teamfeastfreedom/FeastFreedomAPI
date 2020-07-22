const bodyParser = require('body-parser');
const ItemModel = require('../models/item/index.js');

/** DONE
 * Collect all the information from all items
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const getItem = (req, res) => {
    ItemModel.find({})
    .then(items => {
        res.send(items);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving items."
        });
    });
};

/** DONE
 * Collect the items information
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const postItem = (req, res) => {
    console.log("inside post item")
    const ItemName = req.body.ItemName;
    const KitchenID = req.params.id;
    const Price = req.body.Price;
    const ItemCatagory = req.body.ItemCatagory;
    const ImagePath = req.body.ImagePath;

    console.log("Beginning")
    ItemModel.create({
        ItemName,
        KitchenID,
        Price,
        ItemCatagory,
        ImagePath,
    }).then((item) => { // item created successfully
        console.log("inside item create" + item)
        return res.json({
            message: `You have added a new item(${item.ItemName}) to ${item.KitchenID}'s menu`,
            item
        })
    }).catch((error) => { // item not created and throw indicating error
        if(error.name === 'ValidationError') {
            console.log('Hit error in ValidationError.')
            return res.status(422).json({
                message: 'There was an issue with your signup request',
                errors: error.errors
            })
        }else {
            console.log(error);
            return res.status(500).json({
                message: 'There was an unexpected error during signup.'
            })
        }
    });
};

/** 
 * Update a single items information by passing _id
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const putItem = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Item content can not be empty"
        });
    }

    // Find item and update it with the request body
    ItemModel.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, {new: true, useFindAndModify: false})
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.id
            });
        }

        res.send(item);
    }).catch(err => {
        console.log(err)
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating item with id " + req.params.id
        });
    });
}

/** DONE
 * Collect a single items information by passing _id
 * 
 * @param {object} id   This is passed in the url and signifies  the item to query
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const getItemByID = (req, res) => {
    ItemModel.findById(req.params.id)
    .then(item => {
        if(!item) {
            return res.status(404).send({
                message: "Item not found with id = " + req.params.id
            });            
        }
        res.send(item);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id = " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving item with id = " + req.params.id
        });
    });
};

/** DONE
 * Collect a single items information by passing email
 * 
 * @param {object} email    This is passed in the url and signifies  the item to query
 * @param {object} req      This is the request object
 * @param {object} res      This is the response object
 */
const getItemByEmail = (req, res) => {
    ItemModel.find({KitchenEmail: req.params.email})
    .then(items => {
        if(!items) {
            return res.status(404).send({
                message: "Item not found with email = " + req.params.email
            });            
        }
        res.status(200).send({
            message: `These are the items on ${KitchenEmail}'s menu`,
            items
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with email = " + req.params.email
            });                
        }
        return res.status(500).send({
            message: "Error retrieving item with email = " + req.params.email
        });
    });
};

/**
 * Collect the items information
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const deleteItem = (req, res) => {
    ItemModel.findOneAndRemove({_id: req.params.id}, {rawResult:true})
    .then(item => {
        if(!item.value) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.id
            });
        }
        res.send({
            message: "Item deleted successfully!", item
        });
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Could not delete item with id " + req.params.id
        });
    });
}

module.exports = {
    getItem,
    postItem,
    putItem,
    getItemByID,
    deleteItem,
    getItemByEmail
};