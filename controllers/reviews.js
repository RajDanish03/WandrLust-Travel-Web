const Listing = require("../Model/listing.js");
const Reviews = require("../Model/review.js");

// CREATE NEW REVIEWS

module.exports.CreateNewReviews = (async (req , res) => {
    let listing = await Listing.findById(req.params.id);
    let newReview = new Reviews(req.body.review);
   
    if(!req.body.review){
      throw new ExpressError(400," SEND A VALID COMMENT  ")
    }
    listing.reviews.push(newReview);
    newReview.author=req.user._id;
    console.log(newReview);
    
    await newReview.save();
    await listing.save();
    req.flash("success","New Review Created !");
    res.redirect(`/listings/${listing._id}`);
});

// delete reviews

module.exports.deleteReviews = (async (req, res) => {
    let { id, reviewID } = req.params;

    // Step 1: Delete review ID reference from Listing
    await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewID } });

    // Step 2: Delete the review document itself
    await Reviews.findByIdAndDelete(reviewID);
    req.flash("success","Review Deleted !");

    // Step 3: Redirect back to the listing show page
    res.redirect(`/listings/${id}`);
})