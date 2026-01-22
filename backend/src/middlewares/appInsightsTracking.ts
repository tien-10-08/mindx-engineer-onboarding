import { Request, Response, NextFunction } from "express";
import { getAppInsightsClient } from "../libs/appInsights";

/**
 * Express middleware to track HTTP requests for Application Insights
 * Manual tracking ensures all requests are captured reliably
 */
export const appInsightsRequestTracking = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const client = getAppInsightsClient();
  
  if (!client) {
    // App Insights not initialized, skip tracking
    return next();
  }

  const startTime = Date.now();
  const originalEnd = res.end.bind(res);

  // Override res.end to capture response details
  res.end = function (chunk?: any, encoding?: any, cb?: any): Response {
    const duration = Date.now() - startTime;
    
    // Track request - MUST be synchronous and before calling originalEnd
    try {
      client.trackRequest({
        name: `${req.method} ${req.path}`,
        url: req.originalUrl || req.url,
        duration: duration,
        resultCode: res.statusCode.toString(),
        success: res.statusCode < 400,
        properties: {
          method: req.method,
          path: req.path,
          route: req.route?.path || req.path,
          ip: req.ip || req.socket.remoteAddress || "unknown",
        },
      });
    } catch (error) {
      console.error("[AppInsights] Failed to track request:", error);
    }

    // Call original end
    return originalEnd(chunk, encoding, cb);
  };

  next();
};
