const User = require("../models/user.js");

const fetchUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById({ _id: userId }).populate({
      path: 'followers',
      select: 'first_name last_name profile_picture username',
      options: { limit: 10 }
    }).populate({
      path: 'following',
      select: 'first_name last_name profile_picture username',
      options: { limit: 10 }
    });
    res.status(200).json(user);
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
      // Return list of user's following aliong with their data
      const followingList = await updated.populate({
        path: 'following',
        select: 'first_name last_name profile_picture username',
      });
      res.status(200).json({ following: followingList.following });
    } else {
      user.following.push(followedUser);
      const updated = await user.save();
      // Return list of user's following aliong with their data
      const followingList = await updated.populate({
        path: 'following',
        select: 'first_name last_name profile_picture username',
      });
      res.status(200).json({ following: followingList.following });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

module.exports = { fetchUser, followUser };
