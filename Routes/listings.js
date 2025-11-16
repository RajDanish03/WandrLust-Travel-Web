const express = require("express");
const router = express.Router();
const listing = require("../Model/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { IsLoggedIn, Isowner } = require("../midallware.js");
const passport = require("passport");
const Listing = require("../Model/listing.js");
const ListingControlls = require("../controllers/listings.js");
const multer  = require('multer');
const {storage} = require("../CloudConfig.js");
const upload = multer({ storage});


//Index route or main allListing rout (1)

router.get("/", ListingControlls.index);

// NEW LISTING POST ROUT
router.post("/", IsLoggedIn, upload.single('image'), ListingControlls.CreateListings, );

// NEW ROUT ADD LISTING USING POST REQ NEW ROUT ROUT (3)

router.get("/new", IsLoggedIn, ListingControlls.RenderNewForm);
//EDIT ROUT FOR EDITING ROUT (4);

router.get("/:id/edit", IsLoggedIn, Isowner, ListingControlls.EditListings);

// show rout  for particular listings rout (2);

router.get("/:id/", ListingControlls.ShowListings);

// UPDATE ROUTE

router.put("/:id", IsLoggedIn, Isowner,upload.single('image'), ListingControlls.UpdateListings);

//  DELETE ROUT FOR DELETE LISITNG

router.delete("/:id", IsLoggedIn, Isowner, ListingControlls.DeleteListings);

module.exports = router;
