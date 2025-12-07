import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { AuthRequest, IAuthUser } from "../types/user.types";

const JWT_SECRET = process.env.JWT_SECRET as string;

export function authMiddleware(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }
  const token = authHeader.split(" ")[1];
  console.log('token', token)
  try {
    
    const decoded = jwt.verify(token, JWT_SECRET) as IAuthUser; 
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
}
