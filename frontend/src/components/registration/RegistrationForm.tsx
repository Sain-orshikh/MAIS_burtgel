'use client';

import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useRegistrationStore, getStepValidation } from '@/store';
import showToast from '@/utils/toast';
import GeneralInfoStep from './steps/GeneralInfoStep';
import SchoolInfoStep from './steps/SchoolInfoStep';
import PaymentStep from './steps/PaymentStep';
import EssayStep from './steps/EssayStep';

// Context to track input focus state
interface InputFocusContextType {
  isInputFocused: boolean;
  setIsInputFocused: (focused: boolean) => void;
}

const InputFocusContext = createContext<InputFocusContextType>({
  isInputFocused: false,
  setIsInputFocused: () => {},
});

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0
  })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

// Custom hook to access the input focus context
export const useInputFocus = () => useContext(InputFocusContext);

export default function RegistrationForm() {
  const { currentStep, formData, setCurrentStep } = useRegistrationStore();
  const [[page, direction], setPage] = useState([0, 0]);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const paginate = (newDirection: number) => {
    const nextStep = currentStep + newDirection;
    if (nextStep < 1 || nextStep > 4) return;
    
    // Check if current step is valid before proceeding
    if (newDirection > 0 && !getStepValidation(formData, currentStep)) {
      showToast({ 
        message: 'Please fill in all required fields', 
        type: 'error' 
      });
      return;
    }

    setPage([page + newDirection, newDirection]);
    setCurrentStep(nextStep);
    
    // Show success toast when moving forward
    if (newDirection > 0) {
      showToast({ 
        message: 'Successfully saved! Moving to the next step.', 
        type: 'success' 
      });
    }
  };

  const steps = [
    { Component: GeneralInfoStep, title: 'General Information' },
    { Component: SchoolInfoStep, title: 'School Information' },
    { Component: PaymentStep, title: 'Payment Confirmation' },
    { Component: EssayStep, title: 'Essay' }
  ];

  return (
    <InputFocusContext.Provider value={{ isInputFocused, setIsInputFocused }}>
      <div className='w-full max-w-4xl mx-auto p-6'>
        <Toaster position="top-right" />
        <div className='mb-8'>
          <div className='flex justify-between items-center mb-4'>
            {steps.map((step, index) => (
              <div
                key={index}
                className={`flex items-center ${index + 1 <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}
              >
                <div
                  className={`rounded-full h-8 w-8 flex items-center justify-center border-2 ${index + 1 <= currentStep ? 'border-blue-600' : 'border-gray-300'}`}
                >
                  {index + 1 < currentStep ? '' : index + 1}
                </div>
                <span className='ml-2 text-sm hidden md:inline'>{step.title}</span>
                {index < steps.length - 1 && (
                  <div className='h-1 w-12 mx-2 bg-gray-200'></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className='relative h-[600px] overflow-hidden bg-white rounded-xl shadow-lg'>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial='enter'
              animate='center'
              exit='exit'
              transition={{
                x: { type: 'spring', stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              drag={isInputFocused ? false : 'x'}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={1}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = swipePower(offset.x, velocity.x);

                if (swipe < -swipeConfidenceThreshold) {
                  paginate(1);
                } else if (swipe > swipeConfidenceThreshold) {
                  paginate(-1);
                }
              }}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
            >
              {steps[currentStep - 1].Component && React.createElement(steps[currentStep - 1].Component)}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className='mt-8 flex justify-between'>
          <button
            onClick={() => paginate(-1)}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg ${currentStep === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Previous
          </button>
          <button
            onClick={() => paginate(1)}
            disabled={currentStep === 4}
            className={`px-6 py-2 rounded-lg ${currentStep === 4 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
          >
            Next
          </button>
        </div>
        
      </div>
    </InputFocusContext.Provider>
  );
}
