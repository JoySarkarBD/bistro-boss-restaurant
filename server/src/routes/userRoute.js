// External imports
const router = require('express').Router();

// Internal imports
const {
    registerUser,
    updateUser,
    verifyEmail,
    loginUser,
    createOtp,
    verifyOtp,
    resetPassword
} = require('../controllers/userController');
const {

    validateErrorResult,
    loginFieldValidation, registrationFieldValidate, updateFieldValidate, otpFieldValidation, otpCodeFieldValidation,
    resetPasswordFieldValidation
} = require("../middlewares/authValidateMiddleware");
const authVerifyMiddleWare = require("../middlewares/authVerifyMiddleWare");

// register
router.post('/users/register', registrationFieldValidate, validateErrorResult, registerUser);

// update user
router.put('/users/update-user/:userId', updateFieldValidate, validateErrorResult, authVerifyMiddleWare, updateUser);

// verify user email
router.put('/users/verify-email/:userId', verifyEmail)

// login user
router.post('/users/login', loginFieldValidation, validateErrorResult, loginUser)

// verify otp
router.post('/users/create-otp', otpFieldValidation, validateErrorResult, createOtp);

// verify otp
router.put('/users/verify-otp', otpCodeFieldValidation, validateErrorResult, verifyOtp)

// reset password
router.put('/users/reset-password', resetPasswordFieldValidation, validateErrorResult, resetPassword)

// module exports
module.exports = router;