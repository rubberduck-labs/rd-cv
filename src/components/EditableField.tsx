import  { useState, useEffect } from 'react';

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  label?: string;
}

export default function EditableField({
  value,
  onChange,
  multiline = false,
  label
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  const handleSave = () => {
    onChange(currentValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-secondary-700 mb-1">
            {label}
          </label>
        )}
        {multiline ? (
          <textarea
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="w-full p-2 border rounded-md"
            rows={4}
          />
        ) : (
          <input
            type="text"
            value={currentValue}
            onChange={(e) => setCurrentValue(e.target.value)}
            className="w-full p-2 border rounded-md"
          />
        )}
        <div className="mt-2 space-x-2">
          <button
            onClick={handleSave}
            className="px-3 py-1 bg-primary-400 text-white rounded-md"
          >
            Lagre
          </button>
          <button
            onClick={() => {
              setCurrentValue(value);
              setIsEditing(false);
            }}
            className="px-3 py-1 bg-gray-200 rounded-md"
          >
            Avbryt
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer hover:bg-primary-50 p-2 rounded-md transition-colors"
    >
      {label && (
        <div className="text-sm font-medium text-secondary-700 mb-1">
          {label}
        </div>
      )}
      {multiline ? (
        <div className="whitespace-pre-wrap">{value}</div>
      ) : (
        <div>{value}</div>
      )}
    </div>
  );
}