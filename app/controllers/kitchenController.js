const bodyParser = require('body-parser');
const KitchenModel = require('../models/kitchen/index.js');


/**
 * Collect all the information from all kitchens
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const getKitchen = (req, res) => {
    console.log("INSIDE GET KITCHEN")
    Kitchen.find({})
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
    return res.json({ 
        message: "Not implemented yet"
    });
};

/**
 * Collect the kitchens information
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const putKitchen = (req, res) => {
    return res.json({ 
        message: "Not implemented yet"
    });
};

/**
 * Collect the kitchens information
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const getKitchenByID = (req, res) => {
    return res.json({ 
        message: "Not implemented yet"
    });
};

/**
 * Collect the kitchens information
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const deleteKitchen = (req, res) => {
    return res.json({ 
        message: "Not implemented yet"
    });
};

module.exports = {
    getKitchen,
    postKitchen,
    putKitchen,
    getKitchenByID,
    deleteKitchen
};