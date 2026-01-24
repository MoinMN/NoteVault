import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware.js";
import Notes from "../../model/note.model.js";

const CreateNote = async (req: AuthRequest, res: Response) => {
  try {
    const currUser = req.user;
    if (!currUser) {
      return res.status(401).json({ success: false, msg: "Unauthorized!" });
    }

    const { title, content } = req.body;
    if (!title && !content) {
      return res.status(400).json({ success: false, msg: "Title or Content is mandatory!" });
    }

    const savedNote = await Notes.create({ title, content, userId: currUser.userId });

    return res.status(201).json({ success: true, msg: "Note Created!", note: savedNote });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, msg: "Internal Server Error" });
  }
}

export default CreateNote;