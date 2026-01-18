import express from "express";

const router = express.Router();

import CreateNote from "../controller/notes/create.js";
import GetNotesByUser from "../controller/notes/get.js";
import UpdateNote from "../controller/notes/update.js";
import DeleteNotes from "../controller/notes/deletes.js";
import GetNotesCount from "../controller/notes/count.js";

router.post("/create", CreateNote);
router.get("/get", GetNotesByUser);
router.put("/update", UpdateNote);
router.delete("/delete", DeleteNotes);
router.get("/count", GetNotesCount);

export default router;