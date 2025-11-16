const User = require("../Model/user.js");

// SINGUP PAGE RANDER
module.exports.SingupPageRander = (req, res) => {
  res.render("users/singup.ejs");
};

// POST METHOD FOR USER REGISTER
module.exports.UserRegister = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    let registerdUser = await User.register(newUser, password);
    req.login(registerdUser, (err) => {
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome TO Wandarlust");
      res.redirect("/listings");
    });
  } catch (error) {
    req.flash("error", error.message);
    res.redirect("/singup");
  }
};

//LOGIN PAGE RENDER HERE
module.exports.LoginPage = (req, res) => {
  res.render("users/login.ejs");
};

// LOGIN SUCCEFULL
module.exports.login = async (req, res) => {
  req.flash(
    "success",
    "WellCome  Back In Wandarlust You Logged In Successfully ! "
  );
  let saveredirecturl = res.locals.redirectUrl || "/listings";
  res.redirect(saveredirecturl);
};

// LOGOUT SUCCESSFULL
module.exports.LogOut = (req, res, next) => {
  req.logOut((err) => {
    if (err) {
      next(err);
    }
    req.flash("success", "You Are Logged Out! ");
    res.redirect("/listings");
  });
};
