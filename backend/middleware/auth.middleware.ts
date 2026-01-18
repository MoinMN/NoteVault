import { Request, Response, NextFunction } from "express";
import { JwtUserPayload } from "../types/auth.js";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: JwtUserPayload;
};

const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ success: false, msg: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    req.user = decoded as JwtUserPayload; // 🔥 attach decoded payload
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, msg: "Invalid or expired token" });
  }
};

export default authMiddleware;
