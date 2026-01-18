import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();

// middleware
app.use(express.json());
app.use(cors());

// database connect first
import connectDB from "./config/mongodb.js";
await connectDB();

// api routes
import ApiRoute from "./routes/index.js";
app.use("/api", ApiRoute);

// app listener
const PORT = process.env.PORT || 4518;
app.listen(PORT, () => {
  console.log(`🔥 Server running on port http://localhost:${PORT}`);
});
