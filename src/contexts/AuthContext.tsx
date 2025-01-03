import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, AuthError } from '@supabase/supabase-js';
import { supabase } from '../config/supabase';
import { isAllowedDomain } from '../config/authConfig';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const isDevelopment = import.meta.env.DEV;

// Mock user for development
const devUser: User = {
  id: 'dev-user',
  email: 'dev@rubberduck.no',
  aud: 'authenticated',
  created_at: new Date().toISOString(),
} as User;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isDevelopment) {
      setUser(devUser);
      setLoading(false);
      return;
    }

    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user;
      if (currentUser && !isAllowedDomain(currentUser.email || '')) {
        supabase.auth.signOut();
        setUser(null);
        setError('Kun @rubberduck.no e-postadresser er tillatt.');
      } else {
        setUser(currentUser);
      }
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user;
      if (currentUser && !isAllowedDomain(currentUser.email || '')) {
        supabase.auth.signOut();
        setUser(null);
        setError('Kun @rubberduck.no e-postadresser er tillatt.');
      } else {
        setUser(currentUser);
        setError(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    if (isDevelopment) {
      setUser(null);
      return;
    }
    await supabase.auth.signOut();
    setError(null);
  };

  const value = {
    user,
    loading,
    signOut,
    error
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}