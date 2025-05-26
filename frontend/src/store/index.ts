import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AdminUser, RegistrationForm } from '@/types';

interface AuthState {
  admin: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (admin: AdminUser, token: string) => void;
  logout: () => void;
}

interface RegistrationState {
  currentStep: number;
  formData: Partial<RegistrationForm>;
  setCurrentStep: (step: number) => void;
  updateFormData: (data: Partial<RegistrationForm>) => void;
  resetForm: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      admin: null,
      token: null,
      isAuthenticated: false,
      setAuth: (admin, token) => set({ admin, token, isAuthenticated: true }),
      logout: () => set({ admin: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-store',
    }
  )
);

export const useRegistrationStore = create<RegistrationState>((set) => ({
  currentStep: 1,
  formData: {},
  setCurrentStep: (step) => set({ currentStep: step }),
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  resetForm: () => set({ currentStep: 1, formData: {} }),
}));

// Helper function to get form validation state
export const getStepValidation = (formData: Partial<RegistrationForm>, step: number): boolean => {
  switch (step) {
    case 1: // General Info
      return !!(
        formData.name &&
        formData.email &&
        formData.phoneNumber &&
        formData.nationalRegistrationNumber
      );
    case 2: // School Info
      return !!(formData.school?.name && formData.school?.averageGrade);
    case 3: // Payment
      return !!formData.paymentConfirmation;
    case 4: // Essay
      return !!(formData.essay && formData.essay.length >= 100);
    default:
      return false;
  }
};
