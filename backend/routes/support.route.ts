import express from "express";

const router = express.Router();

import Contact from "../controller/support/Contact.js";
import PublicContact from "../controller/support/PublicContact.js";
import authMiddleware from "../middleware/auth.middleware.js";

router.post("/contact", authMiddleware, Contact);
router.post("/public", PublicContact);

export default router;