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


// @desc    Register a user
// @route   POST /api/v1/users/register
// @access  Public
const registerUser = async (req, res) => {
    try {
        const {email, password} = req.body
        const newUser = await new UserModel({
            email,
            password: await hashPassword(password, 10)
        }).save();

        if (newUser._id && newUser?.email) {

            let emailText = `
              <div style="text-align: center; padding: 20px;">
                <h2>Email Verification</h2>
                <p>Thank you for registering. Please click the button below to verify your email address:</p>
                <a href=http://localhost:3000/verifyUser/${newUser._id} style="display: inline-block; padding: 10px 20px; background-color: #4CAF50; color: white; text-decoration: none; border-radius: 4px;">Verify Email</a>
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
                    data: {
                        userId: newUser?._id,
                        email: newUser?.email,
                    },
                    msg: `A mail was sent to your ${newUser?.email}. Please verify`
                })
            } else {
                res.status(400).json({
                    status: 'failed',
                    data: 'something is wrong',

                })
            }

        }

    } catch (error) {
        res.status(404).json({
            status: 'failed',
            data: error?.message
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
            return res.status(200).json({
                msg: 'failed',
                data: 'user already verified'
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

            generateCookies(res, user, cookieExpireTime, '30d')

            const userInfo = {
                userId: user?._id,
                name: user?.name || 'anonymous',
                email: user?.email,
                verified: user?.verified,
                address: user?.address || false,

            }
            // send success response
            res.status(200).json({
                msg: 'success',
                data: {
                    accessToken: generateAccessToken(user, '1d'),
                    userInfo,
                    roles: Object.values(user?.roles)?.filter(Boolean),
                }
            })
        }

    } catch (error) {
        res.status(400).json({
            status: 'failed',
            data: error.message
        });
    }
};

// @desc    Update user details
// @route   PUT /api/v1/users/update-user/:userId
// @access  Private
const updateUser = async (req, res) => {
    try {
        const {name, address, password} = req?.body
        const foundUser = await UserModel.findById(req.params?.userId)
        if (foundUser?._id && foundUser.verified) {
            // desc update user
            const user = await UserModel.findByIdAndUpdate(req.params?.userId, {
                $set: {
                    name: name || foundUser.name,
                    address: address || foundUser.address,
                    password: (password && await hashPassword(password, 10)) || foundUser.password
                }
            }, {new: true, upsert: true}).select('-password -updatedAt -createdAt -roles -verified');

            // desc send response
            if (user?._id && user?.name) {
                res.status(200).json({
                    msg: 'success',
                    data: user
                });
            } else {
                res.status(200).json({
                    msg: 'failed',
                    data: 'user not updated, please try again later....'
                });
            }
        } else {
            res.status(401).json({
                statusCode: 401,
                msg: 'Unauthorized user'
            })
        }


    } catch (e) {
        res.status(200).json({
            status: 'failed',
            data: error?.message
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

            generateCookies(res, user, cookieExpireTime, '30d');
            // send success response
            const userInfo = {
                userId: user?._id,
                name: user?.name || 'anonymous',
                email: user?.email,
                verified: user?.verified,
                address: user?.address || false,
            }

            res.status(200).json({
                msg: 'success',
                data: {
                    accessToken: generateAccessToken(user, '1d'),
                    userInfo,
                    roles: Object.values(user.roles)?.filter(Boolean)
                }
            });

        } else {
            res.status(403).json({
                msg: 'failed',
                data: 'username or password does not matched'
            })
        }

    } catch (e) {
        res.status(400).json({
            msg: 'failed',
            data: e.message
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
        next(createError(400, e.message))
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
            return next(createError(401, " Unauthorized user"))
        }


    } catch (e) {
        next(createError(400, e.message))
    }
}

// module exports
module.exports = {
    registerUser,
    updateUser,
    verifyEmail,
    loginUser,
    createOtp,
    verifyOtp
}