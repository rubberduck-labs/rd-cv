import React, { useState, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onChange: (value: string) => void;
  isEditing: boolean;
  multiline?: boolean;
  className?: string;
}

export default function EditableText({
  value,
  onChange,
  isEditing,
  multiline = false,
  className = ''
}: EditableTextProps) {
  const [editValue, setEditValue] = useState(value);
  
  useEffect(() => {
    setEditValue(value);
  }, [value]);

  if (!isEditing) {
    return multiline ? (
      <div className={`whitespace-pre-wrap ${className}`}>{value}</div>
    ) : (
      <span className={className}>{value}</span>
    );
  }

  const handleSave = () => {
    onChange(editValue);
  };

  const handleCancel = () => {
    setEditValue(value);
  };

  return (
    multiline ? (
      <textarea
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        className="w-full p-2 border rounded-md"
        rows={4}
        onBlur={handleSave}
      />
    ) : (
      <input
        type="text"
        value={editValue}
        onChange={(e) => setEditValue(e.target.value)}
        className="w-full p-2 border rounded-md"
        onBlur={handleSave}
      />
    )
  );
}