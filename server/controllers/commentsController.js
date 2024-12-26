const Comment = require("../models/comment.js");
const Post = require("../models/post.js");

const createComment = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).json({ message: "Comment text is required" });
  }

  try {
    // Check if post exists before adding a comment
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Create comment on the post
    const newComment = await Comment.create({
      user_id: userId,
      post_id: postId,
      comment,
    });

    // Add the new comment to the post's comments array
    await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: newComment._id } }
    );

    const createdComment = await Comment.findById({
      _id: newComment._id,
    }).populate("user_id");

    res.status(200).json({ createdComment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

const fetchPostComment = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await Comment.find({ post_id: postId }).populate(
      "user_id"
    );

    res.status(200).json({ comments }); // Success response with comments
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An internal server error occurred" }); // Server error
  }
};

module.exports = { createComment, fetchPostComment };
