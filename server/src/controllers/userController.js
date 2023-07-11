// Internal imports
const UserModel = require("../models/UserModel");
const sendEmail = require("../helpers/sendEmail");

// Register a new user

// @desc    Register a user
// @route   POST /api/v1/register
// @access  Public
const registerUser = async (req, res) => {
    try {

        const newUser = await new UserModel(req?.body).save();

        if (newUser._id && newUser?.email) {

            let emailText = `
              <div style="text-align: center; padding: 20px;">
                <h2>Email Verification</h2>
                <p>Thank you for registering. Please click the button below to verify your email address:</p>
                <a href=http://localhost:3000/verifyUser/${newUser?._id} style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Verify Email</a>
                <p>If you did not create an account, you can safely ignore this email.</p>
              </div>
            
            `
            // mail info
            const mailInfo = { receivers: [newUser?.email], emailSubject: `Verify Email`, emailText }

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

// Update user

// @desc    Update user details
// @route   PUT /api/v1/update-user/:userId
// @access  Private
const updateUser = async (req, res, next) => {
    try {
        const { name, address, password } = req?.body

        const user = await UserModel.findByIdAndUpdate(req.params?.userId, {
            $set: { name, address, password }
        }, { new: true, upsert: true });

        if (user?._id && user?.name) {
            res.status(200).json({
                status: 'success',
                data: user
            });
        } else {
            res.status(200).json({
                status: 'failed',
                data: 'user not updated, please try again later....'
            });
        }

    } catch (e) {
        res.status(200).json({
            status: 'failed',
            data: error?.message
        });
    }
}

// Verify email

// @desc    Update user details
// @route   PUT /api/v1/verify-email/:id
// @access  Private
const verifyEmail = async (req, res) => {
    try {


        // already verified email
        const isVerified = await UserModel.findById(req?.params?.id);

        if (isVerified?._id && isVerified?.verified) {
            return res.status(200).json({
                status: 'failed',
                data: 'user already verified'
            });
        } else {
            // Find the user by email in the database and update the "isVerified" field
            const user = await UserModel.findOneAndUpdate(
                { _id: req.params.id },
                { $set: { verified: true } },
                { new: true }
            ).select('-password');

            if (!user) {
                return res.status(200).json({
                    status: 'failed',
                    data: 'user do not exist'
                });
            }

            res.status(200).json({
                status: 'success',
                data: user
            });
        }

    } catch (error) {
        res.status(200).json({
            status: 'failed',
            data: error.message
        });
    }
};


// module exports
module.exports = {
    registerUser,
    updateUser,
    verifyEmail
}