import { Request } from "express";
import { Document } from "mongoose";

// Extend Express Request to include user
declare global {
  namespace Express {
    interface Request {
      user?: Document & {
        _id: any;
        username: string;
        email: string;
        displayName: string;
        hashedPassword?: string;
      };
    }
  }
}

export {};

