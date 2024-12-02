import { useState, useEffect } from 'react';
import { supabase } from '../config/supabase';

export interface ResumeData {
  personal: {
    name: string;
    title: string;
    location: string;
    phone: string;
    birthYear: string;
    email: string;
    image?: string;
    companyLogo: string;
  };
  summary: string[];
  experience: {
    title: string;
    period: string;
    description: string;
    technologies: string[];
  }[];
  education: {
    institution: string;
    degree: string;
    period: string;
  }[];
  languages: {
    name: string;
    level: string;
  }[];
}

export function useResumeData(email: string) {
  const [resumeData, setResumeData] = useState<ResumeData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchResumeData();
  }, [email]);

  async function fetchResumeData() {
    try {
      const { data: users } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (users) {
        const { data: resume } = await supabase
          .from('resumes')
          .select('data')
          .eq('user_id', users.id)
          .single();

        if (resume) {
          // Convert single education object to array if needed
          const data = resume.data as ResumeData;
          if (!Array.isArray(data.education)) {
            data.education = [data.education];
          }
          setResumeData(data);
        }
      }
    } catch (error) {
      console.error('Error fetching resume data:', error);
    }
  }

  async function updateResume(newData: ResumeData) {
    setIsSaving(true);
    try {
      const { data: users } = await supabase
        .from('users')
        .select('id')
        .eq('email', email)
        .single();

      if (users) {
        const { error } = await supabase
          .from('resumes')
          .update({ data: newData })
          .eq('user_id', users.id);

        if (error) {
          throw error;
        }
        
        setResumeData(newData);
      }
    } catch (error) {
      console.error('Error updating resume:', error);
    } finally {
      setIsSaving(false);
    }
  }

  return {
    resumeData,
    isEditing,
    isSaving,
    setIsEditing,
    updateResume
  };
}