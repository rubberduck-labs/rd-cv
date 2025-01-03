import React from 'react';
import { Printer } from 'lucide-react';

interface PrintButtonProps {
  onClick: () => void;
  className?: string;
}

export default function PrintButton({ onClick, className = '' }: PrintButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`fixed bottom-8 right-8 bg-primary-400 text-secondary-900 px-6 py-3 rounded-full shadow-lg hover:bg-primary-500 transition-colors flex items-center gap-2 ${className}`}
    >
      <Printer size={20} />
      <span>Last ned PDF</span>
    </button>
  );
}