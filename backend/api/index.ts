import { readFileSync } from "fs";
import path from "path";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const filePath = path.join(process.cwd(), "public", "index.html");
  const html = readFileSync(filePath, "utf-8");

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
