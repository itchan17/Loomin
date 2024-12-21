// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const connectToDb = require("./config/connectToDb.js");
const routes = require("./routes/routes.js");

// Connect to db
connectToDb();

// Create an express app
const app = express();

//Configure express app
app.use(express.json());

//Routes
app.use(routes);

// Start server
app.listen(process.env.PORT);
