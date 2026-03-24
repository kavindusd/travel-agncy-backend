const express= require('express');
const router = express.Router();
const {createBooking, getAllBooking, getBookingById, updateBookingStatus} = require('../Controllers/HotelController')



//  /api/hotels/book
router.post('/book',createBooking);

//  /api/hotels/all
router.get('/all', getAllBooking);

//  /api/hotels/:id
router.get('/:id', getBookingById);

router.patch('/status/:id',updateBookingStatus);

module.exports = router;    