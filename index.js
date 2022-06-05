require("dotenv").config();
const express = require("express");
const cookieSession = require("cookie-session");

const passport = require("passport");
const mongoose = require("mongoose");
const app = express();
// Tell express to be aware of cookies.. will create a session object in the req object. req.session will hold some data that is of use to passport.
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // in ms
    keys: [process.env.COOKIE_SESSION_ENCRYPTION_KEY],
  })
);

// Tell passport to be aware of sessions and let express know as well
app.use(passport.initialize());
app.use(passport.session());

// Mongodb connection
const mongodbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@campaign.ohptr.mongodb.net/campaign?retryWrites=true&w=majority`;
mongoose.connect(mongodbURI, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log("Connected to the db susccesfully");
  }
});

require("./models/user"); // Register user model in mongoose

// Auth setup
require("./services/passport").config(); // register Google OAuth
require("./routes/authRoutes").config(app); // Handle Google OAuth communications

app.get("/", (req, res) => {
  res.send({ bye: "there not near " + JSON.stringify(req.session) });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
