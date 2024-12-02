import { X } from 'lucide-react';
import EditableText from './EditableText';

interface EducationProps {
  institution: string;
  degree: string;
  period: string;
  isEditing?: boolean;
  onUpdate?: (data: Omit<EducationProps, 'isEditing' | 'onUpdate'>) => void;
  onRemove?: () => void;
}

export default function Education({
  institution,
  degree,
  period,
  isEditing = false,
  onUpdate,
  onRemove
}: EducationProps) {
  const handleUpdate = (field: string, value: string) => {
    if (onUpdate) {
      onUpdate({
        institution: field === 'institution' ? value : institution,
        degree: field === 'degree' ? value : degree,
        period: field === 'period' ? value : period
      });
    }
  };

  return (
    <div className="relative group">
      <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100">
        <div className="flex flex-col md:flex-row md:justify-between md:items-baseline gap-2">
          <div>
            <h4 className="text-lg font-semibold text-secondary-900">
              <EditableText
                value={institution}
                onChange={(value) => handleUpdate('institution', value)}
                isEditing={isEditing}
              />
            </h4>
            <p className="text-secondary-600 mt-1">
              <EditableText
                value={degree}
                onChange={(value) => handleUpdate('degree', value)}
                isEditing={isEditing}
              />
            </p>
          </div>
          <span className="bg-primary-50 text-secondary-700 px-4 py-1.5 rounded-full font-medium text-sm whitespace-nowrap">
            <EditableText
              value={period}
              onChange={(value) => handleUpdate('period', value)}
              isEditing={isEditing}
            />
          </span>
        </div>
      </div>
      {isEditing && onRemove && (
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
}