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
    resetPassword,
    accountVerificationLink,
    handleLogout,
    updatePassword
} = require('../controllers/userController');


// all type of field validation
const {
    validateErrorResult,
    loginFieldValidation,
    registrationFieldValidate,
    updateFieldValidate,
    otpFieldValidation,
    otpCodeFieldValidation,
    resetPasswordFieldValidation,
    updatePasswordFieldValidation
} = require("../middlewares/authValidateMiddleware");
const authVerifyMiddleWare = require("../middlewares/authVerifyMiddleWare");
const {refreshToken} = require("../middlewares/refreshToken");

// register
router.post('/users/register', registrationFieldValidate, validateErrorResult, registerUser);

// update user
router.put('/users/update-user/:userId', updateFieldValidate, validateErrorResult, authVerifyMiddleWare, updateUser);

// verify user email
router.put('/users/verify-email/:userId', verifyEmail)

// account verification route
router.post('/users/verification-link/:userId', accountVerificationLink)

// login user
router.post('/users/login', loginFieldValidation, validateErrorResult, loginUser)

// verify otp
router.post('/users/create-otp', otpFieldValidation, validateErrorResult, createOtp);

// verify otp
router.put('/users/verify-otp', otpCodeFieldValidation, validateErrorResult, verifyOtp)

// reset password
router.put('/users/reset-password', resetPasswordFieldValidation, validateErrorResult, resetPassword);


// refresh token
router.get('/users/refresh-token', refreshToken)


//logout route
router.get('/users/logout', handleLogout)

// update password
router.put('/users/update-password', updatePasswordFieldValidation, validateErrorResult, updatePassword)


// module exports
module.exports = router;