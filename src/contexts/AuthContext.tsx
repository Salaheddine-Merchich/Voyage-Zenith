
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    async function getInitialSession() {
      setLoading(true);
      try {
        // Get session
        const { data: { session: initialSession }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          throw sessionError;
        }

        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        if (initialSession?.user) {
          // Check if user is admin from user metadata first
          const userMetadata = initialSession.user.user_metadata;
          if (userMetadata && userMetadata.is_admin === true) {
            setIsAdmin(true);
          } else {
            // If not found in metadata, check the profiles table
            const { data, error } = await supabase
              .from("profiles")
              .select("is_admin")
              .eq("id", initialSession.user.id)
              .single();

            if (error) {
              console.error("Error fetching user profile:", error);
            } else {
              setIsAdmin(!!data?.is_admin);
            }
          }
        }
      } catch (error) {
        console.error("Error getting initial session:", error);
        toast({
          title: "Erreur",
          description: "Impossible de récupérer votre session",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    }

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // Check if user is admin from user metadata first
        const userMetadata = session.user.user_metadata;
        if (userMetadata && userMetadata.is_admin === true) {
          setIsAdmin(true);
        } else {
          // If not found in metadata, check the profiles table
          supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", session.user.id)
            .single()
            .then(({ data, error }) => {
              if (!error) {
                setIsAdmin(!!data?.is_admin);
              }
            });
        }
      } else {
        setIsAdmin(false);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [toast]);

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Réinitialiser explicitement les états après la déconnexion
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
    } catch (error) {
      console.error("Error signing out:", error);
      toast({
        title: "Erreur",
        description: "Impossible de vous déconnecter",
        variant: "destructive",
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        loading,
        isAdmin,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
