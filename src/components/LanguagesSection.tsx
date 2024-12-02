import Section from './Section';
import LanguageGrid from './LanguageGrid';
import type { ResumeData } from '../hooks/useResumeData';

interface LanguagesSectionProps {
  languages: ResumeData['languages'];
  isEditing: boolean;
  onUpdate: (languages: ResumeData['languages']) => void;
}

export default function LanguagesSection({ languages, isEditing, onUpdate }: LanguagesSectionProps) {
  return (
    <Section title="Språk">
      <LanguageGrid
        languages={languages}
        isEditing={isEditing}
        onUpdate={onUpdate}
      />
    </Section>
  );
}