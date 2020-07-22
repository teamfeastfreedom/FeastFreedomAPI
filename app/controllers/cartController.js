const bodyParser = require('body-parser');
const CartModel = require('../models/cart/index.js');
const carts = require('../models/cart/index.js');


// const bodyParser = require('body-parser');
// const ItemModel = require('../models/item/index.js');

/** DONE
 * Collect all the information from all items
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const getCart = (req, res) => {
    CartModel.find({})
    .then(carts => {
        res.send(carts);
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
const postCart = (req, res) => {
    const UserId = req.body.UserId;
    const KitchenId = req.body.KitchenId;
    const Items = req.body.Items;
    const cartTotal = req.body.cartTotal;

    CartModel.create({
        UserId,
        KitchenId,
        Items,
        cartTotal,
    }).then((cart) => { // item created successfully
        return res.json({
            message: `You have added a new item(${cart.UserId}) to no menu`,
            cart
        })
    }).catch((error) => { // item not created and throw indicating error
        if(error.name === 'ValidationError') {
            console.log('Hit error in ValidationError.')
            return res.status(422).json({
                message: 'There was an issue with your create request',
                errors: error.errors
            })
        }else {
            console.log(error);
            return res.status(500).json({
                message: 'There was an unexpected error during post'
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
const putCart = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Item content can not be empty"
        });
    }

    // Find item and update it with the request body
    CartModel.findByIdAndUpdate({_id:req.params.id}, {
        $set: req.body
    }, {new: true, useFindAndModify: false})
    .then(cart => {
        if(!cart) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.id
            });
        }

        res.send(cart);
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
const getCartByID = (req, res) => {
    CartModel.findById(req.params.id)
    .then(cart => {
        if(!cart) {
            return res.status(404).send({
                message: "Cart not found with id = " + req.params.id
            });            
        }
        res.send(cart);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Cart not found with id = " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving cart with id = " + req.params.id
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
// const getItemByEmail = (req, res) => {
//     console.log("asdf")
//     ItemModel.find({KitchenEmail: req.params.email})
//     .then(items => {
//         console.log(items)
//         if(!items) {
//             return res.status(404).send({
//                 message: "Item not found with email = " + req.params.email
//             });            
//         }
//         res.status(200).send({  
//             message: `These are the items on ${req.params.email}'s menu`,
//             items
//         });
//     }).catch(err => {
//         if(err.kind === 'ObjectId') {
//             return res.status(404).send({
//                 message: "Item not found with email = " + req.params.email
//             });                
//         }
//         return res.status(500).send({
//             message: "Error retrieving item with email = " + req.params.email
//         });
//     });
// };

/** DONE
 * Collect the items information
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const deleteCart = (req, res) => {
    CartModel.findOneAndRemove({_id: req.params.id}, {rawResult:true})
    .then(cart => {
        if(!cart.value) {
            return res.status(404).send({
                message: "Item not found with id " + req.params.id
            });
        }
        res.send({
            message: "Item deleted successfully!", cart
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
    getCart,
    postCart,
    putCart,
    getCartByID,
    deleteCart,
    //getItemByEmail
};