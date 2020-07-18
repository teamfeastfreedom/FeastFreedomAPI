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

module.exports = {
    getUser,

};