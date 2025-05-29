'use client';

import { useState } from 'react';

interface UserRegistration {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  nationality: string;
  currentSchool: string;
  gradeLevel: string;
  subjects: string[];
  status: 'pending' | 'approved' | 'rejected';
  submittedAt: string;
  examLocation: string;
  examDate: string;
  examTime: string;
  examRoom: string;
}

export default function RegistrationStatus() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchType, setSearchType] = useState<'email' | 'id'>('email');
  const [registration, setRegistration] = useState<UserRegistration | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Please enter your email or registration ID');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // TODO: Replace with actual API call
      // For now, using mock data
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const mockRegistration: UserRegistration = {
        id: 'REG-2024-001',
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '+1234567890',
        dateOfBirth: '2005-06-15',
        nationality: 'American',
        currentSchool: 'Springfield High School',
        gradeLevel: '12th Grade',
        subjects: ['Mathematics', 'Physics', 'Chemistry'],
        status: 'approved',
        submittedAt: '2024-12-15T10:30:00Z',
        examLocation: 'Main Campus Building A',
        examDate: '2025-01-15',
        examTime: '09:00 AM',
        examRoom: 'Room 205'
      };
      
      setRegistration(mockRegistration);
    } catch (err) {
      setError('Failed to fetch registration details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';      case 'rejected':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className='max-w-4xl mx-auto'>
      {/* Search Section */}
      <div className='mb-8'>
        <div className='bg-gray-50 rounded-xl p-6'>
          <h3 className='text-lg font-semibold text-gray-900 mb-4'>
            Search Your Registration
          </h3>
          
          <div className='flex flex-col sm:flex-row gap-4'>
            <div className='flex-1'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Search by:
              </label>
              <select
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'email' | 'id')}                className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent'
              >
                <option value='email'>Email Address</option>
                <option value='id'>Registration ID</option>
              </select>
            </div>
            
            <div className='flex-2'>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                {searchType === 'email' ? 'Email Address' : 'Registration ID'}
              </label>
              <input
                type={searchType === 'email' ? 'email' : 'text'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={searchType === 'email' ? 'Enter your email' : 'Enter registration ID'}                className='w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent'
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>            <div className='flex items-end'>
              <button
                onClick={handleSearch}
                disabled={loading}
                className='px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-lg hover:from-emerald-700 hover:to-teal-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50'
              >
                {loading ? (
                  <div className='flex items-center'>
                    <svg className='animate-spin -ml-1 mr-2 h-4 w-4 text-white' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
                      <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4'></circle>
                      <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'></path>
                    </svg>
                    Searching...
                  </div>
                ) : (
                  'Search'
                )}
              </button>
            </div>
          </div>
            {error && (
            <div className='mt-4 p-3 bg-orange-100 border border-orange-400 text-orange-700 rounded-lg'>
              {error}
            </div>
          )}
        </div>
      </div>

      {/* Registration Details */}
      {registration && (
        <div className='space-y-6'>
          {/* Status Overview */}
          <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-200'>
            <div className='flex items-center justify-between mb-4'>
              <h3 className='text-xl font-semibold text-gray-900'>
                Registration Overview
              </h3>
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(registration.status)}`}>
                {registration.status.charAt(0).toUpperCase() + registration.status.slice(1)}
              </span>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <p className='text-sm text-gray-600'>Registration ID</p>
                <p className='font-semibold text-gray-900'>{registration.id}</p>
              </div>
              <div>
                <p className='text-sm text-gray-600'>Submitted On</p>
                <p className='font-semibold text-gray-900'>{formatDate(registration.submittedAt)}</p>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-200'>
            <h3 className='text-xl font-semibold text-gray-900 mb-4'>
              Personal Information
            </h3>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <p className='text-sm text-gray-600'>Full Name</p>
                <p className='font-semibold text-gray-900'>{registration.firstName} {registration.lastName}</p>
              </div>
              <div>
                <p className='text-sm text-gray-600'>Email</p>
                <p className='font-semibold text-gray-900'>{registration.email}</p>
              </div>
              <div>
                <p className='text-sm text-gray-600'>Phone</p>
                <p className='font-semibold text-gray-900'>{registration.phone}</p>
              </div>
              <div>
                <p className='text-sm text-gray-600'>Date of Birth</p>
                <p className='font-semibold text-gray-900'>{formatDate(registration.dateOfBirth)}</p>
              </div>
              <div>
                <p className='text-sm text-gray-600'>Nationality</p>
                <p className='font-semibold text-gray-900'>{registration.nationality}</p>
              </div>
            </div>
          </div>

          {/* Academic Information */}
          <div className='bg-white rounded-xl shadow-lg p-6 border border-gray-200'>
            <h3 className='text-xl font-semibold text-gray-900 mb-4'>
              Academic Information
            </h3>
            
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div>
                <p className='text-sm text-gray-600'>Current School</p>
                <p className='font-semibold text-gray-900'>{registration.currentSchool}</p>
              </div>
              <div>
                <p className='text-sm text-gray-600'>Grade Level</p>
                <p className='font-semibold text-gray-900'>{registration.gradeLevel}</p>
              </div>
              <div className='md:col-span-2'>
                <p className='text-sm text-gray-600'>Selected Subjects</p>
                <div className='flex flex-wrap gap-2 mt-2'>
                  {registration.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className='px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium'
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Exam Information */}
          {registration.status === 'approved' && (
            <div className='bg-gradient-to-r from-green-50 to-blue-50 rounded-xl shadow-lg p-6 border border-green-200'>
              <div className='flex items-center mb-4'>
                <svg className='w-6 h-6 text-green-600 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                  <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' />
                </svg>
                <h3 className='text-xl font-semibold text-gray-900'>
                  Exam Details
                </h3>
              </div>
              
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <div className='bg-white rounded-lg p-4 shadow-sm'>
                  <div className='flex items-center mb-2'>
                    <svg className='w-5 h-5 text-blue-600 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M8 7V3a4 4 0 118 0v4m-4 6V9m0 8h.01M3 21h18a2 2 0 002-2V9a2 2 0 00-2-2H3a2 2 0 00-2 2v10a2 2 0 002 2z' />
                    </svg>
                    <p className='text-sm text-gray-600'>Date</p>
                  </div>
                  <p className='font-semibold text-gray-900'>{formatDate(registration.examDate)}</p>
                </div>
                
                <div className='bg-white rounded-lg p-4 shadow-sm'>
                  <div className='flex items-center mb-2'>
                    <svg className='w-5 h-5 text-purple-600 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                    </svg>
                    <p className='text-sm text-gray-600'>Time</p>
                  </div>
                  <p className='font-semibold text-gray-900'>{registration.examTime}</p>
                </div>
                
                <div className='bg-white rounded-lg p-4 shadow-sm'>
                  <div className='flex items-center mb-2'>
                    <svg className='w-5 h-5 text-orange-600 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' />
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M15 11a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>
                    <p className='text-sm text-gray-600'>Location</p>
                  </div>
                  <p className='font-semibold text-gray-900'>{registration.examLocation}</p>
                </div>
                
                <div className='bg-white rounded-lg p-4 shadow-sm'>
                  <div className='flex items-center mb-2'>
                    <svg className='w-5 h-5 text-green-600 mr-2' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                      <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4' />
                    </svg>
                    <p className='text-sm text-gray-600'>Room</p>
                  </div>
                  <p className='font-semibold text-gray-900'>{registration.examRoom}</p>
                </div>
              </div>

              <div className='mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200'>
                <div className='flex items-start'>
                  <svg className='w-5 h-5 text-blue-600 mr-2 mt-0.5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' />
                  </svg>
                  <div>
                    <p className='text-sm font-semibold text-blue-800 mb-1'>Important Instructions:</p>
                    <ul className='text-sm text-blue-700 space-y-1'>
                      <li>• Arrive 30 minutes before the exam time</li>
                      <li>• Bring a valid photo ID and this registration confirmation</li>
                      <li>• No electronic devices allowed in the exam room</li>
                      <li>• Contact support if you need to reschedule</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}          {/* Action Buttons */}
          <div className='flex flex-col sm:flex-row gap-4 justify-center'>
            <button className='px-6 py-3 bg-gradient-to-r from-blue-700 to-indigo-800 text-white rounded-lg hover:from-blue-800 hover:to-indigo-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200'>
              Download PDF
            </button>
            <button className='px-6 py-3 bg-gradient-to-r from-slate-600 to-slate-700 text-white rounded-lg hover:from-slate-700 hover:to-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-all duration-200'>
              Print Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
