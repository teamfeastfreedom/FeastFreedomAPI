const mongoose = require('mongoose');
const schema = require('./CartSchema');

//module. exports = mongoose.model('items', schema)
var carts = mongoose.model('carts', schema)
module.exports = carts;