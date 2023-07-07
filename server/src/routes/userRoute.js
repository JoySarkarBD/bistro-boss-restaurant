// External imports
const router = require('express').Router();

// Internal imports
const { registerUser } = require('../controllers/userController');



router.get('/user', registerUser);


// module exports
module.exports = router;