const mongoose = require('mongoose');
const schema = require('./itemSchema');

//module. exports = mongoose.model('items', schema)
module.exports = mongoose.model('items', schema)
