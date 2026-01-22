import { Request, Response } from "express";
import fs from "fs";
import path from "path";

export default async function handler(req:Request, res:Response) {
  const filePath = path.join(process.cwd(), "public", "privacy.html");
  const html = fs.readFileSync(filePath, "utf-8");

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
