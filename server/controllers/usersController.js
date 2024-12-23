const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  // Get data from the client
  const { first_name, last_name, email, password } = req.body;

  // Encrypt password
  const hashedPassword = bcrypt.hashSync(password);

  try {
    // Look for existing email in db
    const existingEmail = await User.findOne({ email });

    // If true send a response
    if (existingEmail) {
      return res.status(409).json({ message: "Email is already taken" });
    }

    // If false create the user
    await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    // Return error if email does not exist
    if (!user) {
      return res
        .status(401)
        .json({ error: "Invalid account credentials. Please try again." });
    }

    // Check the use entered password and compare it to the hashes password from the db
    const passwordMatch = await bcrypt.compare(password, user.password);

    // Return if not match
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ error: "Invalid account credentials. Please try again." });
    }
    // Create jwt
    const exp = Date.now() + 1000 * 60 * 60 * 24 * 30; // 30 days before expiration
    const token = jwt.sign({ userId: user._id, exp }, process.env.JWT_KEY);

    // Set the cookie
    res.cookie("access_token", token, {
      expires: new Date(exp),
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const checkAuth = (req, res) => {
  try {
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie("access_token");
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

module.exports = { signup, login, checkAuth, logout };
