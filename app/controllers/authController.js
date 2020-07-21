const User = require('../models/user/index.js');
const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const jwt = require('jsonwebtoken');
//const bcrypt = require('bcryptjs');
/**
 * Register a new user, and save into database
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const signupUser = (req, res) => {
    //const _id = req.body._id;
    const UserName = req.body.UserName;
    const Email = req.body.Email;
    const Password = req.body.Password;
    //const Password = bcrypt.hashSync(req.body.password, 8);
    const Question1 = req.body.Question1;
    const Answer1 = req.body.Answer1;
    const Question2 = req.body.Question2;
    const Answer2 = req.body.Answer2;

    User.create({
        //_id,
        UserName,
        Email,
        Password,
        Question1,
        Answer1,
        Question2,
        Answer2
    }).then((user) => { // user created successfully
        const token = jwt.sign({id: user._id}, process.env.SECRET, {
            expiresIn: 3600 //expires after 1 hour
        });
        //return res.status(200).send({ auth: true, token: token });
        return res.json({
            message: 'You have now signed up.', user,
            auth: true,
            token: token,
            date: Date()
        })
    }).catch((error) => { // user not created and throw indicating error
        if(error.name === 'ValidationError') {
            console.log('Hit error in ValidationError.')
            return res.status(422).json({
                message: 'There was an issue with your signup request',
                errors: error.errors
            })
        } else if(error.code == 11000) {
            console.log(error);
            return res.status(422).json ({
                message: `${Email} is already a registered user.`,
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


const authorizeUser = (req, res) => {
    User.findOne({Email: req.body.Email})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id = " + req.params.email
            });            
        }
        const token = jwt.sign({id: user._id}, process.env.SECRET, {
            expiresIn: 3600 //expires after 1 hour
        });
        //return res.status(200).send({ auth: true, token: token });
        return res.status(200).send({
            message: 'You have now signed up.', 
            user: user,
            auth: true,
            token: token,
            date: Date()
        })
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
module.exports = {
    signupUser,
    authenticateToken,
    authorizeUser
};