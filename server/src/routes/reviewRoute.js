// External imports
const router = require('express').Router();

// Internal imports
const { createReview, getReview, deleteReview, updateReview } = require('../controllers/reviewController');
const { reviewUpdateValidate, reviewValidate } = require('../middlewares/reviewValidateMiddleware');

// post review
router.post('/review/:userId',reviewValidate, createReview);

// get review
router.get('/review/:reviewId', getReview);

// edit review
router.put('/review/:reviewId/:userId', reviewUpdateValidate, updateReview);

// delete review
router.delete('/review/:reviewId', deleteReview);

// module exports
module.exports = router;