const Booking = require('../models/bookingModel');

// Create booking for reservation

// @desc    Creating booking request 
// @route   POST /api/v1/booking/:userId
// @access  Private
const createBookingForReservation = async (req, res) => {
    try {
        const { date, time, guest, name, phone, email, userWhoBooked } = req?.body;
        const userId = req.params?.userId;

        // Create a new booking
        const booking = new Booking({
            date,
            time,
            guest,
            name,
            phone,
            email,
            userWhoBooked: userId
        });

        // Save the booking to the database
        await booking.save();

        if (booking?.messageId) {
            res.status(200).json({
                status: 'success',
                data: booking
            })
        } else {
            res.status(200).json({
                status: 'failed',
                data: 'something is wrong',
            })
        }
    } catch (error) {
        res.status(200).json({
            status: 'failed',
            data: error?.message,
        })
    }
};

// Get user's booking list

// @desc    Get user's booking list
// @route   GET /api/v1/booking/:userId
// @access  Private
const getMyBookingList = async (req, res) => {
    try {
        const userId = req.params?.userId;

        // Find all bookings associated with the user
        const bookings = await Booking.find({ userWhoBooked: userId });

        res.status(200).json({
            status: 'success',
            data: bookings
        });
    } catch (error) {
        res.status(200).json({
            status: 'error',
            data: error?.message
        });
    }
};

// Get all booking details

// @desc    Get all bookings
// @route   GET /api/v1/bookings
// @access  Private
const getAllBookingList = async (req, res) => {
    try {
        // Retrieve all bookings from the database
        const bookings = await Booking.find();

        res.status(200).json({
            status: 'success',
            data: bookings
        });
    } catch (error) {
        res.status(200).json({
            status: 'failed',
            data: error?.message
        });
    }
};

// Update booking details

// @desc    Update booking details
// @route   PUT /api/v1/booking/:bookingId
// @access  Private
const updateBookingDetails = async (req, res) => {
    try {
        const { date, time, guest, name, phone, email } = req.body;
        const bookingId = req.params.bookingId;

        // Find the booking by ID and update its details
        const updatedBooking = await Booking.findOneAndUpdate(
            { _id: bookingId },
            { date, time, guest, name, phone, email },
            { new: true }
        );

        if (updatedBooking) {
            res.status(200).json({
                status: 'success',
                data: updatedBooking
            });
        } else {
            res.status(200).json({
                status: 'failed',
                data: 'Booking not found'
            });
        }
    } catch (error) {
        res.status(200).json({
            status: 'failed',
            data: error?.message
        });
    }
};

// Cancel booking for reservation

// @desc    Cancelling booking request
// @route   DELETE /api/v1/booking/:bookingId
// @access  Private
const cancelBookingForReservation = async (req, res) => {
    try {
        const bookingId = req.params?.bookingId;

        // Find the booking by its ID and delete it
        const deletedBooking = await Booking.findOneAndDelete({ _id: bookingId });

        if (deletedBooking) {
            res.status(200).json({
                status: 'success',
                data: deletedBooking,
            });
        } else {
            res.status(404).json({
                status: 'failed',
                data: 'Booking not found',
            });
        }
    } catch (error) {
        res.status(200).json({
            status: 'failed',
            data: error?.message,
        });
    }
};

// exports module
module.exports = {
    createBookingForReservation,
    getMyBookingList,
    updateBookingDetails,
    cancelBookingForReservation,
    getAllBookingList
};
