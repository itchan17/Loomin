const multer = require("multer");
const path = require("path");

// Configure storage options
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/images/posts/"); // Set the destination directory
  },
  filename: function (req, file, cb) {
    // Use the original file name
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// Create the upload middleware
const upload = multer({ storage: storage });

module.exports = upload;
