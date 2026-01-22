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

// Routes without .html extension
app.get("/", (_, res) => {
  res.sendFile(path.join(publicDir, "index.html"));
});

app.get("/privacy", (_, res) => {
  res.sendFile(path.join(publicDir, "privacy.html"));
});

app.get("/terms", (_, res) => {
  res.sendFile(path.join(publicDir, "terms.html"));
});

app.get("/about", (_, res) => {
  res.sendFile(path.join(publicDir, "about.html"));
});

// database connect first
import connectDB from "./config/mongodb.js";
await connectDB();

// api routes
import ApiRoute from "./routes/index.js";
app.use("/api", ApiRoute);

app.use((_, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// app listener
const PORT = process.env.PORT || 4518;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port http://localhost:${PORT}`);
});