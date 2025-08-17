'use client';

import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-black bg-opacity-80"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl p-10 max-w-2xl w-[90%] max-h-[90vh] overflow-y-auto">
        {children}
      </div>
    </div>
  );
}