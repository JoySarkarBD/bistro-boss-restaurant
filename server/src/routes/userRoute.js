// External imports
const router = require('express').Router();

// Internal imports
const { registerUser, updateUser, verifyEmail } = require('../controllers/userController');
const { emailValidate, validateErrorResult, ValidateUpdateUser } = require("../middlewares/authValidateMiddleware");

// register
router.post('/register', emailValidate, validateErrorResult, registerUser);


// update user
router.put('/update-user/:userId', ValidateUpdateUser, validateErrorResult, updateUser);

// verify user email
router.put('/verify-email/:id', verifyEmail)

// module exports
module.exports = router;