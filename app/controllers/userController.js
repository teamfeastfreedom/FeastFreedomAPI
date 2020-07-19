const bodyParser = require('body-parser');
const User = require('../models/user/index.js');

/**
 * Collect all the information from all users
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const getUser = (req, res) => {
    console.log("INSIDE GETUSER")
    User.find({})
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving users."
        });
    });
};

/**
 * Collect the users information
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const postUser = (req, res) => {
    return res.json({ 
        message: "Not implemented yet"
    });
};

/**
 * Collect the users information
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const putUser = (req, res) => {
    return res.json({ 
        message: "Not implemented yet"
    });
};

/**
 * Collect the users information
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const getUserByID = (req, res) => {
    return res.json({ 
        message: "Not implemented yet"
    });
};

/**
 * Collect the users information
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const deleteUser = (req, res) => {
    return res.json({ 
        message: "Not implemented yet"
    });
};

module.exports = {
    getUser,
    postUser,
    putUser,
    getUserByID,
    deleteUser
};