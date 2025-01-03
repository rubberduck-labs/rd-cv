import React, { forwardRef, ReactNode } from 'react';

interface PrintWrapperProps {
  children: ReactNode;
  isEditing?: boolean;
}

const PrintWrapper = forwardRef<HTMLDivElement, PrintWrapperProps>(
  ({ children, isEditing = false }, ref) => {
    return (
      <div 
        ref={ref} 
        className="min-h-screen bg-gray-50"
        data-editing={isEditing}
      >
        {children}
      </div>
    );
  }
);

PrintWrapper.displayName = 'PrintWrapper';

export default PrintWrapper;