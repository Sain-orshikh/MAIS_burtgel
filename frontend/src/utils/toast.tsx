'use client';

import toast from 'react-hot-toast';

interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info';
}

export const showToast = ({ message, type }: ToastProps) => {
  // Set background color based on toast type
  const bgColor = type === 'success' 
    ? 'bg-green-500' 
    : type === 'error' 
      ? 'bg-red-500' 
      : 'bg-blue-500';
  
  return toast.custom((t) => (
    <div
      className={`${
        t.visible ? 'animate-enter' : 'animate-leave'
      } max-w-md w-full ${bgColor} shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-opacity-20`}
    >
      <div className="flex-1 w-0 p-4">
        <div className="flex items-start">
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium text-white">
              {message}
            </p>
          </div>
        </div>
      </div>
      <div>
        <button
          onClick={() => toast.dismiss(t.id)}
          className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-white hover:text-gray-200 focus:outline-none"
        >
          Close
        </button>
      </div>
    </div>
  ), {
    duration: type === 'success' ? 2000 : 3000,
    position: type === 'success' ? 'bottom-center' : 'top-center',
  });
};

export default showToast;
