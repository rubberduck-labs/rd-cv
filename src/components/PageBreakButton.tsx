import React from 'react';
import { ArrowDown, X } from 'lucide-react';

interface PageBreakButtonProps {
  hasPageBreak: boolean;
  onToggle: () => void;
}

export default function PageBreakButton({ hasPageBreak, onToggle }: PageBreakButtonProps) {
  return (
    <button
      onClick={onToggle}
      className="page-break-button page-break-control-button p-2 rounded-full bg-primary-400 hover:bg-primary-500 transition-colors"
      title={hasPageBreak ? "Fjern sideskift" : "Legg til sideskift"}
    >
      {hasPageBreak ? (
        <X className="w-4 h-4 text-secondary-900" />
      ) : (
        <ArrowDown className="w-4 h-4 text-secondary-900" />
      )}
    </button>
  );
}