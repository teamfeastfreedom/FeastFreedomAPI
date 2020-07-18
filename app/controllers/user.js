const bodyParser = require('body-parser');

/**
 * Collect the users information
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const getUser = (req, res) => {
    return res.json({ 
        id:1,
        name:"Colby Kure",
        age:23,
        gender:"male"
    });
};


/**
 * Which user is making the request?
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const whichUser = (req, res) => {
    const name = req.body.name;

    if(!name) { // if name doesn't exist then throw error
        return res.status(422).json({
            message: 'Your need to supply a name.'
        });
    }

    return res.json({
        message: `Your name is ${name}. Hello!`
    });
};

/**
 * Update a specific user by id
 * 
 * @param {object} req  This is the request object
 * @param {object} res  This is the response object
 */
const update = (res,req) => {
    const uid = req.params.id;
    console.log(userid)
    return res.json({
        message: 'The user you want to update is' + uid
    })
};

module.exports = {
    getUser,
    whichUser,
    update
};