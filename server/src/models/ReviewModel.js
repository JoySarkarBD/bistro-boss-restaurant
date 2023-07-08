// External imports
const mongoose = require('mongoose');

// Define review schema
const reviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true,
    },
    recipeUserLikeMost: {
        type: String,
        trim: true,
        required: true
    },
    reviewSuggestion: {
        type: String,
        trim: true,
        required: true
    },
    reviewDetails: {
        type: String,
        trim: true,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true, versionKey: false });

const ReviewModel = mongoose.model('Review', reviewSchema);

// Module exports
module.exports = ReviewModel;
