import { Request, Response } from "express";
import User from "../../../model/user.model.js";
import OTP from "../../../model/otp.model.js";
import bcrypt from "bcrypt";

const ResetForgotPassword = async (req: Request, res: Response) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }

    const savedOtp = await OTP.findOne({ email });
    if (!savedOtp || savedOtp.otp !== otp) {
      return res.status(400).json({ success: false, msg: "Invalid or expired OTP" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    if (user.provider === "google") {
      return res.status(401).json({ success: false, msg: "Can't reset password. Use Google Sign In!" });
    }

    user.password = hashedPassword;
    await user.save();

    // Delete OTP after successful reset
    await OTP.deleteOne({ email });

    return res.status(200).json({ success: true, msg: "Password reset successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

export default ResetForgotPassword;
