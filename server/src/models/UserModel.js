// External imports
const mongoose = require('mongoose');


// create user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim:true,
        match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        required: true,
    },
    address: {
        type: String,
        trim:true,

    },
    password: {
        type: String,
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
}, {timestamps: true, versionKey: false});

const UserModel = mongoose.model('User', userSchema);


// module exports
module.exports = UserModel;
