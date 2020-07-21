const mongoose = require('mongoose');
const validator = require('email-validator');
const Item = require('../../controllers/itemController');

const ValidateEmail = (value) => {
    return validator.validate(value);
}

module.exports = new mongoose.Schema({
    ItemName: {
        type: String,
        required: [true, 'Please enter the name for this item.']
    },
    KitchenEmail: {
        type: String,
        index: true,
        required: [true, 'Please enter your kitchens email.'],
        validate: [
            {validator: ValidateEmail, message: `{VALUE} is an invalid email address`}
        ]
    },
    ItemCatagory: {
        type: Number,
    },
    Price: {
        type: Number,
        required: [true, 'Please enter a price for this item.'],
    },
    ImagePath: {
        type: String,
        required: [true, 'Please enter an image of this item.'],
    }
});