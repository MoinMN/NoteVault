import express from "express";

const router = express.Router();

import AuthMe from "../controller/auth/me.js";
import UserLogin from "../controller/auth/login.js";
import UserRegister from "../controller/auth/register.js";
import authMiddleware from "../middleware/auth.middleware.js";
import MailExist from "../controller/auth/mailExist.js";
import SaveOtp from "../controller/auth/saveOtp.js";
import GoogleLogin from "../controller/auth/google.js";
import VerifyForgotOtp from "../controller/auth/forgot-password/verifyOtp.js";
import ResetForgotPassword from "../controller/auth/forgot-password/reset.js";

router.get("/me", authMiddleware, AuthMe);
router.post("/login", UserLogin);
router.post("/google", GoogleLogin);
router.post("/register", UserRegister);
router.get("/mail/exist", MailExist);
router.patch("/mail/otp", SaveOtp);
router.post("/forgot-password/verify-otp", VerifyForgotOtp);
router.post("/forgot-password/reset", ResetForgotPassword);

export default router;
