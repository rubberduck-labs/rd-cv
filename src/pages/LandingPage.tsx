import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Mail } from 'lucide-react';
import { supabase } from '../config/supabase';
import type { ResumeData } from '../hooks/useResumeData';

interface Resume {
  email: string;
  data: ResumeData;
}

export default function LandingPage() {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchResumes() {
      const { data: resumesData, error } = await supabase
        .from('resumes')
        .select(`
          user_id,
          data,
          users!inner (
            email
          )
        `);

      if (error) {
        console.error('Error fetching resumes:', error);
        return;
      }

      const formattedResumes = resumesData.map(resume => ({
        email: resume.users.email,
        data: resume.data as ResumeData
      }));

      setResumes(formattedResumes);
      setIsLoading(false);
    }

    fetchResumes();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white">
      <div className="max-w-5xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <img
            src="https://static.wixstatic.com/media/d42034_616a7aeab9b646e2bde0178ca7abcbd6~mv2.png/v1/fill/w_198,h_150,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/rubberduck.png"
            alt="Rubberduck Logo"
            className="h-24 mx-auto mb-8"
          />
          <p className="mt-3 max-w-md mx-auto text-base text-secondary-600 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Velkommen til vår CV-portal. Her finner du CVer for våre dyktige utviklere.
          </p>
          <a
            href="mailto:hei@rubberduck.no"
            className="inline-flex items-center mt-6 text-primary-500 hover:text-primary-600 transition-colors"
          >
            <Mail className="h-5 w-5 mr-2" />
            <span>hei@rubberduck.no</span>
          </a>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((resume) => {
              const path = resume.data.personal.name.toLowerCase().replace(/\s+/g, '-');
              return (
                <Link
                  key={resume.email}
                  to={`/${path}`}
                  className="relative group bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center"
                >
                  <div className="h-48 w-48 rounded-full overflow-hidden mb-6">
                    <img
                      src={resume.data.personal.image}
                      alt={resume.data.personal.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-semibold text-secondary-900 mb-2">
                    {resume.data.personal.name}
                  </h3>
                  <p className="text-lg text-secondary-600 mb-6">
                    {resume.data.personal.title}
                  </p>
                  <button className="bg-primary-50 text-secondary-900 px-6 py-3 rounded-full font-medium group-hover:bg-primary-100 transition-colors">
                    Se CV
                  </button>
                </Link>
              )
            })}

            <Link
              to="/new"
              className="relative group bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 flex flex-col items-center text-center"
            >
              <div className="h-48 w-48 rounded-full bg-primary-50 flex items-center justify-center mb-6">
                <Plus className="h-24 w-24 text-primary-400" />
              </div>
              <h3 className="text-2xl font-semibold text-secondary-900 mb-2">Ny CV</h3>
              <p className="text-lg text-secondary-600 mb-6">Opprett ny CV</p>
              <button className="bg-primary-50 text-secondary-900 px-6 py-3 rounded-full font-medium group-hover:bg-primary-100 transition-colors inline-flex items-center">
                <Plus className="mr-2 h-5 w-5" />
                <span>Opprett ny</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}