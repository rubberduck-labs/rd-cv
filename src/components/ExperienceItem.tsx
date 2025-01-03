import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import TechBadge from './TechBadge';
import RoleBadge from './RoleBadge';
import EditableText from './EditableText';
import PageBreakButton from './PageBreakButton';

interface ExperienceItemProps {
  title: string;
  period: string;
  description: string;
  technologies: string[];
  roles?: string[];
  isEditing?: boolean;
  onUpdate?: (data: Omit<ExperienceItemProps, 'isEditing' | 'onUpdate' | 'onRemove' | 'hasPageBreak' | 'onTogglePageBreak'>) => void;
  onRemove?: () => void;
  hasPageBreak?: boolean;
  onTogglePageBreak?: () => void;
}

export default function ExperienceItem({
  title,
  period,
  description,
  technologies,
  roles = [],
  isEditing = false,
  onUpdate,
  onRemove,
  hasPageBreak = false,
  onTogglePageBreak
}: ExperienceItemProps) {
  const [newTag, setNewTag] = useState('');
  const [newRole, setNewRole] = useState('');

  const handleUpdate = (field: string, value: string | string[]) => {
    if (onUpdate) {
      onUpdate({
        title: field === 'title' ? value as string : title,
        period: field === 'period' ? value as string : period,
        description: field === 'description' ? value as string : description,
        technologies: field === 'technologies' ? value as string[] : technologies,
        roles: field === 'roles' ? value as string[] : roles
      });
    }
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      handleUpdate('technologies', [...technologies, newTag.trim()]);
      setNewTag('');
    }
  };

  const handleAddRole = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newRole.trim()) {
      handleUpdate('roles', [...roles, newRole.trim()]);
      setNewRole('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleUpdate('technologies', technologies.filter(tag => tag !== tagToRemove));
  };

  const handleRemoveRole = (roleToRemove: string) => {
    handleUpdate('roles', roles.filter(role => role !== roleToRemove));
  };

  return (
    <div className={`experience-item relative group no-break ${hasPageBreak ? 'page-break-start' : ''}`}>
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex flex-row justify-between items-baseline gap-4 mb-4">
          <h4 className="text-lg font-semibold text-secondary-900">
            <EditableText
              value={title}
              onChange={(value) => handleUpdate('title', value)}
              isEditing={isEditing}
            />
          </h4>
          <span className="bg-primary-50 text-secondary-700 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap">
            <EditableText
              value={period}
              onChange={(value) => handleUpdate('period', value)}
              isEditing={isEditing}
            />
          </span>
        </div>
        
        {(roles.length > 0 || isEditing) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {roles.map((role) => (
              <div key={role} className="relative group">
                <RoleBadge role={role} />
                {isEditing && (
                  <button
                    onClick={() => handleRemoveRole(role)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X size={12} />
                  </button>
                )}
              </div>
            ))}
            {isEditing && (
              <div className="relative">
                <input
                  type="text"
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value)}
                  onKeyDown={handleAddRole}
                  placeholder="Legg til rolle..."
                  className="px-3 py-1 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-secondary-400"
                />
                <Plus 
                  size={16} 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                />
              </div>
            )}
          </div>
        )}

        <div className="text-secondary-600 mb-6 leading-relaxed">
          <EditableText
            value={description}
            onChange={(value) => handleUpdate('description', value)}
            isEditing={isEditing}
            multiline
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <div key={tech} className="relative group">
              <TechBadge tech={tech} />
              {isEditing && (
                <button
                  onClick={() => handleRemoveTag(tech)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              )}
            </div>
          ))}
          {isEditing && (
            <div className="relative">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Legg til teknologi..."
                className="px-3 py-1 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-400"
              />
              <Plus 
                size={16} 
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
          )}
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
      {isEditing && onTogglePageBreak && (
        <PageBreakButton
          hasPageBreak={hasPageBreak}
          onToggle={onTogglePageBreak}
        />
      )}
    </div>
  );
}