const express = require('express');
const router = express.Router();
const {
  createReservation,
  getReservations,
  getMyReservations,
  getReservation,
  updateReservationStatus,
  cancelReservation
} = require('../controllers/reservationController');
const { protect, authorize } = require('../middleware/auth');

router.route('/')
  .post(protect, createReservation)
  .get(protect, authorize('admin'), getReservations);

router.get('/myreservations', protect, getMyReservations);

router.route('/:id')
  .get(protect, getReservation);

router.put('/:id/status', protect, authorize('admin'), updateReservationStatus);
router.put('/:id/cancel', protect, cancelReservation);

module.exports = router;
