const Comment = require("../models/comment.js");
const Post = require("../models/post.js");

const createComment = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  const { comment } = req.body;

  try {
    // Create comment on a post
    const newComment = await Comment.create({
      user_id: userId,
      post_id: postId,
      comment,
    });

    // Add the new comment to post's comments array
    const post = await Post.findOneAndUpdate(
      { _id: postId },
      { $push: { comments: newComment._id } }
    );

    const createdComment = await Comment.findById({
      _id: newComment._id,
    }).populate("user_id");

    console.log(post);
    res.status(200).json({ createdComment });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const fetchPostComment = async (req, res) => {
  const postId = req.params.id;
  try {
    const comments = await Comment.find({ post_id: postId }).populate(
      "user_id"
    );

    res.json({ comments });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createComment, fetchPostComment };
