const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const { sendVerificationEmail } = require("../utils/sendEmail");
const crypto = require("crypto");

// Verify if email exist and send password reset link
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    // Return error if email does not exist
    if (!user) {
      return res.status(401).json({ error: "Email does not exist." });
    }

    // Send verification email after signing up
    if (user) {
      // Generate verification token
      const verificationToken = user.getVerificationToken();
      await user.save();

      const verificationUrl = `${process.env.FRONTEND_URL}/reset-password/${verificationToken}`;
      const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: user.email,
        subject: "Please reset your password",
        html: `<h1>Reset your Loomin password</h1>
               <p>Please click the link below to reset your password:</p>
                <a href="${verificationUrl}" style="display: inline-block; margin-top: 16px; padding: 8px 16px; background-color: #3b82f6; color: #ffffff; font-weight: 700; text-decoration: none; border-radius: 4px; text-align: center;">
                Reset Password
               </a>
               <p>This link will expire in 24 hours.</p>`,
      };

      await sendVerificationEmail(mailOptions);

      res.status(200).json({
        message:
          "A password reset email has been sent. Please check your inbox for instructions to reset your password.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Error sending verification email. Please try again.",
    });
  }
};

// Verify token and change the password
const resetPassword = async (req, res) => {
  const { password } = req.body;

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
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    // Encrypt password
    const hashedPassword = bcrypt.hashSync(password);

    user.password = hashedPassword;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error changing password. Please try again.",
    });
  }
};

module.exports = {
  forgotPassword,
  resetPassword,
};
