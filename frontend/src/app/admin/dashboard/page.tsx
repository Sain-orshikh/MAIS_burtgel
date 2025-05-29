'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import AdminLayout from '@/components/admin/AdminLayout';
import UserDataGrid from '@/components/admin/UserDataGrid';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // If not authenticated, redirect to login
    if (!isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  // If not authenticated, show loading while redirecting
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting to login...</p>
        </div>
      </div>
    );
  }

  const handleStatusChange = (
    userId: string, 
    status: 'approved' | 'rejected', 
    reason?: string
  ) => {
    // Handle status change here - could send to API
    console.log(`User ${userId} status changed to ${status}`, reason ? `Reason: ${reason}` : '');
  };
  
  return (
    <AdminLayout>
      <UserDataGrid onStatusChange={handleStatusChange} />
    </AdminLayout>
  );
}
