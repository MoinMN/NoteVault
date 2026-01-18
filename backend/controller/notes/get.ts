import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import Notes from "../../model/note.model.js";

const GetNotesByUser = async (req: AuthRequest, res: Response) => {
  try {
    const currUser = req.user;
    if (!currUser) {
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }

    const notes = await Notes.find({ userId: currUser?.userId });

    return res.status(201).json({ success: true, notes });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
}

export default GetNotesByUser;