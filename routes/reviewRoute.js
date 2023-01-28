const express = require("express");

const reviewController = require("../controllers/reviewController");
const authController = require("../controllers/authController");

const router = express.Router();

router
  .route("/")
  .get(reviewController.getAllReviews)
  .post(
    authController.protect,
    authController.restrictTo("user", "guide"),
    reviewController.createReview
  );

// router.route("/:id");

module.exports = router;
