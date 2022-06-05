require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const app = express();

// Mongodb connection
const mongodbURI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@campaign.ohptr.mongodb.net/campaign?retryWrites=true&w=majority`;
mongoose.connect(mongodbURI,(err)=>{
    if(err){
        console.error(err);
    }else{
        console.log("Connected to the db susccesfully");
    }
});

require('./models/user'); // Register user model in mongoose

// Auth setup
require("./services/passport").config(); // register Google OAuth 
require("./routes/authRoutes").config(app); // Handle Google OAuth communications


app.get("/", (req, res) => {
  res.send({ bye: "there not near" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});

