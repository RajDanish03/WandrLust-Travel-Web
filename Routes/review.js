const express = require("express");
const router = express.Router({mergeParams:true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {IsLoggedIn,Isowner} = require("../midallware.js");
const ReviewsControlls = require("../controllers/reviews.js");

// REVIEWS  SECTION FOR NEWREVIEWS

router.post("/:id/reviews",IsLoggedIn,wrapAsync(ReviewsControlls.CreateNewReviews));

// DELETE RIVIEWS

router.delete("/:id/reviews/:reviewID", wrapAsync(ReviewsControlls.deleteReviews));

module.exports = router;