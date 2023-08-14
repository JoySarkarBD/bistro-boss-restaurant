// External imports
const mongoose = require('mongoose');


// create user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true,
        validate: {
            validator: function (email) {
                // Custom email validation logic
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
            },

            message: 'Invalid email format'
        },
    },
    address: {
        type: String,
        trim: true,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
        trim: true,
    },
    roles: {
        user: {
            type: Number,
            default: 420
        },
        admin: Number
    },

    avatar: {
        publicId: String,
        secureUrl: String
    },

    verified: {
        type: Boolean,
        default: false
    }
}, {timestamps: true, versionKey: false});

const UserModel = mongoose.model('User', userSchema);


// module exports
module.exports = UserModel;
