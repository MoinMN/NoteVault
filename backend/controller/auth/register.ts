import { AuthRequest } from "../../middleware/auth.middleware.js";
import User from "../../model/user.model.js";
import { Response } from "express";
import bcrypt from "bcrypt";
import OTP from "../../model/otp.model.js";
import sendWelcomeEmail from "../../utils/sendWelcomeMail.js";

const UserRegister = async (req: AuthRequest, res: Response) => {
  try {
    const { email, name, password, confirmPassword, otp } = req.body;
    if (!email || !name || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ msg: "All fields are required", success: false });
    }

    if (!otp)
      return res.status(401).json({ msg: "OTP not received!", success: false });

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, msg: "Password & Confirm Password Doesn't Matched!" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(401)
        .json({ success: false, msg: "Email already register" });
    }

    const savedOtp = await OTP.findOne({ email }).select("otp");

    if (!savedOtp)
      return res.status(401).json({ msg: "OTP Expired. Try Again!", success: false });

    if (otp != savedOtp?.otp)
      return res.status(401).json({ msg: "OTP didn't matched. Try Again!", success: false });

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      authProvider: "credentials",
    };
    await User.create(newUser);

    sendWelcomeEmail(email, name);

    return res
      .status(201)
      .json({ success: true, msg: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

export default UserRegister;
