// routes/reviewRoutes.js
const express = require('express');
const {
  getReviews,
  getReview,
  createReview,
  deleteReview,
  patchReview,
  putReview,
} = require('../controllers/reviewController');

const router = express.Router();

// GET all reviews
router.get('/', getReviews);

// GET a single review
router.get('/:id', getReview);

// POST a new review
router.post('/', createReview);

// DELETE a review
router.delete('/:id', deleteReview);

// Update a review using PATCH
router.patch('/:id', patchReview);

// Update a review using PUT
router.put('/:id', putReview);

module.exports = router;
