// Import depencies
const mongoose = require("mongoose");

// connect server to mongodb
const connectToDb = () => {
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((e) => {
      console.log(e);
    });
};

module.exports = connectToDb;
