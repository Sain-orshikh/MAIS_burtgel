'use client';

import { useRegistrationStore } from '@/store';
import { useState, useEffect } from 'react';
import showToast from '@/utils/toast';
import { useInputFocus } from '../RegistrationForm';

export default function EssayStep() {
  const { formData, updateFormData } = useRegistrationStore();
  const { setIsInputFocused } = useInputFocus();
  const [error, setError] = useState('');
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    setCharCount(formData.essay?.length || 0);
  }, [formData.essay]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setError('');

    if (value.length > 5000) {
      const errorMessage = 'Essay cannot exceed 5000 characters';
      setError(errorMessage);
      // Remove toast notification
      return;
    }

    if (value.length < 100) {
      const errorMessage = 'Essay must be at least 100 characters long';
      setError(errorMessage);
      // Remove toast notification
    }

    updateFormData({ essay: value });
    setCharCount(value.length);
  };

  const getCharCountColor = () => {
    if (charCount < 100) return 'text-red-500';
    if (charCount > 4900) return 'text-yellow-500';
    return 'text-green-500';
  };

  return (
    <div className='p-6 h-full flex flex-col'>
      <h2 className='text-2xl font-semibold mb-6'>Essay</h2>
      
      <div className='flex-grow flex flex-col'>
        <label htmlFor='essay' className='block text-sm font-medium text-gray-700 mb-1'>
          Write your essay
          <span className='text-gray-500 ml-2'>(100-5000 characters)</span>
        </label>
        
        <textarea
          id='essay'
          value={formData.essay || ''}
          onChange={handleChange}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
          className={`flex-grow w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none`}
          placeholder='Write your essay here...'
        />

        <div className='mt-2 flex justify-between items-center'>
          <div>
            {error && <p className='text-sm text-red-500'>{error}</p>}
          </div>
          <div className={`text-sm ${getCharCountColor()}`}>
            {charCount}/5000 characters
          </div>
        </div>

        <div className='mt-4'>
          <h3 className='text-sm font-medium text-gray-700 mb-2'>Essay Guidelines:</h3>
          <ul className='list-disc list-inside text-sm text-gray-600 space-y-1'>
            <li>Minimum 100 characters required</li>
            <li>Maximum 5000 characters allowed</li>
            <li>Be clear and concise in your writing</li>
            <li>Check your spelling and grammar</li>
            <li>Ensure your essay addresses the prompt</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
