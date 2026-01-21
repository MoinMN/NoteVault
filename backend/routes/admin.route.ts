import express from "express";

const router = express.Router();

import getAllUsers from "../controller/admin/getAllUsers.js";
import deleteUsers from "../controller/admin/deleteUsers.js";


router.get("/users", getAllUsers);
router.delete("/users/delete", deleteUsers);

export default router;
