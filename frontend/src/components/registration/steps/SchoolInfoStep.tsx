'use client';

import { useRegistrationStore } from '@/store';
import { useState } from 'react';
import showToast from '@/utils/toast';
import { useInputFocus } from '../RegistrationForm';

export default function SchoolInfoStep() {
  const { formData, updateFormData } = useRegistrationStore();
  const { setIsInputFocused } = useInputFocus();
  const [errors, setErrors] = useState({
    schoolName: '',
    averageGrade: ''
  });

  const validateField = (name: string, value: string | number) => {
    switch (name) {
      case 'schoolName':
        return value.toString().length >= 2 ? '' : 'School name must be at least 2 characters long';
      case 'averageGrade':
        const grade = Number(value);
        if (isNaN(grade)) return 'Grade must be a number';
        if (grade < 0 || grade > 100) return 'Grade must be between 0 and 100';
        return '';
      default:
        return '';
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setErrors(prev => ({
      ...prev,
      [name]: error
    }));

    // Remove toast notifications on keystroke
    // Only keeping inline error messages for immediate feedback

    // Make sure we always have both name and averageGrade in the school object
    if (name === 'schoolName') {
      updateFormData({
        school: {
          ...formData.school,
          name: value,
          averageGrade: formData.school?.averageGrade || 0
        }
      });
    } else if (name === 'averageGrade') {
      updateFormData({
        school: {
          ...formData.school,
          averageGrade: Number(value),
          name: formData.school?.name || ''
        }
      });
    }
  };

  return (
    <div className='p-6 h-full'>
      <h2 className='text-2xl font-semibold mb-6'>School Information</h2>
      <div className='space-y-4'>
        <div>
          <label htmlFor='schoolName' className='block text-sm font-medium text-gray-700 mb-1'>
            School Name
          </label>
          <input
            type='text'
            id='schoolName'
            name='schoolName'
            value={formData.school?.name || ''}
            onChange={handleChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder='Enter your school name'
          />
          {errors.schoolName && <p className='mt-1 text-sm text-red-500'>{errors.schoolName}</p>}
        </div>

        <div>
          <label htmlFor='averageGrade' className='block text-sm font-medium text-gray-700 mb-1'>
            Average Grade
          </label>
          <input
            type='number'
            id='averageGrade'
            name='averageGrade'
            min='0'
            max='100'
            step='0.01'
            value={formData.school?.averageGrade || ''}
            onChange={handleChange}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
            placeholder='Enter your average grade'
          />
          {errors.averageGrade && <p className='mt-1 text-sm text-red-500'>{errors.averageGrade}</p>}
          <p className='mt-1 text-sm text-gray-500'>Enter a number between 0 and 100</p>
        </div>
      </div>
    </div>
  );
}
