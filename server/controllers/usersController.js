const User = require("../models/user.js");

const fetchUser = async (req, res) => {
  const userId = req.user._id;

  try {
    const user = await User.findById({ _id: userId });
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

      res.status(200).json({ followingCount: updated.following.length });
    } else {
      user.following.push(followedUser);
      const updated = await user.save();
      console.log(updated.following.length);
      res.status(200).json({ followingCount: updated.following.length });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

module.exports = { fetchUser, followUser };
