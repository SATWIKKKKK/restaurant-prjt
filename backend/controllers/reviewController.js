const Review = require('../models/Review');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
exports.createReview = async (req, res, next) => {
  try {
    const { menuItem, order, rating, comment, title } = req.body;

    // Check if menu item exists
    const item = await MenuItem.findById(menuItem);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Menu item not found'
      });
    }

    // Check if user already reviewed this item
    const existingReview = await Review.findOne({
      user: req.user.id,
      menuItem
    });

    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: 'You have already reviewed this item'
      });
    }

    // Verify purchase if order is provided
    let isVerified = false;
    if (order) {
      const userOrder = await Order.findOne({
        _id: order,
        user: req.user.id,
        'items.menuItem': menuItem
      });
      isVerified = !!userOrder;
    }

    const review = await Review.create({
      user: req.user.id,
      menuItem,
      order,
      rating,
      comment,
      title,
      isVerifiedPurchase: isVerified
    });

    // Update menu item rating
    await updateMenuItemRating(menuItem);

    const populatedReview = await Review.findById(review._id)
      .populate('user', 'name avatar');

    res.status(201).json({
      success: true,
      data: populatedReview
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get reviews for a menu item
// @route   GET /api/reviews/menu/:menuItemId
// @access  Public
exports.getMenuItemReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({
      menuItem: req.params.menuItemId,
      status: 'approved'
    })
      .populate('user', 'name avatar')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's reviews
// @route   GET /api/reviews/myreviews
// @access  Private
exports.getMyReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .populate('menuItem', 'name image')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
exports.updateReview = async (req, res, next) => {
  try {
    let review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check ownership
    if (review.user.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this review'
      });
    }

    review = await Review.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    // Update menu item rating
    await updateMenuItemRating(review.menuItem);

    res.status(200).json({
      success: true,
      data: review
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({
        success: false,
        message: 'Review not found'
      });
    }

    // Check ownership or admin
    if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to delete this review'
      });
    }

    const menuItemId = review.menuItem;
    await review.deleteOne();

    // Update menu item rating
    await updateMenuItemRating(menuItemId);

    res.status(200).json({
      success: true,
      message: 'Review deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

// Helper function to update menu item average rating
const updateMenuItemRating = async (menuItemId) => {
  const reviews = await Review.find({ menuItem: menuItemId, status: 'approved' });

  if (reviews.length === 0) {
    await MenuItem.findByIdAndUpdate(menuItemId, {
      rating: 0,
      numReviews: 0
    });
  } else {
    const avgRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;
    
    await MenuItem.findByIdAndUpdate(menuItemId, {
      rating: Math.round(avgRating * 10) / 10,
      numReviews: reviews.length
    });
  }
};
