const Post = require("../models/post.js");
const User = require("../models/user.js");
const Comment = require("../models/comment.js");
const fs = require("fs");
const path = require("path");

const createPost = async (req, res) => {
  // Post details
  const { content } = req.body;
  const images = req.files.map((file) => file.path);
  console.log(req.files);
  // Get the creator of the post
  const creator = req.user._id;

  try {
    // Create post
    const newPost = await Post.create({ creator, content, images });

    // Add the new comment to post's comments array
    const user = await User.findOneAndUpdate(
      { _id: creator },
      { $push: { posts: newPost._id } }
    );
    const post = await Post.findById({ _id: newPost._id }).populate({
      path: "creator",
      select: "first_name last_name profile_picture username",
    });

    res.status(200).json({ post, success: "Post created successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create post." });
  }
};

const editPost = async (req, res) => {
  const postId = req.params.id;
  const { content } = req.body;
  const newImages = req.files.map((file) => file.path);

  // Delete the removed images
  if (req.body.removedImages) {
    const removedImages = Array.isArray(req.body.removedImages)
      ? req.body.removedImages
      : [req.body.removedImages];
    console.log(removedImages);
    removedImages.forEach((imagePath) => {
      const fullPath = path.resolve(imagePath);

      try {
        if (fs.existsSync(fullPath)) {
          fs.unlinkSync(fullPath);
          console.log(`Deleted: ${fullPath}`);
        } else {
          console.log(`File not found: ${fullPath}`);
        }
      } catch (error) {
        console.error(`Error deleting ${fullPath}:`, error);
      }
    });
  }

  try {
    // Update post
    const newPost = await Post.findOne(
      { _id: postId, creator: req.user._id } // Get post where id == selected id && creator == authorized user
    ).populate("creator");

    // Update the post
    newPost.content = content;

    if (req.body.removedImages) {
      newPost.images = [
        ...newPost.images.filter(
          (image) => !req.body.removedImages.includes(image)
        ),
        ...newImages,
      ];
    } else if (newImages) {
      newPost.images = [...newPost.images, ...newImages];
    }

    newPost.save();

    res.status(200).json({ newPost, success: "Post edited successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to edit post." });
  }
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    const deletedPost = await Post.findOneAndDelete({
      _id: postId,
      creator: req.user._id,
    });

    // Delete images of the post
    if (deletedPost && deletedPost.images.length > 0) {
      deletedPost.images.forEach((imagePath) => {
        const fullPath = path.resolve(imagePath);

        try {
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
            console.log(`Deleted: ${fullPath}`);
          } else {
            console.log(`File not found: ${fullPath}`);
          }
        } catch (error) {
          console.error(`Error deleting ${fullPath}:`, error);
        }
      });
    }

    // Delete comments associated with the post
    await Comment.deleteMany({ post_id: postId });

    // Remove the post id the user's posts array
    if (deletedPost) {
      await User.findByIdAndUpdate(
        { _id: req.user._id },
        { $pull: { posts: postId } }, // Remove the postId from the posts array
        { new: true }
      );
    }

    res
      .status(200)
      .json({ deletedPost, success: "Post deleted successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to delete post." });
  }
};

const fetchPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    // Fetch all the post
    const posts = await Post.find({ isArchived: false })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "creator",
        select: "first_name last_name profile_picture username",
      });

    const totalPosts = await Post.countDocuments({ isArchived: false });

    const hasMore = totalPosts > skip + posts.length;

    // Send post to the client
    res.json({
      posts,
      hasMore,
      currentPage: page,
      totalPosts,
    });
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

const archivePost = async (req, res) => {
  try {
    // Get the selected post
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Toggle archive status
    post.isArchived = !post.isArchived;
    post.archivedAt = post.isArchived ? new Date() : null;

    await post.save();

    res.json({ post });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const fetchProfilePosts = async (req, res) => {
  const userId = req.params.id;
  console.log("User: " + userId);
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    // Fetch all the post
    const posts = await Post.find({ isArchived: false, creator: userId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate({
        path: "creator",
        select: "first_name last_name profile_picture username",
      });

    const totalPosts = await Post.countDocuments({
      isArchived: false,
      creator: userId,
    });

    const hasMore = totalPosts > skip + posts.length;

    // Send post to the client
    res.json({
      posts,
      hasMore,
      currentPage: page,
      totalPosts,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch post." });
  }
};

module.exports = {
  createPost,
  editPost,
  deletePost,
  fetchPosts,
  likeUnlikePost,
  archivePost,
  fetchProfilePosts,
};
