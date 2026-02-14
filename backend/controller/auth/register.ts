import { AuthRequest } from "../../middleware/auth.middleware.js";
import User from "../../model/user.model.js";
import { Response } from "express";
import bcrypt from "bcrypt";
import OTP from "../../model/otp.model.js";
import sendWelcomeEmail from "../../utils/sendWelcomeMail.js";
import CryptoJS from "crypto-js";

const UserRegister = async (req: AuthRequest, res: Response) => {
  try {
    const { email, name, password, confirmPassword, otp } = req.body;

    if (!email || !name || !password || !confirmPassword) {
      return res.status(400).json({ msg: "All fields are required", success: false });
    }

    if (!otp) {
      return res.status(401).json({ msg: "OTP not received!", success: false });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ success: false, msg: "Password & Confirm Password doesn't match!" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(401).json({ success: false, msg: "Email already registered" });
    }

    const savedOtp = await OTP.findOne({ email }).select("otp");
    if (!savedOtp) {
      return res.status(401).json({ msg: "OTP expired. Try again!", success: false });
    }

    if (otp != savedOtp?.otp) {
      return res.status(401).json({ msg: "OTP didn't match. Try again!", success: false });
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Generate master key (32 bytes) and encrypt with server secret
    const masterKey = CryptoJS.lib.WordArray.random(32).toString(CryptoJS.enc.Hex);
    const encryptedMasterKey = CryptoJS.AES.encrypt(
      masterKey,
      process.env.SERVER_ENCRYPTION_KEY as string
    ).toString();

    const newUser = {
      name,
      email,
      password: hashedPassword,
      provider: "credentials",
      encryptedMasterKey,
    };

    await User.create(newUser);

    // send welcome email
    sendWelcomeEmail(email, name);

    return res.status(201).json({ success: true, msg: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

export default UserRegister;
