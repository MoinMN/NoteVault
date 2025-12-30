import express from "express";

const router = express.Router();

import AuthMe from "../controller/auth/me.controller.js";
import UserLogin from "../controller/auth/credential.login.controller.js";
import UserRegister from "../controller/auth/credential.register.controller.js";
import GoogleLogin from "../controller/auth/google.login.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

router.get("/me", authMiddleware, AuthMe);
router.post("/login", UserLogin);
router.post("/register", UserRegister);
router.post("/google", GoogleLogin);

export default router;
