import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./supabase";
import {
  type User,
  type Session,
  type AuthResponse,
  AuthError,
} from "@supabase/supabase-js";

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  signIn: (
    email: string,
    password: string,
  ) => Promise<{
    data: AuthResponse["data"] | null;
    error: AuthError | null;
  }>;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => null,
  loading: true,
  setLoading: () => null,
  signIn: async () => ({ data: null, error: null }),
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth
      .getSession()
      .then(({ data: { session } }: { data: { session: Session | null } }) => {
        setUser(session?.user ?? null);
        setLoading(false);
      });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session: Session | null) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    return { data, error };
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, setLoading, signIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
