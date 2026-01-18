import express from "express";

const router = express.Router();

import AuthMe from "../controller/auth/me.js";
import UserLogin from "../controller/auth/login.js";
import UserRegister from "../controller/auth/register.js";
import authMiddleware from "../middleware/auth.middleware.js";
import MailExist from "../controller/auth/mailExist.js";
import SaveOtp from "../controller/auth/saveOtp.js";

router.get("/me", authMiddleware, AuthMe);
router.post("/login", UserLogin);
router.post("/register", UserRegister);
router.get("/mail/exist", MailExist);
router.patch("/mail/otp", SaveOtp);

export default router;
