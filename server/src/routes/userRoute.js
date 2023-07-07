const { registerUser } = require('../controllers/userController');

const router = require('express').Router();

router.get('/user', registerUser);

module.exports = router;