// Internal imports
const User = require('../models/UserModel');
const UserModel = require("../models/UserModel");
const sendEmail = require("../helpers/sendEmail");

// Register a new user
const registerUser = async (req, res) => {
    try {

        const newUser = await new UserModel(req?.body).save();

        if (newUser._id && newUser?.email) {

            let emailText = `
              <div style="text-align: center; padding: 20px;">
                <h2>Email Verification</h2>
                <p>Thank you for registering. Please click the button below to verify your email address:</p>
                <a href=http://localhost:3000/verify-email-address/${newUser?.email} style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Verify Email</a>
                <p>If you did not create an account, you can safely ignore this email.</p>
              </div>
            
            `
            // mail info
            const mailInfo = {receivers: [newUser?.email], emailSubject: `Verify Email`, emailText}

            //     send mail for verification
            const mailResult = await sendEmail(mailInfo);


            // check mail successfully sent or not
            if (mailResult?.messageId) {
                res.status(200).json({
                    status: 'success',
                    data: newUser,
                    msg: `A mail was sent to your ${newUser?.email}. Please verify`
                })
            } else {
                res.status(200).json({
                    status: 'failed',
                    data: 'something is wrong',

                })
            }

        }

    } catch (error) {
        console.log(error.message)
        res.status(200).json({
            status: 'failed',
            data: error?.message
        });
    }
};




// update user
const updateUser = async (req, res, next) => {
    try {
        console.log(req.body)

    } catch (e) {
        res.status(200).json({
            status: 'failed',
            data: error?.message
        });
    }
}

module.exports = {
    registerUser,
    updateUser
}