import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface ContactItemProps {
  icon: LucideIcon;
  text: ReactNode;
}

export default function ContactItem({ icon: Icon, text }: ContactItemProps) {
  return (
    <div className="flex items-center gap-2 bg-white/80 text-secondary-700 px-4 py-2 rounded-full shadow-sm print:text-sm print:px-3 print:py-1.5">
      <Icon size={18} className="text-primary-400 print:w-4 print:h-4" />
      <span>{text}</span>
    </div>
  );
}