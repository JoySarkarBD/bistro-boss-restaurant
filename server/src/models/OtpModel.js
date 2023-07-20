// External imports
const mongoose = require('mongoose');
// create menu schema
const otpSchema = mongoose?.Schema({
    email: {
        type: String,
        required: true,
        validate: {
            validator: function (email) {
                // Custom email validation logic
                return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
            },

            message: 'Invalid email format'
        },
    },

    otp: {
        type: Number,
        required: true,
    },

    expiresIn: {
        type: Date,
        required: true,
    },

    status: {
        type: Boolean,
        default: false
    }
}, {
    versionKey: false,
    timeStamp: true
})

const OtpModel = mongoose.model('Otp', otpSchema);
// module exports
module.exports = OtpModel