// controllers/reviewController.js
const Review = require('../models/reviewModel');
const mongoose = require('mongoose');

// get all reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a single review
const getReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'No such review' });
  }

  const review = await Review.findById(id);

  if (!review) {
    return res.status(404).json({ error: 'No such review' });
  }

  res.status(200).json(review);
};

// create a new review
const createReview = async (req, res) => {
  const { name, comment, rating } = req.body;

  // add to the database
  try {
    const review = await Review.create({ name, comment, rating });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such review' });
  }

  const review = await Review.findOneAndDelete({ _id: id });

  if (!review) {
    return res.status(400).json({ error: 'No such review' });
  }

  res.status(200).json(review);
};

// update a review using PATCH
const patchReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such review' });
  }

  const review = await Review.findOneAndUpdate(
    { _id: id },
    { ...req.body },
    { new: true }
  );

  if (!review) {
    return res.status(400).json({ error: 'No such review' });
  }

  res.status(200).json(review);
};

// update a review using PUT
const putReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such review' });
  }

  const review = await Review.findOneAndUpdate(
    { _id: id },
    req.body,
    { new: true, overwrite: true }
  );

  if (!review) {
    return res.status(400).json({ error: 'No such review' });
  }

  res.status(200).json(review);
};

module.exports = {
  getReviews,
  getReview,
  createReview,
  deleteReview,
  patchReview,
  putReview,
};
