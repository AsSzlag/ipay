// Base API configuration with Axios
import axios, { AxiosError } from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import type { ApiResponse } from '../types';

// Get API configuration from Vite environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';
const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

class ApiService {
  private axiosInstance: AxiosInstance;

  constructor() {
    // Create axios instance with default configuration
    this.axiosInstance = axios.create({
      baseURL: API_BASE_URL,
      timeout: API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor - add auth token, modify requests
    this.axiosInstance.interceptors.request.use(
      (config) => {
        // Add authorization token if available
        const token = localStorage.getItem('auth_token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        
        // Log request in development
        if (import.meta.env.DEV) {
          console.log('🚀 API Request:', config.method?.toUpperCase(), config.url);
        }
        
        return config;
      },
      (error) => {
        console.error('❌ Request Error:', error);
        return Promise.reject(error);
      }
    );

    // Response interceptor - handle errors globally
    this.axiosInstance.interceptors.response.use(
      (response) => {
        // Log response in development
        if (import.meta.env.DEV) {
          console.log('✅ API Response:', response.config.url, response.status);
        }
        return response;
      },
      (error: AxiosError) => {
        // Handle different error types
        if (error.response) {
          // Server responded with error status
          const status = error.response.status;
          
          switch (status) {
            case 401:
              // Unauthorized - clear token and redirect to login
              localStorage.removeItem('auth_token');
              window.location.href = '/login';
              break;
            case 403:
              console.error('❌ Forbidden: You do not have permission');
              break;
            case 404:
              console.error('❌ Not Found:', error.config?.url);
              break;
            case 500:
              console.error('❌ Server Error');
              break;
            default:
              console.error('❌ API Error:', status, error.message);
          }
        } else if (error.request) {
          // Request made but no response received
          console.error('❌ Network Error: No response from server');
        } else {
          // Error in request configuration
          console.error('❌ Request Configuration Error:', error.message);
        }
        
        return Promise.reject(error);
      }
    );
  }

  // Generic request method
  private async request<T>(config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response = await this.axiosInstance.request<ApiResponse<T>>(config);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.message || 
          error.message || 
          'An error occurred'
        );
      }
      throw error;
    }
  }

  // GET request
  async get<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
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
  async delete<T>(endpoint: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
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

