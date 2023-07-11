const { check, param, validationResult } = require('express-validator');

// booking validate
const bookingValidate = [
    check('date').notEmpty().trim().withMessage('Date is required'),
    check('time').notEmpty().trim().withMessage('Time is required'),
    check('guest').notEmpty().trim().withMessage('Guest count is required'),
    check('name').notEmpty().trim().withMessage('Name is required'),
    check('phone').notEmpty().trim().withMessage('Phone number is required'),
    check('email').notEmpty().trim().withMessage('Email is required'),
    param('user').isMongoId().withMessage('Invalid user ID'),
];

// update booking validate
const bookingUpdateValidate = [
    check('date').optional().isISO8601().toDate().withMessage('Invalid date format'),
    check('time').optional().isString().trim().notEmpty().withMessage('Time is required'),
    check('guest').optional().isInt({ min: 1 }).withMessage('Guest count must be a positive integer'),
    check('name').optional().isString().trim().notEmpty().withMessage('Name is required'),
    check('phone').optional().isString().trim().notEmpty().withMessage('Phone number is required'),
    check('email').optional().isEmail().withMessage('Invalid email address'),
];

// booking error result
const validBookingErrorResult = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => ({
            field: error.param,
            message: error.msg,
        }));
        return res.status(200).json({ status: 'failed', errors });
    }
    next();
};


module.exports = { bookingValidate, bookingUpdateValidate, validBookingErrorResult };
