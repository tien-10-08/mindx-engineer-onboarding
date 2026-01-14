import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

export const protectedRouter = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Lấy token từ header Authorization
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    // xác nhận token hợp lệ
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "Server configuration error" });
    }
    jwt.verify(
      token,
      secret,
      async (err, decoded) => {
        if (err) {
          console.error("Token verification error:", err);
          return res.status(403).json({ message: "Invalid token" });
        }
        
        const decodedUser = decoded as { userId: string; username: string };
        
        //tìm user
        const user = await User.findById(decodedUser.userId).select(
          "-hashedPassword"
        );
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        //trả user vào req.user
        req.user = user;
        next();
      }
    );
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
