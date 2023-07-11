const { createBookingForReservation, updateBookingDetails, cancelBookingForReservation, getAllBookingList, getMyBookingList } = require('../controllers/bookingController');
const { bookingValidate, validBookingErrorResult, bookingUpdateValidate } = require('../middlewares/bookingValidateMiddleware');

// External imports
const router = require('express').Router();





/* 

@TODO:  Admin can see all review.
@TODO:  Admin can delete any reserved or multiple reserved books at once.

*/







// booking set for reservation
router.post('/booking/:userId',/* user should login */, bookingValidate, validBookingErrorResult, createBookingForReservation);

// get users booking list
router.get('booking/:userId',/* user should login */, getMyBookingList);

// get all booking details
router.get('/bookings', /* only restaurant authority can update this */, getAllBookingList);

// edit reserved booking
router.put('/booking/:bookingId',/* only restaurant authority can update this */, bookingUpdateValidate, validBookingErrorResult, updateBookingDetails);

// cancel reserved booked
router.delete('/booking/:bookingId',/* only restaurant authority can delete */, cancelBookingForReservation);

module.exports = router;