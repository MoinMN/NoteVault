import { AuthRequest } from "../../middleware/auth.middleware.js";
import User from "../../model/user.model.js";
import { Response } from "express";

const AuthMe = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        msg: "Unauthorized",
      });
    }

    const { userId } = req.user;

    const user = await User.findById(userId);

    if (!user || !userId) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }

    return res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

export default AuthMe;
