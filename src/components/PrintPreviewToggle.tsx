import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PrintPreviewToggleProps {
  isPrintPreview: boolean;
  onToggle: () => void;
}

export default function PrintPreviewToggle({ isPrintPreview, onToggle }: PrintPreviewToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="fixed bottom-24 right-8 bg-primary-400 text-secondary-900 p-3 rounded-full shadow-lg hover:bg-primary-500 transition-colors print:hidden"
      title={isPrintPreview ? 'Skjul utskriftsvisning' : 'Vis utskriftsvisning'}
    >
      {isPrintPreview ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  );
}