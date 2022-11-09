function exposeUserToView(req, res, next) {
  if (req.session.currentUser) {
    res.locals.currentUser = req.session.currentUser;
    res.locals.isLoggedIn = true;
  }
  next();
}

function isLoggedIn(req, res, next) {
  if (req.session.currentUser) {
    return next();
  }
  res.redirect("/auth/signup");
}

module.exports = {
  isLoggedIn,
  exposeUserToView,
};
