const User = require("../models/user.js");
const bcrypt = require("bcryptjs");

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

module.exports = { signup };
