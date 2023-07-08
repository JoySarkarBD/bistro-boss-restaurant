const ReviewModel = require('../models/ReviewModel');

// create review controller
const createReview = async (req, res) => {
    try {
        // Get the review data from the request body
        const { rating, recipeUserLikeMost, reviewSuggestion, reviewRetails } = req.body;

        // Create a new review instance
        const newReview = new ReviewModel({
            rating,
            recipeUserLikeMost,
            reviewSuggestion,
            reviewRetails,
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
            data: error?.message;
        });
    }
};

// get single review
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
            data: error?.message;
        });
    }
};

// update review
const updateReview = async (req, res) => {
    try {
        // Get the review data from the request body
        const { rating, recipeUserLikeMost, reviewSuggestion, reviewRetails } = req.body;

        // Find the review by ID and update its fields
        const updatedReview = await ReviewModel.findOneAndUpdate(
            { _id: req.params?.reviewId, user: req.params?.userId },
            { rating, recipeUserLikeMost, reviewSuggestion, reviewRetails },
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

// delete user review
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
            data: error?.message;
        });
    }
};

module.exports = { createReview, getReview, updateReview, deleteReview };
