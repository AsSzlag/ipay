// Application/Wniosek service
import apiService from './api';
import type {
  Application,
  ApplicationFilters,
  CreateApplicationDto,
  UpdateApplicationDto,
  ApplicationStatus,
} from '../types/application.types';
import type { ApiResponse, PaginatedResponse } from '../types';

export const applicationService = {
  /**
   * Get all applications with filters and pagination
   */
  async getApplications(
    filters?: ApplicationFilters,
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<Application>> {
    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: pageSize.toString(),
    });

    if (filters) {
      if (filters.status?.length) {
        params.append('status', filters.status.join(','));
      }
      if (filters.type) {
        params.append('type', filters.type);
      }
      if (filters.dateFrom) {
        params.append('dateFrom', filters.dateFrom.toISOString());
      }
      if (filters.dateTo) {
        params.append('dateTo', filters.dateTo.toISOString());
      }
      if (filters.search) {
        params.append('search', filters.search);
      }
    }

    const response = await apiService.get<PaginatedResponse<Application>>(
      `/applications?${params.toString()}`
    );
    return response.data;
  },

  /**
   * Get single application by ID
   */
  async getApplicationById(id: string): Promise<Application> {
    const response = await apiService.get<Application>(`/applications/${id}`);
    return response.data;
  },

  /**
   * Get user's own applications
   */
  async getMyApplications(
    page: number = 1,
    pageSize: number = 10
  ): Promise<PaginatedResponse<Application>> {
    const response = await apiService.get<PaginatedResponse<Application>>(
      `/applications/my?page=${page}&pageSize=${pageSize}`
    );
    return response.data;
  },

  /**
   * Create new application
   */
  async createApplication(data: CreateApplicationDto): Promise<Application> {
    const response = await apiService.post<Application>('/applications', data);
    return response.data;
  },

  /**
   * Update application (draft only)
   */
  async updateApplication(
    id: string,
    data: UpdateApplicationDto
  ): Promise<Application> {
    const response = await apiService.put<Application>(
      `/applications/${id}`,
      data
    );
    return response.data;
  },

  /**
   * Submit application for review
   */
  async submitApplication(id: string): Promise<Application> {
    const response = await apiService.post<Application>(
      `/applications/${id}/submit`
    );
    return response.data;
  },

  /**
   * Update application status (admin only)
   */
  async updateStatus(
    id: string,
    status: ApplicationStatus,
    rejectionReason?: string
  ): Promise<Application> {
    const response = await apiService.patch<Application>(
      `/applications/${id}/status`,
      {
        status,
        rejectionReason,
      }
    );
    return response.data;
  },

  /**
   * Delete application (draft only)
   */
  async deleteApplication(id: string): Promise<void> {
    await apiService.delete(`/applications/${id}`);
  },

  /**
   * Cancel application
   */
  async cancelApplication(id: string): Promise<Application> {
    const response = await apiService.post<Application>(
      `/applications/${id}/cancel`
    );
    return response.data;
  },

  /**
   * Get application statistics
   */
  async getStatistics(): Promise<
    ApiResponse<{
      total: number;
      byStatus: Record<ApplicationStatus, number>;
      byType: Record<string, number>;
    }>
  > {
    return await apiService.get('/applications/statistics');
  },

  /**
   * Export applications to CSV
   */
  async exportApplications(filters?: ApplicationFilters): Promise<Blob> {
    const params = new URLSearchParams();

    if (filters) {
      if (filters.status?.length) {
        params.append('status', filters.status.join(','));
      }
      if (filters.type) {
        params.append('type', filters.type);
      }
      if (filters.dateFrom) {
        params.append('dateFrom', filters.dateFrom.toISOString());
      }
      if (filters.dateTo) {
        params.append('dateTo', filters.dateTo.toISOString());
      }
    }

    const response = await apiService
      .getAxiosInstance()
      .get(`/applications/export?${params.toString()}`, {
        responseType: 'blob',
      });

    return response.data;
  },
};

export default applicationService;
