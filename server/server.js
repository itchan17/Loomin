// Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import dependencies
const express = require("express");
const connectToDb = require("./config/connectToDb.js");
const routes = require("./routes/routes.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Connect to db
connectToDb();

// Create an express app
const app = express();

//Configure express app
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

//Routes
app.use(routes);

// Start server
app.listen(process.env.PORT);
