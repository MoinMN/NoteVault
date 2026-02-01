import { AuthRequest } from "../../middleware/auth.middleware.js";
import User from "../../model/user.model.js";
import { Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserLogin = async (req: AuthRequest, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields required" });
    }

    // by default password is excluded
    const userExist = await User.findOne({ email }).select("+password");

    if (!userExist) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid Credentials!" });
    }

    if (userExist.provider !== "credentials" || !userExist?.password) {
      return res.status(400).json({
        success: false,
        msg: "Please login using Google",
      });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid Credentials!" });
    }

    const JWT_SECRET: jwt.Secret = process.env.JWT_SECRET as string;
    const JWT_EXPIRES = (process.env.JWT_EXPIRES_IN || "7d") as jwt.SignOptions["expiresIn"];

    const token = jwt.sign(
      {
        userId: userExist._id.toString(),
        email: userExist.email,
        name: userExist.name,
        role: userExist.role
      },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES }
    );

    return res.status(200).json({
      success: true,
      msg: "Login successful!",
      token,
      user: {
        id: userExist._id,
        name: userExist.name,
        email: userExist.email,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

export default UserLogin;
