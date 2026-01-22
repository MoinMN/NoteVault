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

// static pages (for Expo WebView)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (_, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);
app.get("/privacy", (_, res) =>
  res.sendFile(path.join(__dirname, "public/privacy.html"))
);
app.get("/terms", (_, res) =>
  res.sendFile(path.join(__dirname, "public/terms.html"))
);
app.get("/contact", (_, res) =>
  res.sendFile(path.join(__dirname, "public/contact.html"))
);
app.get("/about", (_, res) =>
  res.sendFile(path.join(__dirname, "public/about.html"))
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
