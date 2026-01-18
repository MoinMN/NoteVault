import { AuthRequest } from "../../middleware/auth.middleware.js";
import Todos from "../../model/todo.model.js";
import { Response } from "express";
import mongoose from "mongoose";

const DeleteTodos = async (req: AuthRequest, res: Response) => {
  try {
    const currUser = req.user;
    if (!currUser) {
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }

    const { ids } = req.body as { ids: string[] };

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, msg: "Todo IDs are required" });
    }

    const validIds = ids.filter((id) => mongoose.Types.ObjectId.isValid(id));

    if (validIds.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "Invalid todo IDs",
      });
    }

    const result = await Todos.deleteMany({
      _id: { $in: validIds },
      userId: currUser.userId,
    });

    return res.status(200).json({
      success: true,
      msg: "Todos deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

export default DeleteTodos;