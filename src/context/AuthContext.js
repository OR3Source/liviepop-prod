import { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      setLoading(false);
    };
    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (event === 'SIGNED_OUT') {
        window.location.href = '/';
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const sanitizeUsername = (username) => {
    const clean = username
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9_-]/g, '')
      .slice(0, 30);

    if (clean.length < 3) {
      throw new Error('Username must be at least 3 characters (a-z, 0-9, _, -)');
    }

    return clean;
  };

  const signUp = async (email, password, username) => {
    const cleanUsername = sanitizeUsername(username);

    const { data, error } = await supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: { 
          username: cleanUsername,
          display_name: cleanUsername  // ← This maps to the Display name column in Supabase auth
        }
      }
    });
    if (error) throw error;
    return data;
  };

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);