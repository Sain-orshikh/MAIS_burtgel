'use client';

import AdminLayout from '@/components/admin/AdminLayout';
import RegistrationList from '@/components/admin/RegistrationList';

export default function AdminDashboardPage() {
  return (
    <AdminLayout>
      <div className='bg-white shadow rounded-lg p-6'>
        <h1 className='text-2xl font-semibold text-gray-900 mb-6'>
          Registration Applications
        </h1>
        <RegistrationList />
      </div>
    </AdminLayout>
  );
}
