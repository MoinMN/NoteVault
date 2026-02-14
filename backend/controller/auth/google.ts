import { AuthRequest } from "../../middleware/auth.middleware.js";
import User from "../../model/user.model.js";
import { Response } from "express";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import CryptoJS from "crypto-js";

const client = new OAuth2Client(process.env.GOOGLE_WEB_CLIENT_ID);

const GoogleAuth = async (req: AuthRequest, res: Response) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({
        success: false,
        msg: "ID token is required",
      });
    }

    // Verify Google ID token
    const ticket = await client.verifyIdToken({
      idToken,
      audience: process.env.GOOGLE_WEB_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email || !payload.email_verified) {
      return res.status(401).json({
        success: false,
        msg: "Invalid or unverified Google account",
      });
    }

    const email = payload.email;
    const name = payload.name || email.split("@")[0];
    const picture = payload.picture;

    // Check if user exists
    let user = await User.findOne({ email });

    // Block credentials users
    if (user && user.provider === "credentials") {
      return res.status(400).json({
        success: false,
        msg: "Account already exists with email & password login",
      });
    }

    // Create new Google user if not exists
    if (!user) {
      // Generate master key
      const masterKey = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);

      // Encrypt master key with server secret
      const encryptedMasterKey = CryptoJS.AES.encrypt(
        masterKey,
        process.env.SERVER_ENCRYPTION_KEY as string
      ).toString();

      user = await User.create({
        name,
        email,
        provider: "google",
        profileImage: picture || null,
        encryptedMasterKey,
      });
    }

    // Sign JWT
    const JWT_SECRET = process.env.JWT_SECRET as string;
    const JWT_EXPIRES = (process.env.JWT_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"];;

    const token = jwt.sign(
      {
        userId: user._id.toString(),
        email: user.email,
        name: user.name,
        role: user.role,
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    return res.status(200).json({
      success: true,
      msg: "Google login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error("Google Auth Error:", error);
    return res.status(500).json({
      success: false,
      msg: "Google authentication failed",
    });
  }
};

export default GoogleAuth;
