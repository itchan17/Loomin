const User = require("../models/user.js");
const fs = require("fs");
const path = require("path");

const fetchLoggedInUser = async (req, res) => {
  const userId = req.user._id;

  try {
    // Return the logged in user
    const user = await User.findById({ _id: userId });

    // Return 10 following users to display with specified data
    const followingToDisplay = await User.findById(userId)
      .select("following")
      .populate({
        path: "following",
        select: "first_name last_name profile_picture username",
        options: { limit: 10 },
      });

    // Return 10 suggested users to display with specified data
    const followingIds = user.following;
    const suggestedUser = await User.find(
      {
        $and: [{ _id: { $nin: followingIds } }, { _id: { $ne: userId } }],
      },
      {
        first_name: 1,
        last_name: 1,
        username: 1,
        profile_picture: 1,
      }
    ).limit(10);
    res.status(200).json({
      user,
      followingToDisplay: followingToDisplay.following,
      suggestedUser,
    });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

const followUser = async (req, res) => {
  const userId = req.user._id;
  const followedUserId = req.params.id;
  try {
    const user = await User.findById({ _id: userId });
    const followedUser = await User.findById({ _id: followedUserId });

    // Check if the user is already in the following
    if (user.following.includes(followedUserId)) {
      // Remove from the followers list
      followedUser.followers = followedUser.followers.filter(
        (user) => user.toString() !== userId.toString()
      );

      await followedUser.save();

      // Remove to the following list
      user.following = user.following.filter(
        (user) => user.toString() !== followedUserId.toString()
      );
      const updated = await user.save();

      res.status(200).json({ updatedFollowing: updated.following });
    } else {
      // Add in the followers list
      followedUser.followers.push(userId);

      await followedUser.save();

      // Add in the following list
      user.following.push(followedUserId);
      const updated = await user.save();

      res.status(200).json({ updatedFollowing: updated.following });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

const fetchUser = async (req, res) => {
  const username = req.params.username;
  console.log(username);
  try {
    // Return the logged in user
    const user = await User.findOne({ username }).select(
      "-password -createdAt -updatedAt"
    );

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const searchUser = async (req, res) => {
  const keyword = req.query.keyword;

  try {
    const users = await User.find({
      $or: [
        { first_name: { $regex: keyword, $options: "i" } }, // case insensitive
        { last_name: { $regex: keyword, $options: "i" } },
        { username: { $regex: keyword, $options: "i" } },
      ],
    }).select("-password"); // Exclude password from results

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const editProfile = async (req, res) => {
  const userId = req.user._id;

  const { profileImage, coverImage } = req.files;
  console.log(profileImage);
  console.log(coverImage);
  console.log(req.body.removedImages);
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
    const user = await User.findById({ _id: userId });

    if (profileImage) {
      user.profile_picture = profileImage[0].path;
    }
    if (coverImage) {
      user.background_picture = coverImage[0].path;
    }

    user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

const fetchFollowing = async (req, res) => {
  const userId = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    // Fetch all the following of user
    const following = await User.find({ followers: { $in: [userId] } });
    // .skip(skip)
    // .limit(limit);

    res.status(200).json(following);
  } catch (error) {
    res.status(500).json(error);
  }
};

const fetchFollowers = async (req, res) => {
  const userId = req.user._id;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    // Fetch all the following of user
    const followers = await User.find({ following: { $in: [userId] } });
    // .skip(skip)
    // .limit(limit);

    res.status(200).json(followers);
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateUserInfo = async (req, res) => {
  const userId = req.user._id;
  console.log(req.body);
  const { hometown, education, work } = req.body;
  console.log(hometown);
  try {
    // Find the user by ID and update the fields
    const updatedUser = await User.findById(userId);

    // Check if the user was found
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    if (hometown) {
      updatedUser.hometown = hometown;
    }
    if (education) {
      updatedUser.education = education;
    }
    if (work) {
      updatedUser.work = work;
    }

    updatedUser.save();
    // Respond with the updated user object
    res.status(200).json({ updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const deleteUserInfo = async (req, res) => {
  const userId = req.user._id; // Assuming the user ID is stored in req.user._id (from authentication)
  const { field } = req.body; // The field to delete (e.g., "hometown", "education", or "work")

  try {
    // Find the user by ID
    const updatedUser = await User.findById(userId);

    // Check if the user exists
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // Delete the specified field (e.g., "hometown", "education", "work")
    if (updatedUser[field] !== undefined) {
      updatedUser[field] = null; // Set the field to null
      await updatedUser.save();
      res.status(200).json({ updatedUser });
    } else {
      res
        .status(400)
        .json({ message: `Field ${field} not found on user profile` });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  fetchLoggedInUser,
  followUser,
  fetchUser,
  searchUser,
  editProfile,
  fetchFollowing,
  fetchFollowers,
  updateUserInfo,
  deleteUserInfo,
};
