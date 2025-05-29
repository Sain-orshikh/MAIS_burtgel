'use client';

// Authentication check removed for development/testing purposes
// import { useAuthCheck } from '@/hooks/api';
// import { useRouter } from 'next/navigation';
// import { useEffect } from 'react';

export default function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // Authentication bypass for development
  // const { isAuthenticated, isLoading } = useAuthCheck();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && !isAuthenticated) {
  //     router.push('/admin/login');
  //   }
  // }, [isAuthenticated, isLoading, router]);
  // Authentication loading state removed
  /*return (
    <div className='flex items-center justify-center min-h-screen'>
      <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
    </div>
  );*/

  // Authentication check removed
  // if (!isAuthenticated) {
  //   return null;
  // }
  return (
    <div className='min-h-screen bg-gray-100'>
      <nav className='bg-white shadow-sm sticky top-0 z-10'>
        <div className='max-w-full mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex justify-between h-16'>
            <div className='flex'>
              <div className='flex-shrink-0 flex items-center'>
                <h1 className='text-xl font-bold text-gray-800'>Admin Panel</h1>
              </div>
            </div>
            <div className='flex items-center'>
              <span className='text-sm text-gray-500'>Admin User</span>
            </div>
          </div>
        </div>
      </nav>

      <main className='max-w-full mx-auto py-6 px-4 sm:px-6 lg:px-8'>
        {children}
      </main>
    </div>
  );
}
