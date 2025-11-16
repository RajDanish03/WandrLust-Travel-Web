//PROJECT REQUIRED PAKAGES
require('dotenv').config();
console.log(process.env.secret)
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const path = require("path");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = 8080;
const ExpressError = require("./utils/ExpressError.js");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./Model/user.js");


// Import the listings router
const listingsRouter = require("./Routes/listings");
const ReviewsRouter = require("./Routes/review.js");
const UserRouter = require("./Routes/user.js");


// MILDALWARE AND PATH SET HERE

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));

let  sessionOPtion = {
  secret:"mysecretcode",
  resave:false,
  saveUninitialized:true,
  cookie:{
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly:true,
  },
}

// FLASH MIDALLWARE

app.use(session(sessionOPtion));
app.use(flash());

// AUTHENTICATION AND AUTHORIATION

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser=req.user;
  next();
});


// Use the router
app.use("/listings", listingsRouter);
app.use("/listings", ReviewsRouter);
app.use("/", UserRouter);


// DATABASE CONNECTING HERE

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wandarLust");
}
main()
  .then((result) => {
    console.log("connection succsesfull");
  })
  .catch((err) => {
    console.log("some error in db");
  });


// cacth All Rout

app.use((req, res, next) => {
  next(new ExpressError(404, "page not found"));
});

// ERROR handling midalware

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Somthing went wrong" } = err;
  res.render("Listings/error.ejs", { message, statusCode });
});

//listing port
app.listen(port, () => {
  console.log("server is started");
});
