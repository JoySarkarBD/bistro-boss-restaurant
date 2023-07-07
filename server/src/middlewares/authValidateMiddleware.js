const {check, validationResult} = require("express-validator");
const createError = require('http-errors')
const UserModel = require("../models/UserModel");

// email validate

const emailValidate = [
    //email
    check("email")
        .isEmail()
        .withMessage("Invalid email address")
        .trim()
        .toLowerCase()
        .custom(async (value) => {
            try {
                const existUser = await UserModel.findOne({email: value});
                if (existUser?._id && existUser?.email) {
                    throw createError("Email already in use");
                }
            } catch (error) {
                throw createError(error.message);
            }
        }),
]


// update user validator

const ValidateUpdateUser = [

    check('name').trim().notEmpty().withMessage('Name is required').isLength({min: 3}).withMessage('Name must be at least 3 characters long'),
    check('address').notEmpty().withMessage('Address is required').trim(),
    check('password').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }).withMessage('Weak password')
]

// update user validate handler
const validateErrorResult = (req, res, next) => {
    const errors = validationResult(req).mapped();
    if (Object.keys(errors).length === 0) {
        next()
    } else {
        res.status(200).json({
            status: 'failed',
            errors
        })
    }
}


module.exports = {
    emailValidate,
    ValidateUpdateUser,
    validateErrorResult
}
