const router = require("express").Router();
const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const salt = 11; // i'm a rebel

/* GET home page */
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.render("auth/signup", { errorMessage: "Both fields are required!!" });
    }

    const foundUser = await User.findOne({ username });

    if (foundUser) {
      console.log("found a user");
      return res.render("auth/signup", { errorMessage: "Username already exists" });
    }

    const generatedSalt = await bcrypt.genSalt(salt);
    const hashedPassword = await bcrypt.hash(password, generatedSalt);

    const newUser = await User.create({ username, password: hashedPassword });
    console.log(`${newUser.length} user.s created`);
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
});

router.get("/login", (req, res) => {
  res.render("auth/login");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.render("auth/login", { errorMessage: "Both fields are required!!" });
    }

    const foundUser = await User.findOne({ username });

    if (!foundUser) {
      return res.render("auth/login", { errorMessage: "User does not exist!" });
    }

    if (!bcrypt.compareSync(password, foundUser.password)) {
      return res.render("auth/login", { errorMessage: "Wrong password!" });
    }

    req.session.currentUser = foundUser;

    res.redirect("/profile");
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", async (req, res) => {
  await req.session.destroy();
  res.redirect("/");
});

module.exports = router;
