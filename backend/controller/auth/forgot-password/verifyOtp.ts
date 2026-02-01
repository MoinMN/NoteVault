import { Request, Response } from "express";
import OTP from "../../../model/otp.model.js";

const VerifyForgotOtp = async (req: Request, res: Response) => {
  try {
    const { email, otp } = req.body;
    if (!email || !otp) {
      return res.status(400).json({ success: false, msg: "Email and OTP are required" });
    }

    const savedOtp = await OTP.findOne({ email }).select("otp createdAt");
    if (!savedOtp) {
      return res.status(400).json({ success: false, msg: "OTP expired. Please request a new one" });
    }

    // check OTP expiration (10 min)
    const otpAge = (Date.now() - savedOtp.createdAt.getTime()) / 1000; // seconds
    if (otpAge > 600) {
      await OTP.deleteOne({ email });
      return res.status(400).json({ success: false, msg: "OTP expired. Please request a new one" });
    }

    if (savedOtp.otp !== otp) {
      return res.status(400).json({ success: false, msg: "Invalid OTP" });
    }

    return res.status(200).json({ success: true, msg: "OTP verified successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, msg: "Internal Server Error" });
  }
};

export default VerifyForgotOtp;