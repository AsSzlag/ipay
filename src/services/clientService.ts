// Client-related API calls
import apiService from './api';
import type { Client, PaginatedResponse } from '../types';

export const clientService = {
  // Get all clients
  async getClients(page: number = 1, pageSize: number = 10): Promise<PaginatedResponse<Client>> {
    const response = await apiService.get<PaginatedResponse<Client>>(
      `/clients?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  },

  // Get single client by ID
  async getClientById(id: string): Promise<Client> {
    const response = await apiService.get<Client>(`/clients/${id}`);
    return response.data;
  },

  // Create new client
  async createClient(clientData: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>): Promise<Client> {
    const response = await apiService.post<Client>('/clients', clientData);
    return response.data;
  },

  // Update client
  async updateClient(id: string, clientData: Partial<Client>): Promise<Client> {
    const response = await apiService.put<Client>(`/clients/${id}`, clientData);
    return response.data;
  },

  // Delete client
  async deleteClient(id: string): Promise<void> {
    await apiService.delete(`/clients/${id}`);
  },
};

export default clientService;

