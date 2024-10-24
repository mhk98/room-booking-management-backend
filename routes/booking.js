const express = require('express')
const BookingController = require('../controllers/booking.controller');
const auth = require('../middlewares/auth');
const router = express.Router();

router.get('/', BookingController.getAllBooking);
router.get('/:id', BookingController.getSingleBooking);
router.post('/create/:userId/:roomId', BookingController.createBooking);
router.patch('/:id', auth('admin'), BookingController.updateBooking);
router.delete('/:id', auth('admin', 'user'), BookingController.deleteBooking);


module.exports = router