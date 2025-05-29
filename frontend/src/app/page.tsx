import RegistrationForm from '@/components/registration/RegistrationForm';

export default function Home() {
  return (
    <main className='min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'>
      {/* Animated Background Elements */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse'></div>
        <div className='absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000'></div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000'></div>
      </div>

      {/* Header Section */}
      <div className='relative z-10 pt-16 pb-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='text-center'>
            <div className='inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mb-6 shadow-lg'>
              <svg className='w-8 h-8 text-white' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' />
              </svg>
            </div>
            <h1 className='text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight'>
              <span className='bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent'>
                Student Registration
              </span>
            </h1>
            <p className='text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed'>
              Begin your academic journey with us. Complete the registration process to secure your place in our institution.
            </p>
            
            {/* Feature highlights */}
            <div className='flex flex-wrap justify-center gap-6 mb-12'>
              <div className='flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm'>
                <svg className='w-5 h-5 text-green-500 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clipRule='evenodd' />
                </svg>
                <span className='text-sm font-medium text-gray-700'>Quick & Easy</span>
              </div>
              <div className='flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm'>
                <svg className='w-5 h-5 text-blue-500 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z' clipRule='evenodd' />
                </svg>
                <span className='text-sm font-medium text-gray-700'>Secure</span>
              </div>
              <div className='flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm'>
                <svg className='w-5 h-5 text-purple-500 mr-2' fill='currentColor' viewBox='0 0 20 20'>
                  <path fillRule='evenodd' d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z' clipRule='evenodd' />
                </svg>
                <span className='text-sm font-medium text-gray-700'>Instant Confirmation</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Registration Form Section */}
      <div className='relative z-10 pb-16'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden'>
            <div className='bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6'>
              <h2 className='text-2xl font-bold text-white text-center'>
                Registration Form
              </h2>
              <p className='text-blue-100 text-center mt-2'>
                Please fill out all required information
              </p>
            </div>
            <div className='p-8'>
              <RegistrationForm />
            </div>
          </div>
        </div>
      </div>

      {/* Progress indicator dots */}
      <div className='fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20'>
        <div className='flex space-x-2'>
          <div className='w-2 h-2 bg-blue-400 rounded-full animate-pulse'></div>
          <div className='w-2 h-2 bg-indigo-400 rounded-full animate-pulse animation-delay-1000'></div>
          <div className='w-2 h-2 bg-purple-400 rounded-full animate-pulse animation-delay-2000'></div>
        </div>
      </div>
    </main>
  );
}
