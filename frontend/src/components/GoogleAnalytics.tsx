import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../services/analytics';


export const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const fullPath = location.pathname + location.search;
    trackPageView(fullPath);
  }, [location]);

  return null;
};

