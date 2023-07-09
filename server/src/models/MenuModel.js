const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true,
        },
        menuType:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MenuType',
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
