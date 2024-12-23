const jwt = require("jsonwebtoken");
const User = require("../models/user.js");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.access_token;

  // Check if there's a token
  if (!token) {
    return res.sendStatus(403);
  }

  try {
    // Decode token
    const data = jwt.verify(token, process.env.JWT_KEY);

    // // Check for expiration
    if (Date.now() > data.exp) return res.sendStatus(401);

    // Find user
    const user = await User.findById(data.userId);

    // Check if the user exists
    if (!user) return res.senStatus(401);

    // Attach user to request
    req.user = user;

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(403);
  }
};

module.exports = authMiddleware;
