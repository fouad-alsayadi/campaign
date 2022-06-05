const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = mongoose.model("users");

// User cookies set up
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

exports.config = () => {
  const campaignGoogleStrategy = new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      proxy: true
    },
    (accessToken, refreshTokem, profile, done) => {
      console.log("access token", accessToken);
      console.log("refresh token", refreshTokem);
      // console.log("profile", profile);
      User.findOne({ googleId: profile.id }).then((existingUser) => {
        if (existingUser) {
          console.log("User ", profile.id, "Exists");
          done(null, existingUser);
        } else {
          const user = new User({
            googleId: profile.id,
          });
          user.save().then((user) => done(null, user));
        }
      });
    }
  );

  passport.use(campaignGoogleStrategy);
};
