import RegistrationForm from '@/components/registration/RegistrationForm';

export default function Home() {
  return (
    <main className='min-h-screen bg-gray-50 py-12'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-gray-900 mb-4'>
            Registration Form
          </h1>
          <p className='text-lg text-gray-600'>
            Please complete all sections of the registration form
          </p>
        </div>
        <RegistrationForm />
      </div>
    </main>
  );
}
