import { useMutation, useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import { RegistrationForm, User } from '@/types';
import { useAuthStore } from '@/store';

// Registration Hooks
export const useSubmitRegistration = () => {
  return useMutation({
    mutationFn: (formData: RegistrationForm) => apiClient.submitRegistration(formData)
  });
};

// Admin Authentication Hooks
export const useLogin = () => {
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const response = await apiClient.login(username, password);
      setAuth(response.admin, response.token);
      return response;
    }
  });
};

export const useCreateAdmin = () => {
  const { token } = useAuthStore();

  return useMutation({
    mutationFn: async ({ username, email, password }: { username: string; email: string; password: string }) => {
      if (!token) throw new Error('No authentication token available');
      return apiClient.createAdmin(username, email, password, token);
    }
  });
};

// Admin Data Hooks
export const useRegistrations = () => {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ['registrations'],
    queryFn: () => apiClient.getRegistrations(token!),
    enabled: !!token
  });
};

export const useRegistration = (id: string) => {
  const { token } = useAuthStore();

  return useQuery({
    queryKey: ['registration', id],
    queryFn: () => apiClient.getRegistration(id, token!),
    enabled: !!token && !!id
  });
};

export const useUpdateRegistrationStatus = () => {
  const { token } = useAuthStore();

  return useMutation({
    mutationFn: ({
      id,
      status,
      reason
    }: {
      id: string;
      status: 'approved' | 'rejected';
      reason?: string;
    }) => apiClient.updateRegistrationStatus(id, status, reason, token!)
  });
};

// Utility hook for checking authentication status
export const useAuthCheck = () => {
  const { isAuthenticated, token } = useAuthStore();
  
  return {
    isAuthenticated,
    isLoading: false,
    error: !isAuthenticated && !token ? 'Not authenticated' : null
  };
};
