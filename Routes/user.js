const express = require("express");
const router = express.Router();
const flash = require("connect-flash");
const User = require("../Model/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { route } = require("./listings.js");
const passport = require("passport");
const { redirectUrl } = require("../midallware.js");
const UsersControlls = require("../controllers/users.js");

// SINGUP STARTED
router.get("/singup", UsersControlls.SingupPageRander);

// POST METHOD FOR DATASAVING IN DB
router.post("/singup", wrapAsync(UsersControlls.UserRegister));

// LOGIN START

router.get("/login", UsersControlls.LoginPage);

// post for authentication

router.post(
  "/login",
  redirectUrl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true,
  }),
  UsersControlls.login
);
// LOGOUT STARTED//

router.get("/logout", UsersControlls.LogOut);

module.exports = router;
