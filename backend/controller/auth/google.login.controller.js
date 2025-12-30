import jwt from "jsonwebtoken";
import User from "../../model/user.model.js";
import googleClient from "../../utils/googleClient.js";

const GoogleLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        msg: "Google token missing",
      });
    }

    // ✅ Verify token with Google
    const ticket = await googleClient.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_WEB_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { sub: googleId, email, name, email_verified } = payload;

    if (!email_verified) {
      return res.status(401).json({
        success: false,
        msg: "Google email not verified",
      });
    }

    // 🔍 Find user
    let user = await User.findOne({ email });

    // 🆕 Create user if not exists
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        authProvider: "google",
      });
    }

    // 🔐 Create JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN || "7d" }
    );

    return res.status(200).json({
      success: true,
      msg: "Google login successful",
      token,
    });
  } catch (error) {
    console.error("Google login error:", error);
    return res.status(500).json({
      success: false,
      msg: "Google authentication failed",
    });
  }
};

export default GoogleLogin;
