import { AuthRequest } from "../../middleware/auth.middleware.js";
import User from "../../model/user.model.js";
import { Response } from "express";

const MailExist = async (req: AuthRequest, res: Response) => {
  try {
    const { email } = req.query;
    if (!email)
      return res.status(401).json({ success: false, msg: "Email not found!" });

    const userExist = await User.findOne({ email });

    // check mail exist
    if (userExist)
      return res.status(401).json({ success: false, msg: "Email Already Exist!" });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

export default MailExist;
