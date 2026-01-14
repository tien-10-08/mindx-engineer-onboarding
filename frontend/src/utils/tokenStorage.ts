// Token storage utilities
const ACCESS_TOKEN_KEY = 'accessToken';

export const tokenStorage = {
  get: (): string | null => {
    try {
      return localStorage.getItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Error getting token from storage:', error);
      return null;
    }
  },

  set: (token: string): void => {
    try {
      localStorage.setItem(ACCESS_TOKEN_KEY, token);
    } catch (error) {
      console.error('Error saving token to storage:', error);
    }
  },

  remove: (): void => {
    try {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
    } catch (error) {
      console.error('Error removing token from storage:', error);
    }
  },
};

