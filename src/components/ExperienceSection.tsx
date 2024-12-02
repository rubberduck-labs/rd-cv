import ExperienceItem from './ExperienceItem';
import AddExperience from './AddExperience';

interface Experience {
  title: string;
  period: string;
  description: string;
  technologies: string[];
  roles?: string[];
}

interface ExperienceSectionProps {
  experiences: Experience[];
  isEditing: boolean;
  onUpdate: (experiences: Experience[]) => void;
  pageBreaks?: Set<number>;
  onTogglePageBreak?: (index: number) => void;
}

export default function ExperienceSection({
  experiences,
  isEditing,
  onUpdate,
  pageBreaks = new Set(),
  onTogglePageBreak
}: ExperienceSectionProps) {
  const handleAddExperience = async (newExperience: Experience) => {
    const updatedExperiences = [...experiences, newExperience];
    onUpdate(updatedExperiences);
  };

  const handleUpdateExperience = async (index: number, updatedExperience: Experience) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[index] = updatedExperience;
    onUpdate(updatedExperiences);
  };

  const handleRemoveExperience = async (index: number) => {
    const updatedExperiences = experiences.filter((_, i) => i !== index);
    onUpdate(updatedExperiences);
  };

  return (
    <div className="space-y-6">
      {experiences.map((exp, index) => (
        <div
          key={index}
          className={pageBreaks.has(index) ? 'page-break-start' : ''}
        >
          <ExperienceItem
            {...exp}
            isEditing={isEditing}
            onUpdate={(updatedExp) => handleUpdateExperience(index, updatedExp)}
            onRemove={() => handleRemoveExperience(index)}
            hasPageBreak={pageBreaks.has(index)}
            onTogglePageBreak={onTogglePageBreak ? () => onTogglePageBreak(index) : undefined}
          />
        </div>
      ))}
      {isEditing && (
        <div className="mt-6 print:hidden">
          <AddExperience onAdd={handleAddExperience} />
        </div>
      )}
    </div>
  );
}