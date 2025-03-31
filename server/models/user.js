const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    date_of_birth: {
      type: Date,
    },
    bio: {
      type: String,
    },
    profile_picture: {
      type: String,
      default: null,
    },
    background_picture: {
      type: String,
      default: null,
    },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    isVerified: {
      type: Boolean,
    },
    verificationToken: String,
    verificationTokenExpire: Date,
    work: {
      company: {
        type: String,
      },
      position: {
        type: String,
      },
    },
    hometown: {
      type: String,
    },
    school: {
      type: String,
    },
  },
  { timestamps: true }
);

// Create a token
userSchema.methods.getVerificationToken = function () {
  const token = crypto.randomBytes(20).toString("hex");

  this.verificationToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  this.verificationTokenExpire = Date.now() + 30 * 60 * 1000; // 30 minutes

  return token;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
