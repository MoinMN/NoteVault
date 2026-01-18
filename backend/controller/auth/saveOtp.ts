import { AuthRequest } from "../../middleware/auth.middleware.js";
import { Response } from "express";
import sendOTPEmail from "../../utils/sendOtpMail.js";
import OTP from "../../model/otp.model.js";

const SaveOtp = async (req: AuthRequest, res: Response) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ msg: "Email not found!", success: false });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return res.status(400).json({ msg: "Invalid email!", success: false });

    await OTP.deleteMany({ email });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    const savedOtp = await OTP.create({ email, otp });

    if (!savedOtp) return res.status(400).json({ msg: "There was error while saving otp!", success: false });

    const isMailSent = await sendOTPEmail(email, otp);

    if (!isMailSent) return res.status(400).json({ msg: "There was error while mailing otp!", success: false });

    return res.status(200).json({ msg: "OTP Sent Successfully!", success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

export default SaveOtp;