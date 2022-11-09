const router = require("express").Router();
const { isLoggedIn } = require("./../middlewares/middlewares");

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index", { currentUser: req.session.currentUser });
});

router.use("/auth", require("./auth-routes"));

router.get("/profile", (req, res) => {
  console.log("trying to go to profile");
  res.render("profile", { currentUser: req.session.currentUser });
});

router.get("/public", (req, res) => {
  res.render("main", { currentUser: req.session.currentUser });
});

router.get("/private", (req, res) => {
  res.render("private", { currentUser: req.session.currentUser });
});

module.exports = router;
