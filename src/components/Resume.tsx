import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import Header from './Header';
import Section from './Section';
import Summary from './Summary';
import DocumentTitle from './DocumentTitle';
import EditToggle from './EditToggle';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import LanguagesSection from './LanguagesSection';
import PrintWrapper from './PrintWrapper';
import DownloadButtons from './DownloadButtons';
import { useResumeData } from '../hooks/useResumeData';
import { useExperiencePageBreaks } from '../hooks/useExperiencePageBreaks';

interface ResumeProps {
  email: string;
}

export default function Resume({ email }: ResumeProps) {
  const {
    resumeData,
    isEditing,
    isSaving,
    setIsEditing,
    updateResume
  } = useResumeData(email);

  const { pageBreaks, togglePageBreak } = useExperiencePageBreaks();
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `cv-rubberduck-${resumeData?.personal.name.toLowerCase().replace(/\s+/g, '-')}`,
  });

  if (!resumeData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  const handleUpdate = (newData: typeof resumeData) => {
    updateResume(newData);
  };

  return (
    <>
      <DocumentTitle name={resumeData.personal.name} />
      <PrintWrapper ref={componentRef} isEditing={isEditing}>
        <div className="max-w-5xl mx-auto shadow-xl print:shadow-none">
          <Header
            {...resumeData.personal}
            isEditing={isEditing}
            onUpdate={(personal) => handleUpdate({ ...resumeData, personal })}
          />

          <div className="content-wrapper bg-white mx-auto px-8 md:px-12 print:px-0 py-12">
             <Section
                title="Sammendrag"
                className="summary-section"
                hasPageBreak={true}
              >
                <Summary
                  paragraphs={resumeData.summary}
                  isEditing={isEditing}
                  onUpdate={(summary) => handleUpdate({ ...resumeData, summary })}
                />
              </Section>

              <Section
                title="Erfaring"
                className="experience-section"
                hasPageBreak={false}
              >
                <ExperienceSection
                  experiences={resumeData.experience}
                  isEditing={isEditing}
                  onUpdate={(experience) => handleUpdate({ ...resumeData, experience })}
                  pageBreaks={pageBreaks}
                  onTogglePageBreak={togglePageBreak}
                />
              </Section>

              <div className="education-languages-section grid grid-cols-1 gap-8 no-break">
                <EducationSection
                  education={resumeData.education}
                  isEditing={isEditing}
                  onUpdate={(education) => handleUpdate({ ...resumeData, education })}
                />
                <LanguagesSection
                  languages={resumeData.languages}
                  isEditing={isEditing}
                  onUpdate={(languages) => handleUpdate({ ...resumeData, languages })}
                />
              </div>
          </div>
        </div>
      </PrintWrapper>
      <EditToggle
        isEditing={isEditing}
        isSaving={isSaving}
        onToggle={() => setIsEditing(!isEditing)}
      />
      {!isEditing && (
        <DownloadButtons
          onPrintPDF={handlePrint}
          resumeData={resumeData}
        />
      )}
    </>
  );
}