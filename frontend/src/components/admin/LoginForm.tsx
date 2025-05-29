'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';

export default function LoginForm() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const router = useRouter();  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Mock authentication for development (since backend isn't functional yet)
    // Sample admin: username: admin, password: admin123
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      // Simulate successful login
      const mockResponse = {
        admin: {
          id: '1',
          username: 'admin',
          email: 'admin@example.com'
        },
        token: 'mock-jwt-token-' + Date.now(),
        message: 'Login successful'
      };
      
      const { setAuth } = useAuthStore.getState();
      setAuth(mockResponse.admin, mockResponse.token);
      router.push('/admin/dashboard');
    } else {
      // Simulate login failure - no alert, just handle silently or show inline error
      console.log('Invalid credentials provided');
    }
    
    // TODO: Replace with actual API call when backend is ready
    /*
    try {
      await login.mutateAsync(credentials);
      router.push('/admin/dashboard');
    } catch (error) {
      // Error handling is managed by TanStack Query
    }
    */
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-md w-full space-y-8'>
        <div>
          <h2 className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
            Admin Login
          </h2>
        </div>
        <form className='mt-8 space-y-6' onSubmit={handleSubmit}>
          <div className='rounded-md shadow-sm -space-y-px'>
            <div>
              <label htmlFor='username' className='sr-only'>
                Username
              </label>
              <input
                id='username'
                name='username'
                type='text'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='Username'
                value={credentials.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor='password' className='sr-only'>
                Password
              </label>
              <input
                id='password'
                name='password'
                type='password'
                required
                className='appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm'
                placeholder='Password'
                value={credentials.password}
                onChange={handleChange}
              />
            </div>
          </div>          <div>
            <button
              type='submit'
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
