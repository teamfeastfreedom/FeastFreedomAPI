const mongoose = require('mongoose');
//const Item = require('../../controllers/itemController');

module.exports = new mongoose.Schema({
    ItemName: {
        type: String,
        //required: [true, 'Please enter the name for this item.']
    },
    ItemCatagory: {
        type: Number,
    },
    Price: {
        type: Number,
        //required: [true, 'Please enter a price for this item.'],
    },
    ImagePath: {
        type: String,
        //required: [true, 'Please enter an image of this item.'],
    },
    ItemDescription: {
        type:String,
        //required: [true, 'Please enter a description of this item.']
    }
});
