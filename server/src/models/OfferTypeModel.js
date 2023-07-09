const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true,
        },
        discount:{
            type:String,
            trim: true,
            required: true,
        },
        details:{
            type: String,
            trim: true,
            required: true,
        }
    }, { timestamps: true, versionKey: false });

const menuModel = mongoose.model('OfferType', menuSchema);

module.exports = menuModel;
