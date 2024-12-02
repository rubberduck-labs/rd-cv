import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddLanguageProps {
  onAdd: (language: { name: string; level: string }) => void;
}

export default function AddLanguage({ onAdd }: AddLanguageProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newLanguage, setNewLanguage] = useState({
    name: '',
    level: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newLanguage);
    setNewLanguage({ name: '', level: '' });
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-400 hover:text-primary-500 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        <span>Legg til nytt språk</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Språk
          </label>
          <input
            type="text"
            value={newLanguage.name}
            onChange={(e) => setNewLanguage({ ...newLanguage, name: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nivå
          </label>
          <input
            type="text"
            value={newLanguage.level}
            onChange={(e) => setNewLanguage({ ...newLanguage, level: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={() => setIsAdding(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Avbryt
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-primary-400 text-white rounded-md hover:bg-primary-500"
          >
            Legg til
          </button>
        </div>
      </div>
    </form>
  );
}