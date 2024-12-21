const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    post_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  { timestamps: true }
);

// Middleware to update the updatedAt timestamp when the comment is modified
// commentSchema.pre("save", function (next) {
//   this.updatedAt = Date.now();
//   next();
// });

// Create the Comment model from the schema
const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
