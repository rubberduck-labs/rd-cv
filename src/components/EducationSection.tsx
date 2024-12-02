import Section from './Section';
import Education from './Education';
import type { ResumeData } from '../hooks/useResumeData';

interface EducationSectionProps {
  education: ResumeData['education'];
  isEditing: boolean;
  onUpdate: (education: ResumeData['education']) => void;
}

export default function EducationSection({ education, isEditing, onUpdate }: EducationSectionProps) {
  const handleUpdate = (index: number, updatedEdu: typeof education[0]) => {
    const newEducation = [...education];
    newEducation[index] = updatedEdu;
    onUpdate(newEducation);
  };

  const handleRemove = (index: number) => {
    const newEducation = education.filter((_, i) => i !== index);
    onUpdate(newEducation);
  };

  return (
    <Section title="Utdanning">
      <div className="space-y-4">
        {education.map((edu, index) => (
          <Education
            key={index}
            {...edu}
            isEditing={isEditing}
            onUpdate={(updatedEdu) => handleUpdate(index, updatedEdu)}
            onRemove={() => handleRemove(index)}
          />
        ))}
      </div>
    </Section>
  );
}