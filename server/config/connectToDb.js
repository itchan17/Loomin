//Load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

// Import depencies
const mongoose = require("mongoose");

// connect server to mongodb
const connectToDb = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected to DB");
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = connectToDb;
