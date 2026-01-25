import { Request, Response } from "express";
import path from "path";

export const downloadApk = (req: Request, res: Response) => {
  try {
    const filePath = path.join(process.cwd(), "/public/apk/NoteVault.apk");

    res.setHeader("Content-Type", "application/vnd.android.package-archive");
    res.setHeader("Content-Disposition", "attachment; filename=NoteVault.apk");

    // Set headers to force download
    res.download(filePath, "NoteVault.apk", (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).send("Could not download the file.");
      }
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).send("Internal Server Error");
  }
};
