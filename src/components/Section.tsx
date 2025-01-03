import React, { ReactNode } from 'react';

interface SectionProps {
  title: string;
  children: ReactNode;
  className?: string;
  hasPageBreak?: boolean;
}

export default function Section({ 
  title, 
  children, 
  className = '',
  hasPageBreak = false
}: SectionProps) {
  return (
    <section className={`mb-12 print:mb-8 ${hasPageBreak ? 'page-break-after' : ''} ${className}`}>
      <h3 className="text-xl font-bold text-secondary-900 mb-6">
        {title}
      </h3>
      <div className="space-y-4">
        {children}
      </div>
    </section>
  );
}