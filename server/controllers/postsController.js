const Post = require("../models/post.js");
const User = require("../models/user.js");

const createPost = async (req, res) => {
  const { content, images } = req.body;

  // Get the creator of the post
  const creator = req.user._id;
  console.log(req.body);
  try {
    // Create post
    const newPost = await Post.create({ creator, content, images });

    // Add the new comment to post's comments array
    const user = await User.findOneAndUpdate(
      { _id: creator },
      { $push: { posts: newPost._id } }
    );
    const post = await Post.findById({ _id: newPost._id }).populate("creator");

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
    const post = await Post.find().populate("creator").sort({ createdAt: -1 });

    // Send post to the client
    res.status(200).json({ post });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch post." });
  }
};

const likeUnlikePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.user._id;
  try {
    const post = await Post.findById({ _id: postId });

    if (post.likes.includes(userId)) {
      post.likes = post.likes.filter(
        (user) => user.toString() !== userId.toString()
      );
      await post.save();
      res.sendStatus(200);
    } else {
      post.likes.push(userId);
      await post.save();
      res.sendStatus(200);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  fetchPost,
  likeUnlikePost,
};
