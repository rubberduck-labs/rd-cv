import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface AddExperienceProps {
  onAdd: (experience: {
    title: string;
    period: string;
    description: string;
    technologies: string[];
    roles: string[];
  }) => void;
}

export default function AddExperience({ onAdd }: AddExperienceProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newExperience, setNewExperience] = useState({
    title: '',
    period: '',
    description: '',
    technologies: [] as string[],
    roles: [] as string[]
  });
  const [newTech, setNewTech] = useState('');
  const [newRole, setNewRole] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newExperience);
    setNewExperience({
      title: '',
      period: '',
      description: '',
      technologies: [],
      roles: []
    });
    setIsAdding(false);
  };

  const handleAddTech = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTech.trim()) {
      setNewExperience({
        ...newExperience,
        technologies: [...newExperience.technologies, newTech.trim()]
      });
      setNewTech('');
    }
  };

  const handleAddRole = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newRole.trim()) {
      setNewExperience({
        ...newExperience,
        roles: [...newExperience.roles, newRole.trim()]
      });
      setNewRole('');
    }
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setIsAdding(true)}
        className="w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-primary-400 hover:text-primary-500 transition-colors flex items-center justify-center gap-2"
      >
        <Plus size={20} />
        <span>Legg til ny erfaring</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tittel
          </label>
          <input
            type="text"
            value={newExperience.title}
            onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
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
            value={newExperience.period}
            onChange={(e) => setNewExperience({ ...newExperience, period: e.target.value })}
            className="w-full p-2 border rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Beskrivelse
          </label>
          <textarea
            value={newExperience.description}
            onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
            className="w-full p-2 border rounded-md"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Roller
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {newExperience.roles.map((role) => (
              <span
                key={role}
                className="px-3 py-1 bg-secondary-50 text-secondary-700 rounded-full text-sm font-medium"
              >
                {role}
              </span>
            ))}
          </div>
          <input
            type="text"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            onKeyDown={handleAddRole}
            placeholder="Trykk Enter for å legge til rolle"
            className="w-full p-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teknologier
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {newExperience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-primary-50 text-secondary-700 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
          <input
            type="text"
            value={newTech}
            onChange={(e) => setNewTech(e.target.value)}
            onKeyDown={handleAddTech}
            placeholder="Trykk Enter for å legge til teknologi"
            className="w-full p-2 border rounded-md"
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