const Listing = require("./Model/listing.js");
module.exports.IsLoggedIn = (req,res,next)=>{
   if(!req.isAuthenticated()){
   req.session.redirectUrl = req.originalUrl;
   req.flash("error","You Must Logged In To Creat Linsting");
   return res.redirect("/login");
  
  }
   next()
}

module.exports.redirectUrl = (req,res,next)=>{
if(req.session.redirectUrl){
   res.locals.redirectUrl = req.session.redirectUrl
}
next()
}

module.exports.Isowner = async (req,res,next)=>{
   let { id } = req.params;
       // ✅ Step 1: Fetch the listing from the DB with owner info
       let foundListing = await Listing.findById(id).populate("owner");
   
       // ✅ Step 2: Check if current user is the owner
       if (
         !res.locals.currUser || 
         !foundListing.owner || 
         foundListing.owner._id.toString() !== res.locals.currUser._id.toString()
       ) {
         req.flash("error", "You don't have permission to Edit Or Delete this listing.");
         return res.redirect("/listings");
       }
       next()
}