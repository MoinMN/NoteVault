import express from "express";
import AuthRoute from "./auth.route.js";
import NoteRoute from "./note.route.js";
import ToDoRoute from "./todo.route.js";
import SupportRoute from "./support.route.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.use("/auth", AuthRoute);
router.use("/note", authMiddleware, NoteRoute);
router.use("/todo", authMiddleware, ToDoRoute);
router.use("/support", authMiddleware, SupportRoute);

export default router;
