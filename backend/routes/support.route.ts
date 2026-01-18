import express from "express";

const router = express.Router();

import Contact from "../controller/support/Contact.js";

router.post("/contact", Contact);

export default router;