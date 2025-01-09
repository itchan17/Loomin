const User = require("../models/user.js");

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
  const followedUser = req.params.id;
  try {
    const user = await User.findById({ _id: userId });

    if (user.following.includes(followedUser)) {
      user.following = user.following.filter(
        (user) => user.toString() !== followedUser.toString()
      );
      const updated = await user.save();

      res.status(200).json({ updatedFollowing: updated.following });
    } else {
      user.following.push(followedUser);
      const updated = await user.save();

      res.status(200).json({ updatedFollowing: updated.following });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

const fetchUser = async (req, res) => {
  const userId = req.params.id;

  try {
    // Return the logged in user
    const user = await User.findById({ _id: userId }).select(
      "first_name last_name profile_picture username"
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

module.exports = { fetchLoggedInUser, followUser, fetchUser, searchUser };
