import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Toast } from './Toast';
import { ToastProps, ToastPosition } from './types';

interface ToastContainerProps {
  toasts: ToastProps[];
  position?: ToastPosition;
  onRemove: (id?: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = 'top-right',
  onRemove,
}) => {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 transform -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 transform -translate-x-1/2',
  };

  return (
    <div className={`fixed z-50 ${positionClasses[position]} space-y-2`}>
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={onRemove}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};