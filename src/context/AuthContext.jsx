import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import { AuthContext } from "./AuthContextDef";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState("login");

  // ==============================
  // SUPABASE AUTH STATE
  // ==============================

  useEffect(() => {
    let mounted = true;

    const loadUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    };

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  // ==============================
  // MODAL
  // ==============================

  const openAuthModal = (mode = "login") => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // ==============================
  // LOGIN
  // ==============================

  const loginWithEmail = async (email, password) => {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      throw error;
    }

    return data.user;
  };

  // ==============================
  // SIGNUP
  // ==============================

  const signupWithEmail = async (
    email,
    password,
    displayName
  ) => {
    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName || "",
          },
        },
      });

    if (error) {
      throw error;
    }

    return data.user;
  };

  // ==============================
  // PASSWORD RESET
  // ==============================

  const resetPassword = async (email) => {
    const { error } =
      await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      throw error;
    }

    return true;
  };

  // ==============================
  // LOGOUT
  // ==============================

  const logout = async () => {
    const { error } =
      await supabase.auth.signOut({
        scope: "local",
      });

    if (error) {
      throw error;
    }

    setUser(null);
  };

  // ==============================
  // CONTEXT VALUE
  // ==============================

  const value = {
    user,
    loading,

    isAuthModalOpen,
    authModalMode,

    setAuthModalMode,
    openAuthModal,
    closeAuthModal,

    loginWithEmail,
    signupWithEmail,
    resetPassword,
    logout,

    isFirebaseConfigured: false,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}