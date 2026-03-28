import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  user?: {
    userId: string;
  };
}

export function authenticateToken(
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(400).json({ error: "Token missing!" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY as string) as {
      userId: string;
    };

    req.user = decoded;

    next();
  } catch {
    return res.status(403).json({
      error: "Invalid Token",
    });
  }
}
