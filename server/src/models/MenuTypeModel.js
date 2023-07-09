const mongoose = require('mongoose');

const menuTypeSchema = new mongoose.Schema({
        name: {
            type: String,
            trim: true,
            required: true,
        }
    }, { timestamps: true, versionKey: false });

const menuModel = mongoose.model('MenuType', menuSchema);

module.exports = menuModel;
