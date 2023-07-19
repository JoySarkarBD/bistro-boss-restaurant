// External imports
const router = require('express').Router();

// Internal imports
const { createReview, getReview, deleteReview, updateReview } = require('../controllers/reviewController');
const { reviewUpdateValidate, reviewValidate, validReviewErrorResult } = require('../middlewares/reviewValidateMiddleware');




/* 

@TODO:  Admin can see all review.
@TODO:  Admin can delete any review or multiple review at once.

*/





// post review
router.post('/review/:userId'/* user should login */, reviewValidate, validReviewErrorResult, createReview);

// get review
router.get('/review/:reviewId'/* user should login */ , getReview);

// edit review
router.put('/review/:reviewId/:userId'/* user should login */, reviewUpdateValidate, validReviewErrorResult, updateReview);

// delete review
router.delete('/review/:reviewId'/* user should login */, deleteReview);
// module exports
module.exports = router;