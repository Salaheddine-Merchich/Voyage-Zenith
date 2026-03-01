
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "@/components/auth/LoginForm";
import { RegisterForm } from "@/components/auth/RegisterForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  
  const handleToggleForm = () => {
    setActiveTab(activeTab === "login" ? "register" : "login");
  };

  // Rediriger si l'utilisateur est déjà connecté
  useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/home");
      }
    }
  }, [user, isAdmin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-travel-light to-white p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto grid md:grid-cols-2 gap-6 items-center">
        <div className="hidden md:block">
          <div className="text-center md:text-left space-y-4">
            <h1 className="text-3xl md:text-4xl font-bold text-travel-primary">
              Voyage Zenith Booking
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Votre partenaire pour des voyages inoubliables. Connectez-vous pour découvrir nos meilleures offres.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="bg-travel-secondary rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Réservez vos vols, hôtels et séjours</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-travel-secondary rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Paiement 100% sécurisé</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-travel-secondary rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>Assistance 24/7</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <Tabs defaultValue="login" value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="login">Connexion</TabsTrigger>
              <TabsTrigger value="register">Inscription</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm onToggleForm={handleToggleForm} />
            </TabsContent>
            <TabsContent value="register">
              <RegisterForm onToggleForm={handleToggleForm} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
