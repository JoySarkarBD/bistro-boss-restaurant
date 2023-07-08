// External imports
const router = require('express').Router();

// Internal imports
const { createReview, getReview, deleteReview, updateReview } = require('../controllers/reviewController');
const { reviewValidate, reviewUpdateValidate, validReviewErrorResult } = require('../middlewares/reviewValidateMiddleware');

// post review
router.post('/review/:userId', reviewValidate, validReviewErrorResult createReview);

// get review
router.get('/review/:reviewId', getReview);

// edit review
router.put('/review/:reviewId/:userId', reviewUpdateValidate, validReviewErrorResult, updateReview);

// delete review
router.delete('/review/:reviewId', deleteReview);

// module exports
module.exports = router;