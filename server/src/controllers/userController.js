// external imports
const createError = require('http-errors');

// Internal imports
const UserModel = require("../models/UserModel");
const OtpModel = require("../models/OtpModel");
const sendEmail = require("../helpers/sendEmail");
const {
    hashPassword,
    verifyPassword,
    generateAccessToken,
    generateCookies,
    generateTime
} = require("../helpers/utilitis");
const fs = require('fs')
const path = require('path')


// @desc    Register a user
// @route   POST /api/v1/users/register
// @access  Public
const registerUser = async (req, res, next) => {
    try {
        const {name, email, password} = req.body
        const newUser = await new UserModel({
            name,
            email,
            password: await hashPassword(password, 10)
        }).save();

        if (newUser._id && newUser?.email) {

            let emailText = `
              <div style="text-align: center; padding: 20px;">
                <h2>Email Verification</h2>
                <p>Thank you for registering. Please click the button below to verify your email address:</p>
                <a href=${process.env.FRONTEND_URL}/verifyUser/${newUser._id} style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Verify Email</a>
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
                    msg: 'success',
                    data: `A mail was sent to your ${newUser?.email}. Please verify`
                })
            } else {
                return next(createError(403, 'Email could not sent this time'))
            }

        }

    } catch (error) {
        res.status(404).json({
            msg: 'failed',
            err: error?.message
        });
    }
};

// Verify email
// @desc    Update user details
// @route   PUT /api/v1/users/verify-email/:id
// @access  Private
const verifyEmail = async (req, res) => {
    try {
        // already verified email
        const isVerified = await UserModel.findById(req?.params?.userId);
        if (isVerified?._id && isVerified?.verified) {
            return res.status(403).json({
                msg: 'failed',
                err: 'user already verified'
            });
        } else {
            // Find the user by email in the database and update the "isVerified" field
            const user = await UserModel.findOneAndUpdate(
                {_id: req.params.userId},
                {$set: {verified: true}},
                {new: true}
            )/*.select('-password -createdAt -updatedAt')*/;


            // if no user found
            if (!user) {
                return res.status(401).json({
                    msg: 'Unauthorized user',
                });
            }

            /*if user found then do the next stuff && send the response*/

            // generate && set cookie & define cookie expire time
            const cookieExpireTime = 30 * 24 * 60 * 60 * 1000;

            generateCookies(res, {userId: user?._id, email: user?.email}, cookieExpireTime, '30d')

            const userInfo = {
                userId: user?._id,
                name: user?.name || 'anonymous',
                email: user?.email,
                verified: user?.verified,
                address: user?.address || null,
                avatar: user?.avatar || null,
                phone: user?.phone || null,

            }
            // send success response
            res.status(200).json({
                msg: 'success',
                data: {
                    accessToken: generateAccessToken({userId: user?._id, email: user?.email}, '10s'),
                    userInfo,
                    roles: Object.values(user?.roles)?.filter(Boolean),
                }
            })
        }

    } catch (error) {
        res.status(400).json({
            msg: 'failed',
            err: error.message
        });
    }
};

// @desc    Update user details
// @route   PUT /api/v1/users/update-user/:userId
// @access  Private
const updateUser = async (req, res) => {
    try {
        const {name, phone, address} = req?.body
        console.log(req?.body)
        const foundUser = await UserModel.findById(req.params?.userId)

        // console.log(foundUser)


    } catch (e) {
        res.status(400).json({
            status: 'failed',
            data: e?.message
        });
    }
}

// @desc    log in
// @route   PUT /api/v1/users/login
// @access  public
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body

        //  find the user first
        const user = await UserModel.findOne({email});

        if (user?._id && await verifyPassword(password, user?.password)) {

            //     generate cookie['refresh-token'] && access-token
            const cookieExpireTime = 30 * 24 * 60 * 60 * 1000;

            generateCookies(res, {userId: user?._id, email: user?.email}, cookieExpireTime, '30d');
            // send success response
            const userInfo = {
                userId: user?._id,
                name: user?.name || 'anonymous',
                email: user?.email,
                verified: user?.verified,
                address: user?.address || null,
                avatar: user?.avatar || null,
                phone: user?.phone || null
            }

            res.status(200).json({
                msg: 'success',
                data: {
                    accessToken: generateAccessToken({userId: user?._id, email: user?.email}, '30d'),
                    userInfo,
                    roles: Object.values(user.roles)?.filter(Boolean)
                }
            });

        } else {
            res.status(403).json({
                msg: 'failed',
                err: 'username or password does not matched'
            })
        }

    } catch (e) {
        res.status(404).json({
            msg: 'failed',
            err: e.message
        })
    }
}


// @desc    OTP
// @route   POST /api/v1/users/OTP
// @access  public
const createOtp = async (req, res, next) => {
    try {
        let otp;
        otp = Math.floor(1000 + Math.random() * 9000);
        const {email} = req.body;

        //     find the user first
        const user = await UserModel.findOne({email}).select('-password -createdAt -updatedAt');
        if (user?._id && user?.email === email) {

            // mail text
            let emailText = `
              <div style="text-align: center; padding: 20px;">
                <h2>Your OTP</h2>
                <h2>${otp}</h2>
                <p>Otp will expire in 5 minuites.</p>
              </div>
            
            `

            // mail information
            const mailInfo = {
                receivers: [email],
                emailSubject: `OTP Verification`,
                emailText
            }

            // send otp via nodemailer function
            const sendOtpViaNodeMailer = await sendEmail(mailInfo)

            // if otp send successfully then create a new otp in database and send response
            if (sendOtpViaNodeMailer?.messageId) {

                const newOtp = await new OtpModel({
                    email,
                    otp,
                    expiresIn: generateTime(300000),
                })?.save()

                res.status(201).json({
                    status: 'success',
                    data: newOtp,
                })

            } else {
                next(createError(500, 'Internal server error'))
            }

        } else {
            next(createError(401, 'Unauthorized user'))
        }


    } catch (e) {
        next(createError(404, e.message))
    }
}


// @desc    OTP
// @route   POST /api/v1/users/OTP
// @access  public
const verifyOtp = async (req, res, next) => {
    try {
        const {otp, email} = req.body

        //     find otp
        const foundedOtp = await OtpModel.findOne({otp, email});

        if ((foundedOtp?._id && foundedOtp?.email === email)) {
            if (foundedOtp?.status) {
                return next(createError(403, 'OTP already used'))
            } else {
                if (foundedOtp?.expiresIn > Date.now()) {
                    const modifiedOtp = await OtpModel.findOneAndUpdate({otp, email},
                        {$set: {status: true}}, {new: true}
                    )

                    res.status(200).json({
                        status: "success",
                        data: modifiedOtp
                    })
                } else {
                    return next(createError(403, 'OTP Expired'))
                }
            }
        } else {
            return next(createError(401, "Unauthorized user"))
        }


    } catch (e) {
        next(createError(404, e.message))
    }
}


// // @desc    OTP
// // @route   POST /api/v1/users/OTP
// // @access  public
const resetPassword = async (req, res, next) => {
    try {
        const {password, email} = req?.body;

        //     found user
        const foundUser = await UserModel.findOne({email}).select('-updatedAt -createdAt -password');

        if (foundUser?._id && foundUser?.email === email) {
            const modifiedUser = await UserModel.findOneAndUpdate({email}, {$set: {password: await hashPassword(password, 10)}}, {new: true});
            if (modifiedUser?._id) {
                res.status(200).json({
                    msg: "success",
                    data: modifiedUser
                })
            } else {
                next(createError(500, 'Internal server error'))
            }
        } else {
            next(createError(401, 'Unauthorized user'))
        }

    } catch (e) {
        next(createError(404, e.message))
    }
}


// // @desc    account verification link
// // @route   POST /api/v1/users/verification-link
// // @access  public
const accountVerificationLink = async (req, res, next) => {
    try {
        const id = req.params.userId;

        //    find user
        const user = await UserModel.findById(id).select('-updatedAt -createdAt -password')
        if (user?._id && user?.email) {

            let emailText = `
              <div style="text-align: center; padding: 20px;">
                <h2>Email Verification</h2>
                <p>Thank you for registering. Please click the button below to verify your email address:</p>
                <a href=${process.env.FRONTEND_URL}/verifyUser/${id} style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Verify Email</a>
                <p>If you did not create an account, you can safely ignore this email.</p>
              </div>
            
            `
            // mail info
            const mailInfo = {receivers: [user?.email], emailSubject: `Verify Email`, emailText}

            //     send mail for verification
            const mailResult = await sendEmail(mailInfo);


            // check mail successfully sent or not
            if (mailResult?.messageId) {
                res.status(200).json({
                    msg: 'success',
                    data: `A mail was sent to your ${user?.email}. Please verify`
                })
            } else {
                return next(createError(403, 'Email could not sent this time'))
            }

        } else {
            next(createError(401, 'Unauthorized user'))
        }


    } catch (e) {
        next(createError(404, e.message))
    }
}


// // @desc    logout
// // @route   get /api/v1/users/logout
// // @access  public
const handleLogout = async (req, res, next) => {
    try {
        const cookies = req.cookies;
        if (!cookies?.refreshToken) return res.sendStatus(204)
        res.clearCookie('refreshToken', {httpOnly: true, sameSite: 'strict', secure: true})
        return res.sendStatus(204)
    } catch (e) {
        next(createError(404, e.message))
    }
}


// // @desc    update password
// // @route   put /api/v1/users/update-password
// // @access  public
const updatePassword = async (req, res, next) => {
    try {
        const {email, password, newPassword} = req.body
        //     find and update the password
        const user = await UserModel.findOne({email});


        if (user?._id && await verifyPassword(password, user.password)) {

            const updatedUser = await UserModel.findOneAndUpdate({email}, {$set: {password: await hashPassword(newPassword, 10)}}, {new: true})

            if (updatedUser?._id) {
                res.status(201).json({
                    msg: 'success',
                    data: "Password updated successfully"
                })
            } else {
                next(createError(500, 'Internal server error, pleas try again'))
            }

        } else {
            res.status(403).json({
                msg: 'failed',
                err: 'username or password does not matched'
            })
        }

    } catch (e) {
        next(404, e.message)
    }
}

// module exports
module.exports = {
    registerUser,
    updateUser,
    verifyEmail,
    loginUser,
    createOtp,
    verifyOtp,
    resetPassword,
    accountVerificationLink,
    handleLogout,
    updatePassword
}