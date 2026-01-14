// API service functions for authentication
import api from '../lib/axios';
import type {
  LoginCredentials,
  SignupCredentials,
  AuthResponse,
  User,
} from '../types/auth';

export const authService = {
  /**
   * Login user
   */
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', credentials);
    return response.data;
  },

  /**
   * Register new user
   */
  signup: async (credentials: SignupCredentials): Promise<void> => {
    await api.post('/auth/signup', credentials);
  },

  /**
   * Logout user
   */
  logout: async (): Promise<void> => {
    await api.post('/auth/signout');
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

