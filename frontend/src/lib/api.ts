import { College, CollegeListResponse, AuthResponse, User, CollegeFilters } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

class ApiClient {
  private baseUrl: string;
  private token: string | null = null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Request failed');
    }

    return data;
  }

  // Health
  async health() {
    return this.request<{ success: boolean; message: string }>('/api/health');
  }

  // Colleges
  async getColleges(filters: CollegeFilters = {}): Promise<CollegeListResponse> {
    const params = new URLSearchParams();
    if (filters.search) params.append('search', filters.search);
    if (filters.city) params.append('city', filters.city);
    if (filters.state) params.append('state', filters.state);
    if (filters.minFees) params.append('minFees', filters.minFees.toString());
    if (filters.maxFees) params.append('maxFees', filters.maxFees.toString());
    if (filters.minRating) params.append('minRating', filters.minRating.toString());
    if (filters.sortBy) params.append('sortBy', filters.sortBy);
    params.append('page', (filters.page || 1).toString());
    params.append('limit', (filters.limit || 12).toString());

    return this.request<CollegeListResponse>(`/api/colleges?${params.toString()}`);
  }

  async getCollegeById(id: number): Promise<{ success: boolean; data: College }> {
    return this.request<{ success: boolean; data: College }>(`/api/colleges/${id}`);
  }

  // Auth
  async signup(name: string, email: string, password: string): Promise<AuthResponse> {
    return this.request<{ success: boolean; data: AuthResponse }>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }).then((res) => res.data);
  }

  async login(email: string, password: string): Promise<AuthResponse> {
    const response = await this.request<{ success: boolean; data: AuthResponse }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.setToken(response.data.token);
    return response.data;
  }

  async logout(): Promise<void> {
    await this.request<{ success: boolean; message: string }>('/api/auth/logout', {
      method: 'POST',
    });
    this.setToken(null);
  }

  async getMe(): Promise<User> {
    return this.request<{ success: boolean; data: User }>('/api/auth/me').then((res) => res.data);
  }

  // Saved Colleges
  async getSavedColleges(): Promise<College[]> {
    return this.request<{ success: boolean; data: College[] }>('/api/saved').then((res) => res.data);
  }

  async saveCollege(collegeId: number): Promise<College> {
    return this.request<{ success: boolean; data: College }>(`/api/saved/${collegeId}`, {
      method: 'POST',
    }).then((res) => res.data);
  }

  async unsaveCollege(collegeId: number): Promise<void> {
    await this.request<{ success: boolean; message: string }>(`/api/saved/${collegeId}`, {
      method: 'DELETE',
    });
  }

  // Comparison
  async getComparison(): Promise<College[]> {
    return this.request<{ success: boolean; data: College[] }>('/api/compare').then((res) => res.data);
  }

  async addToComparison(collegeId: number): Promise<College> {
    return this.request<{ success: boolean; data: College }>('/api/compare', {
      method: 'POST',
      body: JSON.stringify({ collegeId }),
    }).then((res) => res.data);
  }

  async removeFromComparison(collegeId: number): Promise<void> {
    await this.request<{ success: boolean; message: string }>(`/api/compare/${collegeId}`, {
      method: 'DELETE',
    });
  }
}

export const api = new ApiClient(API_URL);
