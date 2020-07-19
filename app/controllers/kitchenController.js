const bodyParser = require('body-parser');
const KitchenModel = require('../models/kitchen/index.js');


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
                message: `${Email} is already a registered kitchen.`,
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