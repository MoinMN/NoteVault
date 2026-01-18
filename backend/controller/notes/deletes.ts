import { AuthRequest } from "../../middleware/auth.middleware.js";
import Notes from "../../model/note.model.js";
import { Response } from "express";
import mongoose from "mongoose";

const DeleteNotes = async (req: AuthRequest, res: Response) => {
  try {
    const currUser = req.user;
    if (!currUser) {
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }

    const { ids } = req.body as { ids: string[] };

    if (!Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ success: false, msg: "Note IDs are required" });
    }

    const validIds = ids.filter((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );

    if (validIds.length === 0) {
      return res.status(400).json({
        success: false,
        msg: "Invalid note IDs",
      });
    }

    const result = await Notes.deleteMany({
      _id: { $in: validIds },
      userId: currUser.userId,
    });

    return res.status(200).json({
      success: true,
      msg: "Notes deleted successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
};

export default DeleteNotes;