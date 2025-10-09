// Authentication service
import apiService from './api';
import type {
  LoginCredentials,
  RegisterData,
  AuthResponse,
  ResetPasswordData,
  ChangePasswordData,
  RefreshTokenResponse,
} from '../types/auth.types';
import type { ApiResponse } from '../types';

export const authService = {
  /**
   * Login user with email and password
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      '/auth/login',
      credentials
    );
    const authData = response.data;

    // Save tokens and user to localStorage
    localStorage.setItem('accessToken', authData.tokens.accessToken);
    localStorage.setItem('refreshToken', authData.tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(authData.user));

    return authData;
  },

  /**
   * Register new user
   */
  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await apiService.post<AuthResponse>(
      '/auth/register',
      data
    );
    const authData = response.data;

    // Save tokens and user to localStorage
    localStorage.setItem('accessToken', authData.tokens.accessToken);
    localStorage.setItem('refreshToken', authData.tokens.refreshToken);
    localStorage.setItem('user', JSON.stringify(authData.user));

    return authData;
  },

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      await apiService.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear localStorage regardless of API call success
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    }
  },

  /**
   * Refresh access token
   */
  async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
    const response = await apiService.post<RefreshTokenResponse>(
      '/auth/refresh',
      {
        refreshToken,
      }
    );

    const tokens = response.data;

    // Save new tokens to localStorage
    localStorage.setItem('accessToken', tokens.accessToken);
    if (tokens.refreshToken) {
      localStorage.setItem('refreshToken', tokens.refreshToken);
    }

    return tokens;
  },

  /**
   * Request password reset
   */
  async resetPassword(data: ResetPasswordData): Promise<void> {
    await apiService.post('/auth/reset-password', data);
  },

  /**
   * Change user password
   */
  async changePassword(data: ChangePasswordData): Promise<void> {
    await apiService.post('/auth/change-password', data);
  },

  /**
   * Verify email with token
   */
  async verifyEmail(token: string): Promise<void> {
    await apiService.post('/auth/verify-email', { token });
  },

  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<ApiResponse<AuthResponse['user']>> {
    const response = await apiService.get<AuthResponse['user']>('/auth/me');

    if (response.data) {
      localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response;
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    return !!accessToken;
  },

  /**
   * Get current access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem('accessToken');
  },
};

export default authService;
