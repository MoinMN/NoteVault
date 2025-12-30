import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// database connect first
import connectDB from "./config/mongodb.js";
await connectDB();

import AuthRoute from "./routes/auth.route.js";
app.use("/api/auth", AuthRoute);

const PORT = process.env.PORT || 4518;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port http://localhost:${PORT}`);
});
