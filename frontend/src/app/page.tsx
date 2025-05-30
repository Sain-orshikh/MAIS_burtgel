'use client';

import RegistrationForm from '@/components/registration/RegistrationForm';
import RegistrationStatus from '@/components/registration/RegistrationStatus';
import { useState } from 'react';
import Image from 'next/image';
import logoImage from '@/assets/logo.jpg';

export default function Home() {
  const [activeView, setActiveView] = useState<'register' | 'status'>('register');

  return (
    <main className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100'>
      {/* Animated Background Elements - Academic Theme 
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-emerald-600 to-teal-700 rounded-full mix-blend-multiply filter blur-xl opacity-12 animate-pulse animation-delay-2000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-amber-500 to-yellow-600 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000'></div>
        
        <div className='absolute inset-0 opacity-5'>
          <div className='absolute top-20 left-20 w-32 h-32 border-2 border-blue-700 rounded-full'></div>
          <div className='absolute bottom-32 right-32 w-24 h-24 border-2 border-emerald-600 rounded-full'></div>
          <div className='absolute top-1/3 right-1/4 w-16 h-16 border-2 border-amber-600 transform rotate-45'></div>
          <div className='absolute bottom-1/3 left-1/4 w-20 h-20 border-2 border-blue-700 transform rotate-12'></div>
        </div>
      </div>
      */}

      {/* Header Section */}
      <div className='relative z-10 pt-16 pb-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <div className='inline-flex items-center justify-center w-24 h-24 mb-6 shadow-xl rounded-full overflow-hidden bg-white'>
              <Image
                src={logoImage}
                alt="Mongol Aspiration International School Logo"
                width={96}
                height={96}
                className='object-cover w-full h-full'
                priority
              />
            </div>
            <h1 className='text-5xl md:text-6xl font-bold text-slate-800 mb-4 leading-tight'>
              <span className='bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 bg-clip-text text-transparent'>
                Mongol Aspiration
              </span>
            </h1>
            <h2 className='text-2xl md:text-3xl font-semibold text-emerald-700 mb-6'>
              Entry Examination Registration
            </h2>
            {/* Action Buttons */}
            <div className='flex flex-col sm:flex-row justify-center gap-4 mb-6'>
              <button
                onClick={() => setActiveView('register')}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  activeView === 'register'
                    ? 'bg-gradient-to-r from-blue-700 to-indigo-800 text-white shadow-xl'
                    : 'bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white shadow-lg'
                }`}
              >
                <div className='flex items-center justify-center'>
                  <svg className='w-6 h-6 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z' />
                  </svg>
                  Register for Exam
                </div>
              </button>
              <button
                onClick={() => setActiveView('status')}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 ${
                  activeView === 'status'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white shadow-xl'
                    : 'bg-white/90 backdrop-blur-sm text-slate-700 hover:bg-white shadow-lg'
                }`}
              >
                <div className='flex items-center justify-center'>
                  <svg className='w-6 h-6 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z' />
                  </svg>
                  Check Application Status
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form Section */}
      <div className='relative z-10 pb-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden'>
            <div className={`px-8 py-6 ${
              activeView === 'register' 
                ? 'bg-gradient-to-r from-blue-700 to-indigo-800' 
                : 'bg-gradient-to-r from-emerald-600 to-teal-700'
            }`}>
              <h2 className='text-2xl font-bold text-white text-center'>
                {activeView === 'register' ? 'MAIS Entry Examination' : 'Application Status Portal'}
              </h2>
              <p className='text-blue-100 text-center mt-2 font-medium'>
                {activeView === 'register' 
                  ? 'Complete your registration for Mongol Aspiration International School entry examination' 
                  : 'Track your application progress and view examination details'
                }
              </p>
            </div>
            <div className='p-8 bg-gradient-to-b from-slate-50 to-white'>
              {activeView === 'register' ? <RegistrationForm /> : <RegistrationStatus />}
            </div>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20'>
        <div className='flex space-x-3 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg'>
          <div className='w-3 h-3 bg-blue-600 rounded-full animate-pulse'></div>
          <div className='w-3 h-3 bg-emerald-600 rounded-full animate-pulse animation-delay-1000'></div>
          <div className='w-3 h-3 bg-amber-500 rounded-full animate-pulse animation-delay-2000'></div>
        </div>
      </div>
    </main>
  );
}
