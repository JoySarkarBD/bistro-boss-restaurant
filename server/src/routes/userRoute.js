// External imports
const router = require('express').Router();

// Internal imports
const {registerUser, updateUser, verifyEmail, loginUser} = require('../controllers/userController');
const {

    validateErrorResult,
    loginFieldValidation, registrationFieldValidate, updateFieldValidate
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

// module exports
module.exports = router;