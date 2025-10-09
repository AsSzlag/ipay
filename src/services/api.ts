// Base API configuration with Axios
import axios, { AxiosError } from 'axios';
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import type { ApiResponse } from '../types';
import type { RefreshTokenResponse } from '../types/auth.types';
import { toast } from 'react-toastify';

// Get API configuration from Vite environment variables
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

class ApiService {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: unknown) => void;
    reject: (reason?: unknown) => void;
  }> = [];

  constructor() {
    // Create axios instance with default configuration
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor - automatically add JWT token
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // Get access token from localStorage
        const token = localStorage.getItem('accessToken');

        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        // Log request in development
        if (import.meta.env.DEV) {
          console.log(
            '🚀 API Request:',
            config.method?.toUpperCase(),
            config.url
          );
        }

        return config;
      },
      error => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle refresh token and errors
    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => {
        // Log response in development
        if (import.meta.env.DEV) {
          console.log('✅ API Response:', response.config.url, response.status);
        }
        return response;
      },
      async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
          _retry?: boolean;
        };

        // Handle 401 Unauthorized
        if (error.response?.status === 401 && !originalRequest._retry) {
          if (this.isRefreshing) {
            // Queue the request while refreshing
            return new Promise((resolve, reject) => {
              this.failedQueue.push({ resolve, reject });
            })
              .then(() => {
                return this.axiosInstance(originalRequest);
              })
              .catch(err => {
                return Promise.reject(err);
              });
          }

          originalRequest._retry = true;
          this.isRefreshing = true;

          const refreshToken = localStorage.getItem('refreshToken');

          if (!refreshToken) {
            this.handleLogout();
            return Promise.reject(error);
          }

          try {
            // Try to refresh the token
            const response = await axios.post<RefreshTokenResponse>(
              `${API_BASE_URL}/auth/refresh`,
              { refreshToken }
            );

            const { accessToken, refreshToken: newRefreshToken } =
              response.data;

            // Update tokens in localStorage
            localStorage.setItem('accessToken', accessToken);
            if (newRefreshToken) {
              localStorage.setItem('refreshToken', newRefreshToken);
            }

            // Retry all queued requests
            this.processQueue(null);

            // Retry the original request
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            }
            return this.axiosInstance(originalRequest);
          } catch (refreshError) {
            // Refresh token failed - logout user
            this.processQueue(refreshError);
            this.handleLogout();
            toast.error('Sesja wygasła. Zaloguj się ponownie.');
            return Promise.reject(refreshError);
          } finally {
            this.isRefreshing = false;
          }
        }

        // Handle different error types
        if (error.response) {
          const status = error.response.status;
          const errorData = error.response.data as { message?: string };

          switch (status) {
            case 403:
              toast.error('Brak uprawnień do wykonania tej operacji');
              break;
            case 404:
              console.error('❌ Not Found:', error.config?.url);
              toast.error('Nie znaleziono zasobu');
              break;
            case 500:
              // Log full error details for 500 errors
              console.error('❌ Server Error (500):', {
                url: error.config?.url,
                method: error.config?.method,
                data: error.config?.data,
                response: error.response.data,
                stack: error.stack,
              });
              toast.error('Błąd serwera. Spróbuj ponownie później.');
              break;
            default: {
              // Show toast for other errors
              const message =
                errorData?.message || 'Wystąpił błąd. Spróbuj ponownie.';
              toast.error(message);
              console.error('❌ API Error:', status, message);
              break;
            }
          }
        } else if (error.request) {
          // Request made but no response received
          console.error('❌ Network Error: No response from server');
          toast.error('Błąd połączenia. Sprawdź internet.');
        } else {
          // Error in request configuration
          console.error('❌ Request Configuration Error:', error.message);
          toast.error('Błąd konfiguracji żądania');
        }

        return Promise.reject(error);
      }
    );
  }

  private processQueue(error: unknown) {
    this.failedQueue.forEach(promise => {
      if (error) {
        promise.reject(error);
      } else {
        promise.resolve();
      }
    });
    this.failedQueue = [];
  }

  private handleLogout() {
    // Clear tokens from localStorage
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    // Redirect to login page
    if (window.location.pathname !== '/login') {
      window.location.href = '/login';
    }
  }

  // Generic request method
  private async request<T>(
    config: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.request<ApiResponse<T>>(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || error.message || 'An error occurred'
        );
      }
      throw error;
    }
  }

  // GET request
  async get<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      ...config,
      method: 'GET',
      url: endpoint,
    });
  }

  // POST request
  async post<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      ...config,
      method: 'POST',
      url: endpoint,
      data,
    });
  }

  // PUT request
  async put<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      ...config,
      method: 'PUT',
      url: endpoint,
      data,
    });
  }

  // PATCH request
  async patch<T>(
    endpoint: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      ...config,
      method: 'PATCH',
      url: endpoint,
      data,
    });
  }

  // DELETE request
  async delete<T>(
    endpoint: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    return this.request<T>({
      ...config,
      method: 'DELETE',
      url: endpoint,
    });
  }

  // Set auth token
  setAuthToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Clear auth token
  clearAuthToken(): void {
    localStorage.removeItem('auth_token');
  }

  // Get axios instance for custom configurations
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Create and export singleton instance
export const apiService = new ApiService();
export default apiService;
