'use client';

import { useRegistrations, useUpdateRegistrationStatus } from '@/hooks/api';
import { User } from '@/types';
import { useState } from 'react';
import { format } from 'date-fns';

export default function RegistrationList() {
  const { data: registrations, isLoading, error } = useRegistrations();
  const updateStatus = useUpdateRegistrationStatus();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  const handleStatusUpdate = async (
    userId: string,
    status: 'approved' | 'rejected'
  ) => {
    try {
      await updateStatus.mutateAsync({
        id: userId,
        status,
        reason: status === 'rejected' ? rejectionReason : undefined,
      });
      setSelectedUser(null);
      setRejectionReason('');
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-64'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='text-center text-red-600 py-8'>
        An error occurred while fetching registrations
      </div>
    );
  }

  return (
    <div className='bg-white shadow overflow-hidden sm:rounded-md'>
      <ul className='divide-y divide-gray-200'>
        {registrations?.map((registration) => (
          <li key={registration.id} className='px-6 py-4 hover:bg-gray-50'>
            <div className='flex items-center justify-between'>
              <div className='flex-1'>
                <div className='flex items-center justify-between'>
                  <p className='text-sm font-medium text-blue-600 truncate'>
                    {registration.name}
                  </p>
                  <div className='ml-2 flex-shrink-0'>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        registration.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : registration.status === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {registration.status.charAt(0).toUpperCase() +
                        registration.status.slice(1)}
                    </span>
                  </div>
                </div>
                <div className='mt-2 sm:flex sm:justify-between'>
                  <div className='sm:flex'>
                    <p className='flex items-center text-sm text-gray-500'>
                      {registration.email}
                    </p>
                    <p className='mt-2 flex items-center text-sm text-gray-500 sm:mt-0 sm:ml-6'>
                      {registration.phoneNumber}
                    </p>
                  </div>
                  <div className='mt-2 flex items-center text-sm text-gray-500 sm:mt-0'>
                    <p>
                      Submitted:{' '}
                      {format(new Date(registration.createdAt), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              </div>

              {registration.status === 'pending' && (
                <div className='ml-4 flex-shrink-0 flex'>
                  <button
                    onClick={() => handleStatusUpdate(registration.id, 'approved')}
                    className='mr-2 bg-green-100 text-green-800 hover:bg-green-200 px-3 py-1 rounded-md text-sm font-medium'
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => setSelectedUser(registration)}
                    className='bg-red-100 text-red-800 hover:bg-red-200 px-3 py-1 rounded-md text-sm font-medium'
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>

      {/* Rejection Modal */}
      {selectedUser && (
        <div className='fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4'>
          <div className='bg-white rounded-lg p-6 max-w-md w-full'>
            <h3 className='text-lg font-medium text-gray-900 mb-4'>
              Reject Registration
            </h3>
            <div className='mb-4'>
              <label
                htmlFor='reason'
                className='block text-sm font-medium text-gray-700 mb-2'
              >
                Reason for rejection
              </label>
              <textarea
                id='reason'
                rows={3}
                className='shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md'
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>
            <div className='flex justify-end space-x-3'>
              <button
                onClick={() => {
                  setSelectedUser(null);
                  setRejectionReason('');
                }}
                className='bg-white text-gray-700 hover:bg-gray-50 px-4 py-2 rounded-md text-sm font-medium'
              >
                Cancel
              </button>
              <button
                onClick={() => selectedUser && handleStatusUpdate(selectedUser.id, 'rejected')}
                className='bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-md text-sm font-medium'
              >
                Confirm Rejection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
