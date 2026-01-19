import { Request, Response, NextFunction } from "express";
import { trackException } from "../libs/appInsights";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  trackException(err instanceof Error ? err : new Error(err), {
    path: req.path,
    method: req.method,
    ip: req.ip || "unknown"
  });

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};