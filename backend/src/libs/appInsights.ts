import * as appInsights from "applicationinsights";

let client: appInsights.TelemetryClient | null = null;
let isInitialized = false;

/**
 * Get Application Insights client instance (singleton pattern)
 * Returns null if not initialized or connection string not set
 */
export const getAppInsightsClient = (): appInsights.TelemetryClient | null => {
  return client;
};

/**
 * Check if Application Insights is initialized
 */
export const isAppInsightsEnabled = (): boolean => {
  return isInitialized && client !== null;
};

/**
 * Initialize Azure Application Insights
 * Must be called before starting the Express server
 * Uses singleton pattern - safe to call multiple times
 */
export const initializeAppInsights = (): appInsights.TelemetryClient | null => {
  // Return existing client if already initialized
  if (isInitialized && client) {
    return client;
  }

  const connectionString = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;

  if (!connectionString) {
    console.warn(
      "APPLICATIONINSIGHTS_CONNECTION_STRING not found. Application Insights is disabled."
    );
    return null;
  }

  try {
    appInsights
      .setup(connectionString)
      .setAutoCollectRequests(false)  // Disable auto-collection, use manual tracking instead
      .setAutoCollectPerformance(true, true)
      .setAutoCollectExceptions(true)
      .setAutoCollectDependencies(true)
      .setAutoCollectConsole(true, true)
      .setSendLiveMetrics(true)
      .setUseDiskRetryCaching(true)
      .setAutoDependencyCorrelation(true)
      .start();

    client = appInsights.defaultClient;
    
    if (client?.config) {
      client.config.samplingPercentage = 100;
      // Reduce batch interval for faster data transmission (5 seconds)
      client.config.maxBatchSize = 250;
      client.config.maxBatchIntervalMs = 5000; // 5 seconds for faster visibility
    }
    
    // Set cloud role for better identification in Azure Portal
    client.context.tags[client.context.keys.cloudRole] = "week1-api-backend";
    client.context.tags[client.context.keys.cloudRoleInstance] = 
      process.env.NODE_ENV || "development";

    isInitialized = true;
    console.log("✅ Azure Application Insights initialized successfully");
    return client;
  } catch (error) {
    console.error("Failed to initialize Application Insights:", error);
    // Don't throw error, allow server to continue without App Insights
    return null;
  }
};

/**
 * Track custom event
 * Safe to call even if App Insights is not initialized
 */
export const trackEvent = (
  name: string, 
  properties?: Record<string, string>
): void => {
  if (!client) {
    if (process.env.NODE_ENV === "production") {
      console.warn(`[AppInsights] Client not initialized, skipping event: ${name}`);
    }
    return;
  }
  
  try {
    client.trackEvent({ name, properties });
    
    // Debug logging in production
    if (process.env.NODE_ENV === "production") {
      console.log(`[AppInsights] Event tracked: ${name}`, properties);
    }
  } catch (error) {
    console.error("[AppInsights] Failed to track event:", error);
  }
};

/**
 * Track custom metric
 * Safe to call even if App Insights is not initialized
 */
export const trackMetric = (name: string, value: number): void => {
  if (!client) return;
  
  try {
    client.trackMetric({ name, value });
  } catch (error) {
    console.error("Failed to track metric:", error);
  }
};

/**
 * Track exception manually
 * Safe to call even if App Insights is not initialized
 */
export const trackException = (
  exception: Error, 
  properties?: Record<string, string>
): void => {
  if (!client) return;
  
  try {
    client.trackException({ exception, properties });
  } catch (error) {
    console.error("Failed to track exception:", error);
  }
};

/**
 * Track dependency (outgoing calls)
 * Safe to call even if App Insights is not initialized
 */
export const trackDependency = (
  name: string,
  commandName: string,
  elapsed: number,
  success: boolean,
  dependencyTypeName?: string,
  properties?: Record<string, string>
): void => {
  if (!client) return;
  
  try {
    client.trackDependency({
      name,
      data: commandName,
      duration: elapsed,
      success,
      dependencyTypeName: dependencyTypeName || "HTTP",
      properties,
    });
  } catch (error) {
    console.error("Failed to track dependency:", error);
  }
};

/**
 * Helper: Track API request
 * Reusable helper for tracking API calls
 */
export const trackApiRequest = (
  method: string,
  path: string,
  statusCode: number,
  duration: number
): void => {
  trackEvent("API Request", {
    method,
    path,
    statusCode: statusCode.toString(),
    duration: duration.toString(),
  });
};

/**
 * Helper: Track database operation
 * Reusable helper for tracking DB operations
 */
export const trackDbOperation = (
  operation: string,
  collection: string,
  duration: number,
  success: boolean
): void => {
  trackDependency(
    `DB: ${operation}`,
    collection,
    duration,
    success,
    "MongoDB"
  );
};

/**
 * Helper: Track authentication event
 * Reusable helper for tracking auth events
 */
export const trackAuthEvent = (
  eventType: "login" | "logout" | "signup" | "refresh" | "failed",
  userId?: string
): void => {
  const properties = {
    eventType,
    userId: userId || "unknown",
    timestamp: new Date().toISOString(),
  };
  
  // Debug logging in production
  if (process.env.NODE_ENV === "production") {
    console.log(`[AppInsights] Tracking auth event: ${eventType}, userId: ${userId || "unknown"}`);
  }
  
  trackEvent("Authentication", properties);
  
  // Flush immediately for critical auth events to ensure they're sent quickly
  if (client) {
    try {
      client.flush();
    } catch (error) {
      // Ignore flush errors, data will be sent in next batch
      if (process.env.NODE_ENV === "production") {
        console.warn("[AppInsights] Flush failed (non-critical):", error);
      }
    }
  }
};

