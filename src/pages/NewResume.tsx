import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../config/supabase';

const defaultResumeData = {
  personal: {
    name: '',
    title: '',
    location: '',
    phone: '',
    birthYear: '',
    email: '',
    image: '',
    companyLogo: 'https://static.wixstatic.com/media/d42034_616a7aeab9b646e2bde0178ca7abcbd6~mv2.png/v1/fill/w_198,h_150,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/rubberduck.png'
  },
  summary: [''],
  experience: [],
  education: {
    institution: '',
    degree: '',
    period: ''
  },
  languages: [
    {
      name: 'Norsk',
      level: 'Morsmål'
    }
  ]
};

export default function NewResume() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    email: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Check if user already exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('email', formData.email)
        .single();

      if (existingUser) {
        alert('En bruker med denne e-postadressen finnes allerede.');
        setIsLoading(false);
        return;
      }

      // Create user
      const { data: userData, error: userError } = await supabase
        .from('users')
        .insert([{ email: formData.email }])
        .select()
        .single();

      if (userError) throw userError;

      // Create resume
      const resumeData = {
        ...defaultResumeData,
        personal: {
          ...defaultResumeData.personal,
          name: formData.name,
          title: formData.title,
          email: formData.email
        }
      };

      const { error: resumeError } = await supabase
        .from('resumes')
        .insert([{
          user_id: userData.id,
          data: resumeData
        }]);

      if (resumeError) throw resumeError;

      // Generate route based on name and navigate with edit mode
      const route = formData.name.toLowerCase().replace(/\s+/g, '-');
      navigate(`/${route}`, { state: { enableEditMode: true } });
    } catch (error) {
      console.error('Error creating resume:', error);
      alert('Det oppstod en feil ved opprettelse av CV. Vennligst prøv igjen.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-16">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <img
            src="https://static.wixstatic.com/media/d42034_616a7aeab9b646e2bde0178ca7abcbd6~mv2.png/v1/fill/w_198,h_150,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/rubberduck.png"
            alt="Rubberduck Logo"
            className="h-16 mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Opprett ny CV</h1>
          <p className="text-secondary-600">
            Fyll ut grunnleggende informasjon for å komme i gang
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Navn
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              Tittel
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-1">
              E-post
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary-400 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-primary-400 text-secondary-900 py-3 rounded-md font-medium hover:bg-primary-500 transition-colors disabled:opacity-50"
          >
            {isLoading ? 'Oppretter...' : 'Opprett CV'}
          </button>
        </form>
      </div>
    </div>
  );
}