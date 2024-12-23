const Post = require("../models/post.js");

const createPost = async (req, res) => {
  const { content, images } = req.body;

  // Get the creator of the post
  const creator = req.user._id;

  try {
    // Create post
    const post = await Post.create({ creator, content, images });
    res.status(200).json({ post, success: "Post created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create post." });
  }
};

const editPost = async (req, res) => {
  const postId = req.params.id;
  const { content, images } = req.body;

  try {
    // Update post
    const post = await Post.findOneAndUpdate(
      { _id: postId, creator: req.user._id }, // Get post where id == selected id && creator == authorized user
      { content, images }
    );

    res.status(200).json({ post, success: "Post edited successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to edit post." });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  console.log(postId);
  try {
    await Post.findOneAndDelete({ _id: postId, creator: req.user._id });
    res.status(200).json({ success: "Post deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete post." });
  }
};

const fetchPost = async (req, res) => {
  try {
    // Fetch all the post
    const post = await Post.find();

    // Send post to the client
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch post." });
  }
};

module.exports = { createPost, editPost, deletePost, fetchPost };
