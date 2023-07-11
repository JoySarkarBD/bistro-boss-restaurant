const ReviewModel = require('../models/ReviewModel');

// Create review controller

// @desc    Post a review
// @route   Post /api/v1/review/:userId
// @access  Private
const createReview = async (req, res) => {
    try {
        // Get the review data from the request body
        const { rating, recipeUserLikeMost, reviewSuggestion, reviewDetails } = req.body;

        // Create a new review instance
        const newReview = new ReviewModel({
            rating,
            recipeUserLikeMost,
            reviewSuggestion,
            reviewDetails,
            user: req.params?.userId
        });

        // Save the new review to the database
        const savedReview = await newReview.save();

        // Return the saved review as the response
        res.status(200).json({
            status: 'success',
            data: savedReview
        });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(200).json({
            status: 'failed',
            data: error?.message
        });
    }
};

// Get single review

// @desc    Get user's single review
// @route   GET /api/v1/review/:reviewId
// @access  Private
const getReview = async (req, res) => {
    try {
        const reviewId = req.params?.reviewId;

        // Retrieve the review from the database by ID
        const review = await ReviewModel.findById(reviewId);

        if (!review) {
            return res.status(200).json({
                status: 'failed',
                data: 'Review not found'
            });
        }

        // Return the review as the response
        res.status(200).json({
            status: 'success',
            data: review
        });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(200).json({
            status: 'failed',
            data: error?.message
        });
    }
};

// Update review

// @desc    Update user's single review
// @route   PUT /api/v1/review/:reviewId/:userId
// @access  Private
const updateReview = async (req, res) => {
    try {
        // Get the review data from the request body
        const { rating, recipeUserLikeMost, reviewSuggestion, reviewDetails } = req.body;

        // Find the review by ID and update its fields
        const updatedReview = await ReviewModel.findOneAndUpdate(
            { _id: req.params?.reviewId, user: req.params?.userId },
            { rating, recipeUserLikeMost, reviewSuggestion, reviewDetails },
            { new: true }
        );

        if (!updatedReview) {
            return res.status(200).json({
                status: 'failed',
                data: 'Review not found'
            });
        }

        // Return the updated review as the response
        res.status(200).json({
            status: 'success',
            data: updatedReview
        });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(200).json({
            status: 'success',
            data: error?.message
        });
    }
};

// Delete user review

// @desc    Delete Single Review
// @route   Delete api/v1/review/:reviewId
// @access  Private
const deleteReview = async (req, res) => {
    try {
        // Get the review ID from the request parameters
        const reviewId = req.params.reviewId;

        // Find the review by ID and delete it
        const deletedReview = await ReviewModel.findByIdAndDelete(reviewId);

        if (!deletedReview) {
            // If the review was not found, return an error response
            return res.status(200).json({
                status: 'failed',
                message: 'Review not found'
            });
        }

        // Return a success response
        res.status(200).json({
            status: 'success',
            message: 'Review deleted successfully'
        });
    } catch (error) {
        // Handle any errors that occur during the process
        res.status(200).json({
            status: 'failed',
            data: error?.message
        });
    }
};

// module exports
module.exports = { createReview, getReview, updateReview, deleteReview };
