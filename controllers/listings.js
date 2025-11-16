const listing = require("../Model/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");

// INDEX CONTROLL

module.exports.index = wrapAsync(async (req, res) => {
  let allListings = await listing.find({});
  res.render("Listings/index.ejs", { allListings });
});

// NEw FORM RENDER
module.exports.RenderNewForm = (req, res) => {
  res.render("Listings/new.ejs");
};

module.exports.ShowListings = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let Listing = await listing
    .findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!Listing) {
    req.flash("error", "Listing You Try To Find Is Not Exists");
    return res.redirect("/listings");
  }
  console.log(Listing);

  res.render("Listings/show.ejs", { Listing });
});

// EDIT LISTINGS

module.exports.EditListings = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let all_listing = await listing.findById(id);
  res.render("listings/edit.ejs", { all_listing });
});

// CREATE NEW LISTINGS

module.exports.CreateListings = wrapAsync(async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;

  let { title, description, price, location, country } = req.body;

  if (!req.body) throw new ExpressError(400, "SEND VALID DATA FOR LISTING");
  if (!title) throw new ExpressError(400, "LISTING TITLE IS MISSING ");
  if (!price) throw new ExpressError(400, "SEND VALID PRICE ");
  if (!description) throw new ExpressError(400, "OOPS DESCRIPTION IS MISSING ");
  if (!location) throw new ExpressError(400, "LISTING LOCATION IS MISSING ");
  if (!country) throw new ExpressError(400, "LISTING COUNTRY IS MISSING ");

  let newListing = new listing({
    title,
    description,
    price,
    location,
    country,
    image: {
      url: url,
      Filename: filename,
    },
    owner: req.user._id,
  });

  await newListing.save();
  req.flash("success", "Listing Created Successfully!");
  res.redirect(`/listings/${newListing._id}`);
});

// UPDATE LISTINGS ROUT

module.exports.UpdateListings = wrapAsync(async (req, res) => {
  let { id } = req.params;
  let { title, description, price, location, country } = req.body;

  // Step 1: Find the listing first
  let listingToUpdate = await listing.findById(id);

  // Step 2: Update simple fields
  listingToUpdate.title = title;
  listingToUpdate.description = description;
  listingToUpdate.price = price;
  listingToUpdate.location = location;
  listingToUpdate.country = country;

  // Step 3: If image is uploaded, update image field
  if (typeof req.file !== "undefined") {
    listingToUpdate.image = {
      url: req.file.path,
      filename: req.file.filename,
    };
  }

  // Step 4: Save updated document
  await listingToUpdate.save();

  req.flash("success", "Listing Updated!");
  res.redirect("/listings");
});

//  DELETE ROUT FOR DELETE LISITNG

module.exports.DeleteListings = wrapAsync(async (req, res) => {
  let { id } = req.params;
  await listing.findByIdAndDelete(id);
  req.flash("success", " Listings Deleted !");
  res.redirect("/listings");
});
