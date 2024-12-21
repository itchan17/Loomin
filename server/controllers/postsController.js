const Post = require("../models/post.js");

const createPost = async (req, res) => {
  const { content, images } = req.body;

  // Get the creator of the post
  const creator = req.user._id;

  try {
    // Create post
    await Post.create({ creator, content, images });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const editPost = async (req, res) => {
  const postId = req.params.id;
  const { content, images } = req.body;

  try {
    // Update post
    await Post.findOneAndUpdate(
      { _id: postId, creator: req.user._id }, // Get post where id == selected id && creator == authorized user
      { content, images }
    );

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  console.log(postId);
  try {
    await Post.findOneAndDelete({ _id: postId, creator: req.user._id });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

const fetchPost = async (req, res) => {
  try {
    // Fetch all the post
    const post = await Post.find();

    // Send post to the client
    res.json({ post });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

module.exports = { createPost, editPost, deletePost, fetchPost };
