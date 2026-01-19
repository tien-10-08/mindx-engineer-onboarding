import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import { trackAuthEvent, trackException } from "../libs/appInsights";

export const protectedRouter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "Server configuration error" });
    }

    const decoded = jwt.verify(token, secret) as {
      userId: string;
      username: string;
    };

    const user = await User.findById(decoded.userId).select("-hashedPassword");
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    trackAuthEvent("failed");
    trackException(error as Error);
    return res.status(401).json({ message: "Unauthorized" });
  }
  
};