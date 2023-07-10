const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    offerType: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OfferType',
        required: true
    },
    recipe: {
        type: String,
        trim: true,
        required: true,
    },
    image: {
        type: String,
        trim: true,
        required: true,
    },
    category: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
}, { timestamps: true, versionKey: false });

const menuModel = mongoose.model('Menu', menuSchema);

module.exports = menuModel;
