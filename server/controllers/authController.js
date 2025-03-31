const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendVerificationEmail } = require("../utils/sendEmail");
const crypto = require("crypto");

const signup = async (req, res) => {
  // Get data from the client
  const {
    firstName: first_name,
    lastName: last_name,
    username,
    email,
    password,
  } = req.body;

  // Encrypt password
  const hashedPassword = bcrypt.hashSync(password);

  try {
    // Look for existing email in db
    const existingEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    // If email already exists send a response
    if (existingEmail) {
      return res.status(409).json({ email: "Email is already taken." });
    }

    // If username already exists send a response
    if (existingUsername) {
      return res.status(409).json({ username: "Username is already taken." });
    }
    console.log(first_name, last_name, username, email, password);

    // If false create the user
    const user = await User.create({
      first_name,
      last_name,
      username,
      email,
      password: hashedPassword,
      isVerified: false,
    });

    // Send verification email after signing up
    if (user) {
      // Generate verification token
      const verificationToken = user.getVerificationToken();
      await user.save();

      const verificationUrl = `${process.env.FRONTEND_URL}/users/${user._id}/verify/${verificationToken}`;

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: "Verify Your Email",
        html: `<h1>Email Verification</h1>
               <p>Please click the link below to verify your email address:</p>
               <a href="${verificationUrl}" style="display: inline-block; margin-top: 16px; padding: 8px 16px; background-color: #3b82f6; color: #ffffff; font-weight: 700; text-decoration: none; border-radius: 4px; text-align: center;">
               Verify Email
               </a>
               <p>This link will expire in 24 hours.</p>`,
      };

      await sendVerificationEmail(mailOptions);

      res.status(201).json({
        message: "User created. Please check your email for verification.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

const verifyEmail = async (req, res) => {
  // Hash the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  try {
    // Find the user with the token
    const user = await User.findOne({
      verificationToken: hashedToken,
      verificationTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired token" });
    }

    // Verify the email in database
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;

    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
      email: user.email,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error verifying email. Please try again.",
    });
  }
};

// Resend verification email endpoint
const resendVerification = async (req, res) => {
  console.log(req.params.id);
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({
        message: "No account found with this email address.",
      });
    }

    if (user.isVerified) {
      return res.status(400).json({
        message: "This email is already verified.",
      });
    }

    // Generate new verification token
    const verificationToken = user.getVerificationToken();
    await user.save();

    const verificationUrl = `${process.env.FRONTEND_URL}/users/${user._id}/verify/${verificationToken}`;

    const mailOptions = {
      from: process.env.EMAIL_USERNAME,
      to: user.email,
      subject: "Verify Your Email",
      html: `<h1>Email Verification</h1>
             <p>Please click the link below to verify your email address:</p>
             <a href="${verificationUrl}" style="display: inline-block; margin-top: 16px; padding: 8px 16px; background-color: #3b82f6; color: #ffffff; font-weight: 700; text-decoration: none; border-radius: 4px; text-align: center;">
             Verify Email
             </a>
             <p>This link will expire in 24 hours.</p>`,
    };

    await sendVerificationEmail(mailOptions);

    return res.status(200).json({
      message: "Verification email resent. Please check your inbox.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error sending verification email. Please try again.",
    });
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

    // Resend vericiation email if user is not verified
    if (!user.isVerified) {
      const verificationToken = user.getVerificationToken();
      await user.save();

      const verificationUrl = `${process.env.FRONTEND_URL}/users/${user._id}/verify/${verificationToken}`;

      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: "Verify Your Email",
        html: `<h1>Email Verification</h1>
               <p>Please click the link below to verify your email address:</p>
               <a href="${verificationUrl}" style="display: inline-block; margin-top: 16px; padding: 8px 16px; background-color: #3b82f6; color: #ffffff; font-weight: 700; text-decoration: none; border-radius: 4px; text-align: center;">
                Verify Email
               </a>
               <p>This link will expire in 24 hours.</p>`,
      };

      await sendVerificationEmail(mailOptions);

      return res.status(400).json({
        notVerified:
          "We've sent you email verification. Please verify your email first.",
      });
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

module.exports = {
  signup,
  login,
  checkAuth,
  logout,
  verifyEmail,
  resendVerification,
};
