// Payment-related API calls
import apiService from './api';
import type { Payment, PaginatedResponse } from '../types';

export const paymentService = {
  // Get all payments
  async getPayments(
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<Payment>> {
    const response = await apiService.get<PaginatedResponse<Payment>>(
      `/payments?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  },

  // Get single payment by ID
  async getPaymentById(id: string): Promise<Payment> {
    const response = await apiService.get<Payment>(`/payments/${id}`);
    return response.data;
  },

  // Get payments by client ID
  async getPaymentsByClientId(clientId: string): Promise<Payment[]> {
    const response = await apiService.get<Payment[]>(
      `/clients/${clientId}/payments`
    );
    return response.data;
  },

  // Create new payment
  async createPayment(
    paymentData: Omit<Payment, 'id' | 'createdAt' | 'updatedAt'>
  ): Promise<Payment> {
    const response = await apiService.post<Payment>('/payments', paymentData);
    return response.data;
  },

  // Update payment status
  async updatePaymentStatus(
    id: string,
    status: Payment['status']
  ): Promise<Payment> {
    const response = await apiService.put<Payment>(`/payments/${id}/status`, {
      status,
    });
    return response.data;
  },

  // Cancel payment
  async cancelPayment(id: string): Promise<Payment> {
    const response = await apiService.put<Payment>(`/payments/${id}/cancel`);
    return response.data;
  },
};

export default paymentService;
