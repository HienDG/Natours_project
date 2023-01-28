/* eslint-disable no-console */
const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});

exports.getReview = catchAsync(async (req, res, next) => {
  const review = await Review.findById(req.params.id);

  if (!review)
    return next(new AppError("No review found with that Id", 404));

  res.status(200).json({
    status: "success",
    data: {
      review,
    },
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  console.log(req.body);
  const newReview = await Review.create(req.body);

  console.log(newReview);

  res.status(201).json({
    status: "success",
    data: {
      review: newReview,
    },
  });
});

exports.updateReview = catchAsync(async (req, res, next) => {
  const updateReview = await Review.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updateReview)
    return next(new AppError("No review found with that Id", 404));

  res.status(200).json({
    status: "success",
    data: {
      review: updateReview,
    },
  });
});

exports.deleteReview = catchAsync(async (req, res, next) => {
  const deleteReview = await Review.findByIdAndRemove(req.params.id);

  if (!deleteReview)
    return next(new AppError("No review found with that Id", 404));
  res.status(204).json({
    status: "success",
    data: null,
  });
});
