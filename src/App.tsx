import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useParams, useNavigate } from 'react-router-dom';
import { supabase } from './config/supabase';
import LandingPage from './pages/LandingPage';
import Resume from './components/Resume';
import NewResume from './pages/NewResume';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/new" element={<NewResume />} />
        <Route path="/:path" element={<ResumeRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

function ResumeRoute() {
  const { path } = useParams();
  const navigate = useNavigate();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    async function fetchEmail() {
      const { data: resumesData } = await supabase
        .from('resumes')
        .select(`
          data,
          users!inner (
            email
          )
        `);

      if (resumesData) {
        const resume = resumesData.find(r => {
          const name = r.data?.personal?.name;
          return name && name.toLowerCase().replace(/\s+/g, '-') === path;
        });

        if (resume) {
          setEmail(resume.users.email);
        } else {
          navigate('/');
        }
      }
    }

    if (path) {
      fetchEmail();
    }
  }, [path, navigate]);

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  return <Resume email={email} />;
}

export default App;