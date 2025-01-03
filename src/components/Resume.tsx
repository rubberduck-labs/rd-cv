import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import Header from './Header';
import Section from './Section';
import Summary from './Summary';
import Education from './Education';
import LanguageGrid from './LanguageGrid';
import DocumentTitle from './DocumentTitle';
import EditToggle from './EditToggle';
import ExperienceSection from './ExperienceSection';
import PrintWrapper from './PrintWrapper';
import DownloadButtons from './DownloadButtons';
import ExperienceHeader from './ExperienceHeader';
import { useResumeData } from '../hooks/useResumeData';
import { useExperiencePageBreaks } from '../hooks/useExperiencePageBreaks';
import { exportToPdf } from '../utils/pdfExport';
import { useAuth } from '../contexts/AuthContext';

interface ResumeProps {
  email: string;
}

export default function Resume({ email }: ResumeProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    resumeData,
    isEditing,
    isSaving,
    setIsEditing,
    updateResume
  } = useResumeData(email);
  
  const { pageBreaks, togglePageBreak } = useExperiencePageBreaks();
  const componentRef = useRef<HTMLDivElement>(null);

  const handleExportPDF = async () => {
    if (componentRef.current) {
      const filename = `cv-rubberduck-${resumeData?.personal.name.toLowerCase().replace(/\s+/g, '-')}.pdf`;
      await exportToPdf(componentRef.current, filename);
    }
  };

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
        <div className="max-w-5xl mx-auto pb-24 print:pb-0">
          <div className="bg-white shadow-xl print:shadow-none">
            <Header 
              {...resumeData.personal}
              isEditing={isEditing}
              onUpdate={(personal) => handleUpdate({ ...resumeData, personal })}
            />

            <div className="content-wrapper">
              <div className="max-w-4xl mx-auto px-8 md:px-12 print:px-0 py-12">
                <Section title="Sammendrag" className="mb-12">
                  <Summary 
                    paragraphs={resumeData.summary}
                    isEditing={isEditing}
                    onUpdate={(summary) => handleUpdate({ ...resumeData, summary })}
                  />
                </Section>

                <ExperienceHeader title="Erfaring" />
                <ExperienceSection
                  experiences={resumeData.experience}
                  isEditing={isEditing}
                  onUpdate={(experience) => handleUpdate({ ...resumeData, experience })}
                  pageBreaks={pageBreaks}
                  onTogglePageBreak={togglePageBreak}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 no-break">
                  <Section title="Utdanning">
                    <div className="space-y-4">
                      {resumeData.education.map((edu, index) => (
                        <Education
                          key={index}
                          {...edu}
                          isEditing={isEditing}
                          onUpdate={(updatedEdu) => {
                            const newEducation = [...resumeData.education];
                            newEducation[index] = updatedEdu;
                            handleUpdate({ ...resumeData, education: newEducation });
                          }}
                          onRemove={() => {
                            const newEducation = resumeData.education.filter((_, i) => i !== index);
                            handleUpdate({ ...resumeData, education: newEducation });
                          }}
                        />
                      ))}
                    </div>
                  </Section>

                  <Section title="Språk">
                    <LanguageGrid 
                      languages={resumeData.languages}
                      isEditing={isEditing}
                      onUpdate={(languages) => handleUpdate({ ...resumeData, languages })}
                    />
                  </Section>
                </div>
              </div>
            </div>
          </div>
        </div>
      </PrintWrapper>
      
      {!isEditing && !user && (
        <button
          onClick={() => navigate('/login')}
          className="fixed bottom-8 left-8 bg-primary-400 text-secondary-900 p-3 rounded-full shadow-lg hover:bg-primary-500 transition-colors print:hidden"
          title="Logg inn for å redigere"
        >
          <LogIn size={20} />
        </button>
      )}
      {user && (
        <EditToggle 
          isEditing={isEditing}
          isSaving={isSaving}
          onToggle={() => setIsEditing(!isEditing)}
        />
      )}
      
      {!isEditing && (
        <DownloadButtons
          onPrintPDF={handleExportPDF}
          resumeData={resumeData}
        />
      )}
    </>
  );
}