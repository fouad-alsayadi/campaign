const passport = require("passport");

exports.config = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/auth/logout", (req, res) => {
    req.logout();
    res.send(req.user); // should be empty
  });
};
