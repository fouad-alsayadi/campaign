const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

exports.config = ()=>{
    const campaignGoogleStrategy = new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
          clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
          callbackURL: "/auth/google/callback",
        },
        (accessToken, refreshTokem, profile, done) => {
          console.log("access token", accessToken);
          console.log("refresh token", refreshTokem);
          console.log("profile", profile);
        }
      );
      
      passport.use(campaignGoogleStrategy);
}

