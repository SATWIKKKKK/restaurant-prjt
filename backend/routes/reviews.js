const express = require('express');
const router = express.Router();
const {
  createReview,
  getMenuItemReviews,
  getMyReviews,
  updateReview,
  deleteReview
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

router.post('/', protect, createReview);
router.get('/myreviews', protect, getMyReviews);
router.get('/menu/:menuItemId', getMenuItemReviews);

router.route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
