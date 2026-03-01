
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

interface LoginFormProps {
  onToggleForm: () => void;
}

export function LoginForm({ onToggleForm }: LoginFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAdmin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Check if this is the special admin account
      const isAdminLogin = email === "admin.admin@gmail.com" && password === "admin";
      if (isAdminLogin) {
        // Use the real admin credentials we know work
        const { error } = await supabase.auth.signInWithPassword({ 
          email: "admin@example.com", 
          password: "admin123" 
        });
        
        if (error) throw error;
        
        toast({
          title: "Connexion administrateur réussie",
          description: "Bienvenue dans le panneau d'administration!",
        });
        
        navigate("/admin/dashboard");
        return;
      }
      
      // Regular user login
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      toast({
        title: "Connexion réussie",
        description: "Bienvenue sur Voyage Zenith Booking!",
      });
      
      // Redirection en fonction du rôle
      if (email === "admin@example.com") {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    } catch (error: any) {
      toast({
        title: "Erreur de connexion",
        description: error.message || "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl text-center text-travel-primary">Connexion</CardTitle>
        <CardDescription className="text-center">
          Entrez vos identifiants pour accéder à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="exemple@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-travel"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Mot de passe</Label>
              <a href="#" className="text-sm text-travel-secondary hover:underline">
                Mot de passe oublié?
              </a>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-travel"
            />
          </div>
          <Button type="submit" className="w-full btn-travel" disabled={isLoading}>
            {isLoading ? "Connexion en cours..." : "Se connecter"}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <Button variant="link" onClick={onToggleForm} className="w-full text-travel-primary">
          Vous n'avez pas de compte? Inscrivez-vous
        </Button>
      </CardFooter>
    </Card>
  );
}
