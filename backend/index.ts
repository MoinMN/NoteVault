import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";

dotenv.config();
const app = express();
const __dirname = path.resolve();

// middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Serve static files from public directory
const publicDir = path.join(__dirname, "public");
app.use(express.static(publicDir));

// database connect first
import connectDB from "./config/mongodb.js";
await connectDB();

// api routes
import ApiRoute from "./routes/index.js";
app.use("/", ApiRoute);

app.use((_, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// app listener
const PORT = process.env.PORT || 4518;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port http://localhost:${PORT}`);
});