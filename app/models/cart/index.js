const mongoose = require('mongoose');
const schema = require('./CartSchema');

//module. exports = mongoose.model('items', schema)
module.exports = mongoose.model('carts', schema)
