export const REGISTRATION_STEPS = [
  {
    id: 1,
    title: 'General Information',
    description: 'Basic personal information',
  },
  {
    id: 2,
    title: 'School Information',
    description: 'Previous school details',
  },
  {
    id: 3,
    title: 'Payment Confirmation',
    description: 'Upload payment proof',
  },
  {
    id: 4,
    title: 'Essay',
    description: 'Write your essay',
  },
] as const;

export const FILE_UPLOAD_CONFIG = {
  maxSize: 5 * 1024 * 1024, // 5MB
  acceptedTypes: ['image/jpeg', 'image/png', 'image/gif'],
  acceptedExtensions: '.jpg,.jpeg,.png,.gif',
};

export const ESSAY_CONFIG = {
  minLength: 100,
  maxLength: 5000,
};

export const API_ENDPOINTS = {
  register: '/registration/register',
  login: '/admin/login',
  registrations: '/registration/registrations',
  updateStatus: (id: string) => /registration/registrations//status,
} as const;

export const REGISTRATION_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
} as const;

export const TOAST_CONFIG = {
  duration: 5000,
  success: {
    icon: '✅',
    style: {
      background: '#10B981',
      color: '#FFFFFF',
    },
  },
  error: {
    icon: '❌',
    style: {
      background: '#EF4444',
      color: '#FFFFFF',
    },
  },
} as const;
