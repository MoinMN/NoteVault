import { AuthRequest } from "../../middleware/auth.middleware.js";
import User from "../../model/user.model.js";
import Todo from "../../model/todo.model.js";
import Note from "../../model/note.model.js";
import { Response } from "express";
import mongoose from "mongoose";

// delete users by admin
const deleteUsers = async (req: AuthRequest, res: Response) => {
  try {
    const { ids } = req.body;

    // Validation
    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "User ids array is required",
      });
    }

    // Validate ObjectIds
    const validIds = ids.filter((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );

    if (validIds.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "No valid user ids provided",
      });
    }

    // 1️⃣ Delete todos of users
    await Todo.deleteMany({
      userId: { $in: validIds },
    });

    // 2️⃣ Delete notes of users
    await Note.deleteMany({
      userId: { $in: validIds },
    });

    // 3️⃣ Delete users
    const result = await User.deleteMany({
      _id: { $in: validIds },
    });

    return res.status(200).json({
      success: true,
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error("Delete users error:", error);
    return res.status(500).json({
      success: false,
      msg: "Failed to delete users",
    });
  }
};

export default deleteUsers;