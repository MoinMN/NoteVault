import express from "express";
import AuthRoute from "./auth.route.js";
import NoteRoute from "./note.route.js";
import ToDoRoute from "./todo.route.js";
import SupportRoute from "./support.route.js";
import AdminRoute from "./admin.route.js";
import ApkRoute from "./apk.route.js";
import authMiddleware from "../middleware/auth.middleware.js";
import isAdmin from "../middleware/admin.auth.middleware.js";

const router = express.Router();

router.use("/auth", AuthRoute);
router.use("/note", authMiddleware, NoteRoute);
router.use("/todo", authMiddleware, ToDoRoute);
router.use("/support", SupportRoute);
router.use("/admin", authMiddleware, isAdmin, AdminRoute);
router.use("/apk", ApkRoute);


export default router;
