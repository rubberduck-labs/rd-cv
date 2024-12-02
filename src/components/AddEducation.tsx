import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddEducationProps {
  onAdd: (education: { institution: string; degree: string; period: string }) => void;
}

export default function AddEducation({ onAdd }: AddEducationProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    period: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newEducation);
    setNewEducation({ institution: '', degree: '', period: '' });
    setIsAdding(false);
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-400 hover:text-primary-500 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        <span>Legg til ny utdanning</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Institusjon
          </label>
          <input
            type="text"
            value={newEducation.institution}
            onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Grad
          </label>
          <input
            type="text"
            value={newEducation.degree}
            onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Periode
          </label>
          <input
            type="text"
            value={newEducation.period}
            onChange={(e) => setNewEducation({ ...newEducation, period: e.target.value })}
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