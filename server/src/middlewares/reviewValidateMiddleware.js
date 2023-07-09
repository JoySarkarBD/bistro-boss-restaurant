const { check, param } = require('express-validator');

// review validate
const reviewValidate = [
    check('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
    check('recipeUserLikeMost').notEmpty().withMessage('Recipe User Like Most is required'),
    check('reviewSuggestion').notEmpty().withMessage('Review Suggestion is required'),
    check('reviewRetails').notEmpty().withMessage('Review Retails is required'),
    param('user').isMongoId().withMessage('Invalid user ID'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(200).json({ errors: errors.array() });
        }
        next();
    }
];

// update review validate
const reviewUpdateValidate = [
    // Additional validations for update
    check('rating').optional().isInt({ min: 1, max: 5 }).withMessage('Rating must be an integer between 1 and 5'),
    check('recipeUserLikeMost').optional().notEmpty().withMessage('Recipe User Like Most is required'),
    check('reviewSuggestion').optional().notEmpty().withMessage('Review Suggestion is required'),
    check('reviewRetails').optional().notEmpty().withMessage('Review Retails is required')
];

module.exports = { reviewValidate, reviewUpdateValidate };
