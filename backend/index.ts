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

// Serve static files from public directory
const pages = path.join(__dirname, "public");
app.use(express.static(pages));

// Routes without .html extension
app.get("/", (_, res) =>
  res.sendFile(path.join(pages, "index.html"))
);

app.get("/privacy", (_, res) =>
  res.sendFile(path.join(pages, "privacy.html"))
);

app.get("/terms", (_, res) =>
  res.sendFile(path.join(pages, "terms.html"))
);

app.get("/contact", (_, res) =>
  res.sendFile(path.join(pages, "contact.html"))
);

app.get("/about", (_, res) =>
  res.sendFile(path.join(pages, "about.html"))
);

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