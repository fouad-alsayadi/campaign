require("dotenv").config();
const express = require("express");
const app = express();

require("./services/passport").config();
require("./routes/authRoutes").config(app);


app.get("/", (req, res) => {
  res.send({ bye: "there not near" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});