import User from "../../model/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "All fields required" });
    }

    const userExist = await User.findOne({ email }).select("+password");

    if (!userExist) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid Credentials!" });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, msg: "Invalid Credentials!" });
    }

    const token = jwt.sign(
      { userId: userExist._id, email: userExist.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
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
