
import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ShoppingCart, LogOut, Home } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    toast
  } = useToast();
  const {
    user,
    isAdmin,
    signOut,
    loading
  } = useAuth();
  const {
    getCartCount
  } = useCart();
  const isLoggedIn = !!user;
  const cartCount = getCartCount();
  
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
        variant: "destructive"
      });
    }
  };
  
  if (loading) return null; // Ne pas afficher la navbar pendant le chargement

  // Check if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return <nav className="text-white shadow-md bg-gray-950">
      <div className="travel-container flex items-center justify-between py-4 bg-slate-950">
        <div className="flex items-center space-x-2">
          <Link to="/home" className="flex items-center">
            <span className="text-2xl font-bold">Voyage Zenith</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          {isLoggedIn && !isAdmin && <>
              <Link to="/home" className={`hover:text-travel-light transition-colors ${isActive('/home') ? 'text-travel-light font-medium' : ''}`}>
                Accueil
              </Link>
              <Link to="/search" className={`hover:text-travel-light transition-colors ${isActive('/search') ? 'text-travel-light font-medium' : ''}`}>
                Rechercher
              </Link>
              <Link to="/cart" className="relative">
                <ShoppingCart className={`h-6 w-6 hover:text-travel-light transition-colors ${isActive('/cart') ? 'text-travel-light' : ''}`} />
                {cartCount > 0 && <span className="absolute -top-2 -right-2 bg-travel-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>}
              </Link>
              <div className="border-l border-white/20 h-6"></div>
            </>}

          {isLoggedIn && isAdmin && <>
              <Link to="/admin/offers" className={`hover:text-travel-light transition-colors ${isActive('/admin/offers') ? 'text-travel-light font-medium' : ''}`}>
                Offres
              </Link>
              <div className="border-l border-white/20 h-6"></div>
            </>}

          {isLoggedIn ? <div className="flex items-center space-x-4">
              <Button variant="ghost" className="hover:bg-travel-dark hover:text-white" onClick={handleLogout}>
                <LogOut className="h-5 w-5 mr-2" />
                Déconnexion
              </Button>
            </div> : <Button asChild className="bg-white text-travel-primary hover:bg-travel-light">
              <Link to="/">Connexion</Link>
            </Button>}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <Button variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && <div className="md:hidden bg-travel-primary border-t border-white/10 animate-fade-in">
          <div className="travel-container py-4 space-y-2">
            {isLoggedIn && !isAdmin && <>
                <Link to="/home" className={`block py-2 hover:text-travel-light transition-colors ${isActive('/home') ? 'text-travel-light font-medium' : ''}`}>
                  Accueil
                </Link>
                <Link to="/search" className={`block py-2 hover:text-travel-light transition-colors ${isActive('/search') ? 'text-travel-light font-medium' : ''}`}>
                  Rechercher
                </Link>
                <Link to="/cart" className={`block py-2 hover:text-travel-light transition-colors flex items-center ${isActive('/cart') ? 'text-travel-light font-medium' : ''}`}>
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Panier {cartCount > 0 ? `(${cartCount})` : '(0)'}
                </Link>
              </>}

            {isLoggedIn && isAdmin && <>
                <Link to="/admin/offers" className={`block py-2 hover:text-travel-light transition-colors ${isActive('/admin/offers') ? 'text-travel-light font-medium' : ''}`}>
                  Offres
                </Link>
              </>}

            {isLoggedIn ? <>
                <div className="border-t border-white/10 my-2"></div>
                <Button variant="ghost" className="w-full justify-start hover:bg-travel-dark hover:text-white py-2" onClick={handleLogout}>
                  <LogOut className="h-5 w-5 mr-2" />
                  Déconnexion
                </Button>
              </> : <Button asChild className="w-full mt-2 bg-white text-travel-primary hover:bg-travel-light">
                <Link to="/">Connexion</Link>
              </Button>}
          </div>
        </div>}
    </nav>;
}
