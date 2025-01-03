import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../config/supabase';
import { useAuth } from '../contexts/AuthContext';
import { AUTH_CONFIG, ALLOWED_DOMAINS } from '../config/authConfig';

export default function Login() {
  const navigate = useNavigate();
  const { user, error } = useAuth();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 to-white py-16">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center mb-8">
          <img
            src="https://static.wixstatic.com/media/d42034_616a7aeab9b646e2bde0178ca7abcbd6~mv2.png"
            alt="Rubberduck Logo"
            className="h-16 mx-auto mb-6"
          />
          <h1 className="text-3xl font-bold text-secondary-900 mb-2">Logg inn</h1>
          <p className="text-secondary-600">
            Logg inn med din Rubberduck Google-konto
          </p>
          <p className="mt-2 text-sm text-secondary-600">
            Kun e-postadresser fra {ALLOWED_DOMAINS.map(domain => `@${domain}`).join(', ')} er tillatt
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-md p-6">
          <Auth
            supabaseClient={supabase}
            {...AUTH_CONFIG}
            appearance={{ 
              ...AUTH_CONFIG.appearance,
              theme: ThemeSupa,
            }}
            redirectTo={`${window.location.origin}/`}
          />
        </div>
      </div>
    </div>
  );
}