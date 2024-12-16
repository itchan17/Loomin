// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
// const connectToDb = require("./config/connectToDb.js");

// Connect to db
// connectToDb();

// Create an express app
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

// Start server
app.listen(process.env.PORT);
