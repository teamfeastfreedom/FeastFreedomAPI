const bodyParser = require('body-parser');
const UserModel = require('../models/user/index.js');

/** DONE
 * Collect all the information from all users
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const getUser = (req, res) => {
    console.log("INSIDE GETUSER")
    UserModel.find({})
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong while retrieving users."
        });
    });
};

/** DONE
 * Collect the users information
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const postUser = (req, res) => {
    const UserName = req.body.UserName;
    const Email = req.body.Email;
    const Password = req.body.Password;
    const Question1 = req.body.Question1;
    const Answer1 = req.body.Answer1;
    const Question2 = req.body.Question2;
    const Answer2 = req.body.Answer2;

    UserModel.create({
        //_id,
        UserName,
        Email,
        Password,
        Question1,
        Answer1,
        Question2,
        Answer2
    }).then((user) => { // user created successfully
        return res.json({
            message: 'You have now signed up.', user
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

/** 
 * Update a single users information by passing _id
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const putUser = (req, res) => {
    console.log("Inside putUser")
    UserModel.findById(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id = " + req.params.id
            });
        }
        let UserName = user.UserName;
        let Email = user.Email;
        let Password = user.Password;
        let Question1 = user.Question1;
        let Answer1 = user.Answer1;
        let Question2 = user.Question2;
        let Answer2 = user.Answer2;

        if(req.body.UserName != null) { UserName = req.body.UserName; }
        if(req.body.Email != null) { Email = req.body.Email; }
        if(req.body.Password != null) { Password = req.body.Password; }
        if(req.body.Question1 != null) { Question1 = req.body.Question1; }
        if(req.body.Question2 != null) { Question2 = req.body.Question2; }
        if(req.body.Answer1 != null) { Answer1 = req.body.Answer1; }
        if(req.body.Answer2 != null) { Answer2 = req.body.Answer2; }

        UserModel.updateOne( {_id: req.params.id}, {$set: {
                UserName,
                Email,
                Password,
                Question1,
                Answer1,
                Question2,
                Answer2
            }},
            function(err, res) {
                if (err) { throw err; }
                console.log("1 document updated");
        }).then(user => {
            return res.json({
                message: "finished updating!!!!!!", user
            })
        }).catch( err => {
            if(err.code == 11000) {
                return res.status(422).send({
                    message: '${Email} is already a registered user.',
                    errors: error.errors
                });  
            } else {
                console.log(err)
                return res.status(500).send({
                    message: 'There was an unexpected error during signup.'
                })
            }
        })
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id = " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id = " + req.params.id
        });
    });
    console.log("Heloooooooooooooooooooooo")
};

/** DONE
 * Collect a single users information by passing _id
 * 
 * @param {object} id   This is passed in the url and signifies  the user to query
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const getUserByID = (req, res) => {
    UserModel.findById(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id = " + req.params.id
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id = " + req.params.id
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
const getUserByEmail = (req, res) => {
    UserModel.findOne({Email: req.params.email})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id = " + req.params.email
            });            
        }
        res.send(user);
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
    deleteUser,
    getUserByEmail
};