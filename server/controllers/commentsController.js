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

const fetchPostComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await Comment.find({ post_id: postId })
      .skip(skip)
      .limit(limit)
      .populate("user_id");

    const totalComments = await Comment.countDocuments({ post_id: postId });
    const hasMore = totalComments > skip + comments.length;

    // Send post to the client
    res.json({
      comments,
      hasMore,
      currentPage: page,
      totalComments,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An internal server error occurred" }); // Server error
  }
};

const editComment = async (req, res) => {
  const { postId, commentId } = req.params;
  const updatedComment = req.body.comment;

  try {
    const comment = await Comment.findOneAndUpdate(
      { _id: commentId, user_id: req.user._id }, // Get comment
      { comment: updatedComment },
      { new: true }
    ).populate("user_id");

    res.status(200).json({ comment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An internal server error occurred" }); // Server error
  }
};

const deleteComment = async (req, res) => {
  const { postId, commentId } = req.params;

  try {
    // Delete comment from the comments collection
    const deletedComment = await Comment.findOneAndDelete({
      _id: commentId,
      user_id: req.user._id,
    });

    // Remove the post id the user's posts array
    if (deletedComment) {
      await Post.findByIdAndUpdate(
        { _id: postId }, // User ID from authenticated user
        { $pull: { comments: commentId } }, // Remove the postId from the posts array
        { new: true }
      );
    }

    res
      .status(200)
      .json({ deletedComment, success: "Comment deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An internal server error occurred" }); // Server error
  }
};

module.exports = {
  createComment,
  fetchPostComments,
  editComment,
  deleteComment,
};
