import User from "../../model/user.model.js";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import { Response } from "express";

const getAllUsers = async (req: AuthRequest, res: Response) => {
  try {
    const users = await User.find(
      {},
      {
        name: 1,
        email: 1,
        role: 1,
        _id: 1,
        createdAt: 1
      }
    ).lean();

    return res.status(200).json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    console.error("Get all users error:", error);
    return res.status(500).json({
      success: false,
      msg: "Failed to fetch users",
    });
  }
};

export default getAllUsers;