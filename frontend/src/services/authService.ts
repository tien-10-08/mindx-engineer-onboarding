import api from '../lib/axios';
import { trackAuthEvent, trackError } from './analytics';
import type {
  LoginCredentials,
  SignupCredentials,
  AuthResponse,
  User,
} from '../types/auth';

export const authService = {
 
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    try {
      const response = await api.post<AuthResponse>('/auth/login', credentials);
      trackAuthEvent('login');
      return response.data;
    } catch (error) {
      trackAuthEvent('failed');
      trackError(
        error instanceof Error ? error.message : 'Login failed',
        'authService.login'
      );
      throw error;
    }
  },

  
  signup: async (credentials: SignupCredentials): Promise<void> => {
    try {
      await api.post('/auth/signup', credentials);
      trackAuthEvent('signup');
    } catch (error) {
      trackError(
        error instanceof Error ? error.message : 'Signup failed',
        'authService.signup'
      );
      throw error;
    }
  },

  /**
   * Logout user
   * Tracks logout events for user behavior analysis
   */
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/signout');
      trackAuthEvent('logout');
    } catch (error) {
      trackAuthEvent('logout');
      trackError(
        error instanceof Error ? error.message : 'Logout failed',
        'authService.logout'
      );
    }
  },

  /**
   * Refresh access token
   */
  refreshToken: async (): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/refresh');
    return response.data;
  },

  /**
   * Get current user information
   */
  getCurrentUser: async (): Promise<{ user: User }> => {
    const response = await api.get<{ user: User }>('/user/me');
    return response.data;
  },
};

