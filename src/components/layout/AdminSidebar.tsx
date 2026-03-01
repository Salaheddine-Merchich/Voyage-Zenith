
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LogOut, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export function AdminSidebar() {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const navItems = [
    {
      name: "Offres",
      path: "/admin/offers",
      icon: <Plus className="h-5 w-5" />,
    },
    {
      name: "Ajouter offre",
      path: "/admin/offers/add",
      icon: <Plus className="h-5 w-5" />,
    }
  ];

  const handleLogout = async () => {
    try {
      await signOut();
      // La redirection vers la page de connexion
      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      toast({
        title: "Erreur",
        description: "Une erreur s'est produite lors de la déconnexion.",
        variant: "destructive",
      });
    }
  };

  return (
    <aside
      className={cn(
        "h-screen bg-travel-dark text-white flex flex-col transition-all duration-300",
        isCollapsed ? "w-20" : "w-64"
      )}
    >
      <div className="p-4 flex items-center justify-between border-b border-white/10">
        {!isCollapsed && <h2 className="font-bold text-xl">Admin</h2>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 rounded-md hover:bg-travel-primary/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5"
          >
            {isCollapsed ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
            )}
          </svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-1 px-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center px-3 py-3 rounded-md transition-colors",
                location.pathname === item.path
                  ? "bg-travel-primary text-white"
                  : "text-gray-300 hover:bg-travel-primary/20 hover:text-white"
              )}
            >
              <div className="flex items-center justify-center">{item.icon}</div>
              {!isCollapsed && <span className="ml-3">{item.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-white/10">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-travel-primary/20 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          {!isCollapsed && <span className="ml-3">Déconnexion</span>}
        </Button>
      </div>
    </aside>
  );
}
