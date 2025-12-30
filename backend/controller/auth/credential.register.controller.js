import User from "../../model/user.model.js";
import bcrypt from "bcrypt";

const UserRegister = async (req, res) => {
  try {
    const { email, name, password, confirmPassword } = req.body;
    if (!email || !name || !password || !confirmPassword) {
      return res
        .status(400)
        .json({ msg: "All fields are required", success: false });
    }

    if (password !== confirmPassword) {
      return res
        .status(400)
        .json({ success: false, msg: "Passwords do not match" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res
        .status(401)
        .json({ success: false, msg: "Email already register" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      authProvider: "credentials",
    };
    await User.create(newUser);

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
