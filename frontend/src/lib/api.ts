import { RegistrationForm, AuthResponse, ApiError, User } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

class ApiClient {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const response = await fetch(\\, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred');
    }

    return data;
  }

  private async uploadForm(
    endpoint: string,
    formData: FormData,
    options: RequestInit = {}
  ) {
    const response = await fetch(\\, {
      ...options,
      body: formData,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'An error occurred');
    }

    return data;
  }

  // Registration
  async submitRegistration(form: RegistrationForm) {
    const formData = new FormData();
    
    // Append text fields
    formData.append('name', form.name);
    formData.append('email', form.email);
    formData.append('phoneNumber', form.phoneNumber);
    formData.append('nationalRegistrationNumber', form.nationalRegistrationNumber);
    formData.append('school[name]', form.school.name);
    formData.append('school[averageGrade]', form.school.averageGrade.toString());
    formData.append('essay', form.essay);

    // Append file if exists
    if (form.paymentConfirmation) {
      formData.append('paymentConfirmation', form.paymentConfirmation);
    }

    return this.uploadForm('/registration/register', formData, {
      method: 'POST',
    });
  }

  // Admin Authentication
  async login(username: string, password: string): Promise<AuthResponse> {
    return this.request<AuthResponse>('/admin/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  // Admin Operations
  async getRegistrations(token: string): Promise<User[]> {
    return this.request<User[]>('/registration/registrations', {
      headers: {
        Authorization: Bearer \,
      },
    });
  }

  async getRegistration(id: string, token: string): Promise<User> {
    return this.request<User>(/registration/registrations/\, {
      headers: {
        Authorization: Bearer \,
      },
    });
  }

  async updateRegistrationStatus(
    id: string,
    status: 'approved' | 'rejected',
    reason: string | undefined,
    token: string
  ) {
    return this.request(/registration/registrations/\/status, {
      method: 'PATCH',
      headers: {
        Authorization: Bearer \,
      },
      body: JSON.stringify({ status, reason }),
    });
  }
}

export const apiClient = new ApiClient();
