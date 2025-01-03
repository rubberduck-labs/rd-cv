import React from 'react';
import { Plus, Trash } from 'lucide-react';
import EditableText from './EditableText';

interface SummaryProps {
  paragraphs: string[];
  isEditing?: boolean;
  onUpdate?: (paragraphs: string[]) => void;
}

export default function Summary({ paragraphs, isEditing = false, onUpdate }: SummaryProps) {
  const handleUpdate = (index: number, value: string) => {
    if (onUpdate) {
      const newParagraphs = [...paragraphs];
      newParagraphs[index] = value;
      onUpdate(newParagraphs);
    }
  };

  const handleAddParagraph = () => {
    if (onUpdate) {
      onUpdate([...paragraphs, '']);
    }
  };

  const handleRemoveParagraph = (index: number) => {
    if (onUpdate) {
      const newParagraphs = paragraphs.filter((_, i) => i !== index);
      onUpdate(newParagraphs);
    }
  };

  return (
    <div className="prose prose-blue max-w-none">
      {paragraphs.map((paragraph, index) => (
        <div key={index} className="relative group mb-4 last:mb-0">
          <div className="text-gray-600 leading-relaxed">
            <EditableText
              value={paragraph}
              onChange={(value) => handleUpdate(index, value)}
              isEditing={isEditing}
              multiline
            />
          </div>
          {isEditing && paragraphs.length > 1 && (
            <button
              onClick={() => handleRemoveParagraph(index)}
              className="absolute -right-8 top-0 p-1 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              title="Slett avsnitt"
            >
              <Trash size={16} />
            </button>
          )}
        </div>
      ))}
      {isEditing && (
        <button
          onClick={handleAddParagraph}
          className="mt-4 flex items-center gap-2 text-primary-500 hover:text-primary-600 transition-colors"
        >
          <Plus size={16} />
          <span>Legg til avsnitt</span>
        </button>
      )}
    </div>
  );
}