import express from "express";
import { downloadApk } from "../controller/downloadApk.js";

const router = express.Router();

router.get("/", downloadApk);

export default router;
