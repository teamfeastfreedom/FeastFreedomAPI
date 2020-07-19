const mongoose = require('mongoose');
const schema = require('./UserSchema');

module.exports = mongoose.model('users', schema)