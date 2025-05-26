'use client';

import { useRegistrationStore } from '@/store';
import { useState, useRef } from 'react';
import Image from 'next/image';
import showToast from '@/utils/toast';
import { useInputFocus } from '../RegistrationForm';

export default function PaymentStep() {
  const { formData, updateFormData } = useRegistrationStore();
  const { setIsInputFocused } = useInputFocus();
  const [error, setError] = useState('');
  const [preview, setPreview] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');

    if (!file) {
      const errorMessage = 'Please select a file';
      setError(errorMessage);
      // Remove toast notification
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      const errorMessage = 'Please upload a valid image file (JPEG, PNG, or GIF)';
      setError(errorMessage);
      // Remove toast notification
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      const errorMessage = 'File size must be less than 5MB';
      setError(errorMessage);
      // Remove toast notification
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    updateFormData({ paymentConfirmation: file });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsInputFocused(true);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsInputFocused(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (fileInputRef.current) {
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInputRef.current.files = dataTransfer.files;
        const event = new Event('change', { bubbles: true });
        fileInputRef.current.dispatchEvent(event);
      }
    }
  };

  return (
    <div className='p-6 h-full'>
      <h2 className='text-2xl font-semibold mb-6'>Payment Confirmation</h2>
      
      <div
        className={`w-full h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer`}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        {preview ? (
          <div className='relative w-full h-full'>
            <Image
              src={preview}
              alt='Payment confirmation preview'
              fill
              className='object-contain p-2'
            />
          </div>
        ) : (
          <>
            <svg
              className='w-12 h-12 text-gray-400'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 6v6m0 0v6m0-6h6m-6 0H6'
              />
            </svg>
            <p className='mt-2 text-sm text-gray-500'>
              Click or drag and drop to upload payment confirmation
            </p>
            <p className='mt-1 text-xs text-gray-400'>
              Supports: JPEG, PNG, GIF (max 5MB)
            </p>
          </>
        )}
      </div>

      <input
        ref={fileInputRef}
        type='file'
        accept='image/*'
        onChange={handleFileChange}
        onFocus={() => setIsInputFocused(true)}
        onBlur={() => setIsInputFocused(false)}
        className='hidden'
      />

      {error && <p className='mt-2 text-sm text-red-500'>{error}</p>}

      {preview && (
        <button
          onClick={() => {
            setPreview('');
            updateFormData({ paymentConfirmation: undefined });
            if (fileInputRef.current) {
              fileInputRef.current.value = '';
            }
          }}
          className='mt-4 px-4 py-2 text-sm text-red-600 hover:text-red-700'
        >
          Remove image
        </button>
      )}
    </div>
  );
}
