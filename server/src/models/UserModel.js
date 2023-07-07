// External imports
const mongoose = require('mongoose');


// create user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    },
    address: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'moderator', 'customer'],
        default: 'customer',
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
}, { timestamps: true, versionKey: false });

const User = mongoose.model('User', userSchema);


// module exports
module.exports = User;
