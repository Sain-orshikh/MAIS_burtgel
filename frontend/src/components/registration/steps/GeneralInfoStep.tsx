'use client';

import { useRegistrationStore } from '@/store';
import { useState } from 'react';
import showToast from '@/utils/toast';
import { useInputFocus } from '../RegistrationForm';

export default function GeneralInfoStep() {
  const { formData, updateFormData } = useRegistrationStore();
  const { setIsInputFocused } = useInputFocus();
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    nationalRegistrationNumber: ''
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? '' : 'Please enter a valid email address';
      case 'phoneNumber':
        const phoneRegex = /^\+?[\d\s-]{8,}$/;
        return phoneRegex.test(value) ? '' : 'Please enter a valid phone number';
      case 'name':
        return value.length >= 2 ? '' : 'Name must be at least 2 characters long';
      case 'nationalRegistrationNumber':
        return value.length >= 4 ? '' : 'Please enter a valid registration number';
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // Remove toast notifications on keystroke
    // Only keeping inline error messages for immediate feedback
    
    updateFormData({ [name]: value });
  };

  return (
    <div className='p-6 h-full'>
      <h2 className='text-2xl font-semibold mb-6'>General Information</h2>
      <div className='space-y-4'>
        <div>
          <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
            Full Name
          </label>
          <input
            type='text'
            id='name'
            name='name'
            value={formData.name || ''}
            onChange={handleChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder='Enter your full name'
          />
          {errors.name && <p className='mt-1 text-sm text-red-500'>{errors.name}</p>}
        </div>

        <div>
          <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
            Email Address
          </label>
          <input
            type='email'
            id='email'
            name='email'
            value={formData.email || ''}
            onChange={handleChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder='Enter your email address'
          />
          {errors.email && <p className='mt-1 text-sm text-red-500'>{errors.email}</p>}
        </div>

        <div>
          <label htmlFor='phoneNumber' className='block text-sm font-medium text-gray-700 mb-1'>
            Phone Number
          </label>
          <input
            type='tel'
            id='phoneNumber'
            name='phoneNumber'
            value={formData.phoneNumber || ''}
            onChange={handleChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder='Enter your phone number'
          />
          {errors.phoneNumber && <p className='mt-1 text-sm text-red-500'>{errors.phoneNumber}</p>}
        </div>

        <div>
          <label htmlFor='nationalRegistrationNumber' className='block text-sm font-medium text-gray-700 mb-1'>
            National Registration Number
          </label>
          <input
            type='text'
            id='nationalRegistrationNumber'
            name='nationalRegistrationNumber'
            value={formData.nationalRegistrationNumber || ''}
            onChange={handleChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder='Enter your national registration number'
          />
          {errors.nationalRegistrationNumber && (
            <p className='mt-1 text-sm text-red-500'>{errors.nationalRegistrationNumber}</p>
          )}
        </div>
      </div>
    </div>
  );
}
