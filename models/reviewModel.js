const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      trim: true,
      required: [true, "Review can not be empty"],
    },
    rating: {
      type: Number,
      min: 1, // [1, "A review rating must have above or equal than 1"],
      max: 5, // [5, "A review rating must have lower or equal than 5"],
    },
    createAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: "Tour",
      required: [true, "Review must belong to a tour"],
    },

    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Review must belong to a user"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// reviewSchema.pre(/^find/, function (next) {
//   this.select("-__v");
//   next();
// });

reviewSchema.pre(/^find/, function (next) {
  // this.populate({
  //   path: "tour",
  //   select: "name",
  // }).populate({
  //   path: "user",
  //   select: "name photo",
  // });

  this.populate({
    path: "user",
    select: "name photo",
  });

  next();
});

// reviewSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "user",
//     select: "-__v -passwordConfirm",
//   });
//   next();
// });

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
