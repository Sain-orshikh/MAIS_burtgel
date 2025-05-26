export interface School {
  name: string;
  averageGrade: number;
}

export interface PaymentConfirmation {
  imageUrl: string;
  uploadedAt: Date;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  nationalRegistrationNumber: string;
  school: School;
  paymentConfirmation: PaymentConfirmation;
  essay: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export interface RegistrationForm {
  name: string;
  email: string;
  phoneNumber: string;
  nationalRegistrationNumber: string;
  school: {
    name: string;
    averageGrade: number;
  };
  paymentConfirmation?: File;
  essay: string;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  admin: AdminUser;
  token: string;
  message: string;
}

export interface ApiError {
  error: string;
  errors?: { msg: string; param: string }[];
}

export interface RegistrationStep {
  id: number;
  title: string;
  isCompleted: boolean;
  isCurrent: boolean;
}

export type RegistrationStatus = 'pending' | 'approved' | 'rejected';
