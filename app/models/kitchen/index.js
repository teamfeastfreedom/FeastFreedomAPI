const mongoose = require('mongoose');
const schema = require('./KitchenSchema');

module.exports = mongoose.model('kitchens', schema)