// External imports
const router = require('express').Router();

// Internal imports
const {registerUser, updateUser} = require('../controllers/userController');
const {emailValidate, validateErrorResult, ValidateUpdateUser} = require("../middlewares/authValidateMiddleware");

// register
router.post('/register', emailValidate, validateErrorResult, registerUser);


// update user
router.put('/update-user', ValidateUpdateUser, validateErrorResult, updateUser);

// module exports
module.exports = router;