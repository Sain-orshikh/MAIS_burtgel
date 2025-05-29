'use client';

import toast from 'react-hot-toast';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

export const showToast = ({ message, type }: ToastProps) => {
  const options = {
    duration: type === 'success' ? 2000 : 3000,
    position: 'top-center' as const,
    style: {
      background: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
      color: '#ffffff',
      fontWeight: '500',
      borderRadius: '8px',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    },
    iconTheme: {
      primary: '#ffffff',
      secondary: type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6',
    },
  };

  switch (type) {
    case 'success':
      return toast.success(message, options);
    case 'error':
      return toast.error(message, options);
    case 'info':
    default:
      return toast(message, options);
  }
};

export default showToast;
