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

module.exports = { fetchUser };
