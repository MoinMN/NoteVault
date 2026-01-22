import { readFileSync } from "fs";
import path from "path";
import { VercelRequest, VercelResponse } from "@vercel/node";

export default function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  const html = readFileSync(
    path.join(process.cwd(), "public", "about.html"),
    "utf-8"
  );

  res.setHeader("Content-Type", "text/html");
  res.status(200).send(html);
}
