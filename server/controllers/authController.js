const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  // Get data from the client
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    bio,
    date_of_birth,
    profile_picture,
  } = req.body;

  // Encrypt password
  const hashedPassword = bcrypt.hashSync(password);

  try {
    // Look for existing email in db
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    // If email already exists send a response
    if (existingEmail) {
      return res.status(409).json({ message: "Email is already taken" });
    }

    // If username already exists send a response
    if (existingUsername) {
      return res.status(409).json({ message: "Username is already taken" });
    }

    // If false create the user
    await User.create({
      first_name,
      last_name,
      username,
      email,
      bio,
      date_of_birth,
      profile_picture,
      password: hashedPassword,
    });

    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const login = async (req, res) => {
  const { email, password, rememberMe } = req.body;
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
    const exp =
      Date.now() +
      (rememberMe ? 1000 * 60 * 60 * 24 * 30 : 1000 * 60 * 60 * 24); //Set the session to 30 days or 1 day

    const token = jwt.sign({ userId: user._id, exp }, process.env.JWT_KEY);

    const cookieOptions = {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    };

    // Set cookie epiration to true
    if (rememberMe) {
      cookieOptions.expires = new Date(exp); // 30 days
    }

    // Set the cookie
    res.cookie("access_token", token, cookieOptions);
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
