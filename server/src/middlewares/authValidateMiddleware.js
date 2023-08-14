const {check, validationResult} = require("express-validator");
const createError = require('http-errors')
const UserModel = require("../models/UserModel");

// email validate
const registrationFieldValidate = [
    // name
    check('name').trim().notEmpty().withMessage('Name required').isLength({min: 2, max: 31}),

    //email
    check("email")
        .trim()
        .toLowerCase()
        .isEmail()
        .withMessage("Invalid email")
        .custom(async (value) => {
            try {
                const existingUser = await UserModel.findOne({email: value});

                if (existingUser) {
                    throw createError(409, 'This email already taken')
                } else {
                    return true
                }
            } catch (e) {
                throw createError(e.message)
            }
        }),

    // password
    check('password').notEmpty().withMessage('Password required').isStrongPassword({
        minLength: 8, minLowercase: 1, minNumbers: 1, minUppercase: 1, minSymbols: 1,
    }).withMessage('Min 8 char and include at least 1 letter, 1 number and 1 special character!')
]

// validate handler
const validateErrorResult = (req, res, next) => {
    const errors = validationResult(req).mapped();

    if (Object.keys(errors).length === 0) {
        next()
    } else {
        let errorObj = {}
        for (let error in errors) {
            errorObj[error] = errors[error].msg
        }

        res.status(400).json({
            msg: 'failed',
            errors: errorObj
        })
    }
}


// update user validator
const updateFieldValidate = [
    // check('avatar').trim().custom((value) => {
    //     if (!value) {
    //         return true
    //     } else {
    //         if (typeof value !== "string") {
    //             throw createError('Not a valid file')
    //         } else {
    //             return true
    //         }
    //     }
    // }),

    check('name').trim().custom((value) => {
        if (!value.length) {
            return true
        } else {
            if (value.length < 3) {
                throw createError('Minimum 3 character required')
            }
            if (value.length >= 31) {
                throw createError('Maximum 31 character required')
            } else {
                return true
            }
        }
    }),

    // check('email').notEmpty().withMessage('Email required').isEmail().withMessage('Invalid email'),

    check('address').trim().custom((value) => {
        if (!value.length) {
            return true
        } else {
            if (value.length < 2) {
                throw createError('Address minimum need 2 character')
            }
            if (value.length >= 70) {
                throw createError('Address maximum use 70 character')
            } else {
                return true
            }
        }
    })
    ,
    check('phone').trim().custom((value) => {

        if (!value.length) {
            return true
        } else {
            if (value.length === 11 && !/^(?:\+?88)?01[15-9]\d{8}$/.test(value)) {
                throw createError('Invalid Phone No')
            } else {
                return true
            }
        }
    })



]


// login validation
const loginFieldValidation = [
    check("email")
        .trim()
        .notEmpty().withMessage('Email required')
        .toLowerCase()
        .isEmail()
        .withMessage("Invalid email")
    ,
    check("password")
        .notEmpty()
        .withMessage('Password required')

]


// otp field validation
const otpFieldValidation = [

    check("email")
        .trim()
        .notEmpty()
        .withMessage('Email required')
        .isEmail()
        .withMessage("Invalid email")
        .toLowerCase()

]

// otp field validation
const otpCodeFieldValidation = [

    check("otp")
        .trim()
        .notEmpty()
        .withMessage('Otp required')
        .isNumeric()
        .withMessage('OTP must be number type')
        .isLength({max: 4, min: 4}).withMessage('OTP Must be 4 char long')

]

// otp field validation
const resetPasswordFieldValidation = [

    check('password').custom((value) => {
        if (value.length < 8) {
            throw createError('Password length must 8 character long inclueded [Aa@.....]')
        }
        if (!/[A-Z]/.test(value)) {
            throw createError('Password must be includes an uppercase')
        }

        if (!/[a-z]/.test(value)) {
            throw createError('Password must be includes an lowercase')
        }

        if (!/[$@!%*?&]/.test(value)) {
            throw createError('Password must have a special character')
        } else {
            return true

        }


    })

]


// update password validation
const updatePasswordFieldValidation = [
    check('email').trim().toLowerCase().notEmpty().withMessage('Email required').isEmail().withMessage('Invalid email address'),

    check("password").trim()
        .notEmpty()
        .withMessage('Password required').custom((value) => {
        if (value.length < 8) {
            throw createError('Password length must 8 character long inclueded [Aa@.....]')
        }
        if (!/[A-Z]/.test(value)) {
            throw createError('Password must be includes an uppercase')
        }

        if (!/[a-z]/.test(value)) {
            throw createError('Password must be includes an lowercase')
        }

        if (!/[$@!%*?&]/.test(value)) {
            throw createError('Password must have a special character')
        } else {
            return true

        }
    }),
    check("newPassword").trim()
        .notEmpty()
        .withMessage('Password required').custom((value) => {
        if (value.length < 8) {
            throw createError('Password length must 8 character long inclueded [Aa@.....]')
        }
        if (!/[A-Z]/.test(value)) {
            throw createError('Password must be includes an uppercase')
        }

        if (!/[a-z]/.test(value)) {
            throw createError('Password must be includes an lowercase')
        }

        if (!/[$@!%*?&]/.test(value)) {
            throw createError('Password must have a special character')
        } else {
            return true

        }
    })

]

module.exports = {
    validateErrorResult,
    registrationFieldValidate,
    updateFieldValidate,
    loginFieldValidation,
    otpFieldValidation,
    otpCodeFieldValidation,
    resetPasswordFieldValidation,
    updatePasswordFieldValidation

}
