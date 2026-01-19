import ReactGA from 'react-ga4';

// Cache Measurement ID
const MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
let isInitialized = false;

/**
 * Initialize Google Analytics
 * Safe to call multiple times (uses singleton pattern)
 */
export const initGA = (): void => {
  // Return if already initialized
  if (isInitialized) {
    return;
  }

  if (!MEASUREMENT_ID) {
    console.warn(
      'VITE_GA_MEASUREMENT_ID not found. Google Analytics is disabled.'
    );
    return;
  }

  try {
    ReactGA.initialize(MEASUREMENT_ID);
    isInitialized = true;
    console.log('✅ Google Analytics initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Google Analytics:', error);
  }
};

/**
 * Check if Google Analytics is initialized
 */
export const isGAEnabled = (): boolean => {
  return isInitialized && !!MEASUREMENT_ID;
};

/**
 * Track page view
 * Safe to call even if GA is not initialized
 */
export const trackPageView = (path: string): void => {
  if (!isInitialized) return;

  try {
    ReactGA.send({ hitType: 'pageview', page: path });
  } catch (error) {
    console.error('Failed to track page view:', error);
  }
};

/**
 * Track custom event
 * Safe to call even if GA is not initialized
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
): void => {
  if (!isInitialized) return;

  try {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  } catch (error) {
    console.error('Failed to track event:', error);
  }
};

/**
 * Helper: Track authentication event
 * Reusable helper for tracking auth events
 */
export const trackAuthEvent = (
  eventType: 'login' | 'logout' | 'signup' | 'failed',
  userId?: string
): void => {
  trackEvent('Authentication', eventType, userId || 'unknown');
};

/**
 * Helper: Track form submission
 * Reusable helper for tracking form submissions
 */
export const trackFormSubmit = (formName: string): void => {
  trackEvent('Form', 'Submit', formName);
};

/**
 * Helper: Track button click
 * Reusable helper for tracking button clicks
 */
export const trackButtonClick = (buttonName: string): void => {
  trackEvent('UI', 'Button Click', buttonName);
};

/**
 * Helper: Track error
 * Reusable helper for tracking errors
 */
export const trackError = (
  errorMessage: string,
  errorLocation?: string
): void => {
  trackEvent('Error', 'Error Occurred', `${errorLocation || 'Unknown'}: ${errorMessage}`);
};

/**
 * Helper: Track navigation
 * Reusable helper for tracking navigation
 */
export const trackNavigation = (destination: string): void => {
  trackEvent('Navigation', 'Navigate', destination);
};