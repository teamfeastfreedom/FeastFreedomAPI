const mongoose = require('mongoose');
const Cart = require('../../controllers/cartController');
const itemSchema = require('../item/itemSchema');

module.exports = new mongoose.Schema({
    UserId: {
        type: String
    },
    KitchenId: {
        type: String
    },
    Items: [{
        items: [itemSchema],
        Quantity: Number,
        itemTotal: Number
    }
    ],
    cartTotal: {
        type: Number
    }
});
