import type { ResumeData } from '../hooks/useResumeData';
import { exportToDocx } from '../utils/docxExport';

interface DownloadButtonsProps {
  onPrintPDF: () => void;
  resumeData: ResumeData;
  className?: string;
}

export default function DownloadButtons({ onPrintPDF, resumeData, className = '' }: DownloadButtonsProps) {
  const handleDocxExport = () => {
    exportToDocx(resumeData);
  };

  return (
    <div className={`fixed bottom-8 right-8 flex gap-2 print:hidden ${className}`}>
      <button
        onClick={handleDocxExport}
        className="bg-primary-400 text-secondary-900 p-3 rounded-full shadow-lg hover:bg-primary-500 transition-colors"
        title="Last ned DOCX"
      >
        <span className="font-medium">DOCX</span>
      </button>
      <button
        onClick={onPrintPDF}
        className="bg-primary-400 text-secondary-900 p-3 rounded-full shadow-lg hover:bg-primary-500 transition-colors"
        title="Last ned PDF"
      >
        <span className="font-medium">PDF</span>
      </button>
    </div>
  );
}