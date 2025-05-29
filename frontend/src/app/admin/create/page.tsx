'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import { CreateAdminForm } from '@/types';
import AdminLayout from '@/components/admin/AdminLayout';

// Set your passkey here - in production, this should be stored securely
const ADMIN_CREATION_PASSKEY = '6a6572727931313231';

// Mock admin accounts storage (since backend isn't functional yet)
const mockAdmins = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123',
    createdAt: new Date().toISOString()
  }
];

export default function AdminCreatePage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  
  const [passkeyEntered, setPasskeyEntered] = useState(false);
  const [passkey, setPasskey] = useState('');
  const [passkeyError, setPasskeyError] = useState('');
  
  const [formData, setFormData] = useState<CreateAdminForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [formErrors, setFormErrors] = useState<Partial<CreateAdminForm>>({});

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
          <p className="text-gray-600 mb-4">You must be logged in as an admin to access this page.</p>
          <button
            onClick={() => router.push('/admin')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  const handlePasskeySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passkey === ADMIN_CREATION_PASSKEY) {
      setPasskeyEntered(true);
      setPasskeyError('');
    } else {
      setPasskeyError('Invalid passkey. Please try again.');
    }
  };
  const validateForm = (): boolean => {
    const errors: Partial<CreateAdminForm> = {};
    
    if (!formData.username.trim()) {
      errors.username = 'Username is required';
    } else if (mockAdmins.some(admin => admin.username === formData.username)) {
      errors.username = 'Username already exists';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    } else if (mockAdmins.some(admin => admin.email === formData.email)) {
      errors.email = 'Email already exists';
    }
    
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters long';
    }
    
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Since backend isn't functional, simulate API call with mock data
    const newAdmin = {
      id: String(mockAdmins.length + 1),
      username: formData.username,
      email: formData.email,
      password: formData.password,
      createdAt: new Date().toISOString()
    };
    
    // Add to mock storage
    mockAdmins.push(newAdmin);
    
    // Reset form
    setFormData({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    
    alert(`Admin account "${formData.username}" created successfully!\n\nCurrent admin accounts:\n${mockAdmins.map(admin => `- ${admin.username} (${admin.email})`).join('\n')}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (formErrors[name as keyof CreateAdminForm]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };  // Passkey entry form
  if (!passkeyEntered) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-full">
          <div className="max-w-md w-full space-y-8">
            <div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Admin Creation
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Enter the passkey to create a new admin account
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handlePasskeySubmit}>
              <div>
                <label htmlFor="passkey" className="sr-only">
                  Passkey
                </label>
                <input
                  id="passkey"
                  name="passkey"
                  type="password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter passkey"
                  value={passkey}
                  onChange={(e) => setPasskey(e.target.value)}
                />
              </div>
              
              {passkeyError && (
                <div className="text-red-600 text-sm text-center">
                  {passkeyError}
                </div>
              )}

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </AdminLayout>
    );
  }  // Admin creation form
  return (
    <AdminLayout>
      <div className="flex items-center justify-center min-h-full">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Create Admin Account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Fill in the details to create a new admin account
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    formErrors.username ? 'border-red-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Enter username"
                  value={formData.username}
                  onChange={handleChange}
                />
                {formErrors.username && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.username}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    formErrors.email ? 'border-red-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleChange}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    formErrors.password ? 'border-red-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {formErrors.password && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className={`mt-1 appearance-none relative block w-full px-3 py-2 border ${
                    formErrors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                  } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
                  placeholder="Confirm password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
                {formErrors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.confirmPassword}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Create Admin Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
