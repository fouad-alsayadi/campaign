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
      proxy: true,
    },
    async (accessToken, refreshTokem, profile, done) => {
      console.log("Google auth verify callback starts");
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        console.log("User ", profile.id, "Exists");
        done(null, existingUser);
      } else {    // user first seen     
        const newUser = await new User({googleId: profile.id}).save();
        done(null, newUser);        
      }
    }
  );

  passport.use(campaignGoogleStrategy);
};
