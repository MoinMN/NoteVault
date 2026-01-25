import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import Notes from "../../model/note.model.js";

const UpdateNote = async (req: AuthRequest, res: Response) => {
  try {
    const currUser = req.user;
    if (!currUser) {
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }

    const { id, title, content } = req.body;
    if (!id || (!title && !content)) {
      return res.status(400).json({
        success: false,
        msg: "We couldn't process your note. Required information is missing."
      });
    }

    const updatedNote = await Notes.findOneAndUpdate(
      { _id: id, userId: currUser.userId }, // ownership check
      { title, content },
      { new: true } // return updated note
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        msg: "Note not found or not authorized",
      });
    }

    return res.status(200).json({ success: true, msg: "Note updated successfully!", note: updatedNote });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
}

export default UpdateNote;