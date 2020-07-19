const User = require('../models/user/index.js');

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
                message: `${Email} is already registered.`,
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

module.exports = {
    signupUser
};