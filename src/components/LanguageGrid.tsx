import React from 'react';
import { X } from 'lucide-react';
import EditableText from './EditableText';
import AddLanguage from './AddLanguage';

interface Language {
  name: string;
  level: string;
}

interface LanguageGridProps {
  languages: Language[];
  isEditing?: boolean;
  onUpdate?: (languages: Language[]) => void;
}

export default function LanguageGrid({ languages, isEditing = false, onUpdate }: LanguageGridProps) {
  const handleUpdate = (index: number, field: keyof Language, value: string) => {
    if (onUpdate) {
      const newLanguages = [...languages];
      newLanguages[index] = {
        ...newLanguages[index],
        [field]: value
      };
      onUpdate(newLanguages);
    }
  };

  const handleRemove = (index: number) => {
    if (onUpdate) {
      const newLanguages = languages.filter((_, i) => i !== index);
      onUpdate(newLanguages);
    }
  };

  const handleAdd = (language: Language) => {
    if (onUpdate) {
      onUpdate([...languages, language]);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {languages.map(({ name, level }, index) => (
        <div 
          key={index} 
          className="relative group flex justify-between items-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-100"
        >
          <span className="text-secondary-800 font-medium">
            <EditableText
              value={name}
              onChange={(value) => handleUpdate(index, 'name', value)}
              isEditing={isEditing}
            />
          </span>
          <span className="bg-primary-50 text-secondary-700 px-4 py-1.5 rounded-full text-sm font-medium">
            <EditableText
              value={level}
              onChange={(value) => handleUpdate(index, 'level', value)}
              isEditing={isEditing}
            />
          </span>
          {isEditing && (
            <button
              onClick={() => handleRemove(index)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X size={16} />
            </button>
          )}
        </div>
      ))}
      {isEditing && (
        <div className="mt-4">
          <AddLanguage onAdd={handleAdd} />
        </div>
      )}
    </div>
  );
}