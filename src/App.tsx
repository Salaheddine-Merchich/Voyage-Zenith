import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { CartProvider } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";

// Pages
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import SearchPage from "./pages/SearchPage";
import TravelDetailPage from "./pages/TravelDetailPage";
import UserProfilePage from "./pages/UserProfilePage";
import NotFound from "./pages/NotFound";
import PaymentPage from "./pages/PaymentPage";
import BookingConfirmationPage from "./pages/BookingConfirmationPage";
import CartPage from "./pages/CartPage";
import ReservationDetailPage from "./pages/ReservationDetailPage";

// Admin Pages
import AddOfferPage from "./pages/admin/AddOfferPage";
import EditOfferPage from "./pages/admin/EditOfferPage";
import OffersListPage from "./pages/admin/OffersListPage";
import BookingsManagementPage from "./pages/admin/BookingsManagementPage";

const queryClient = new QueryClient();

// Composants de protection des routes
const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-travel-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const RequireAdmin = ({ children }: { children: JSX.Element }) => {
  const { user, isAdmin, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-travel-primary"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/" replace />;
  }
  
  if (!isAdmin) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

const PublicRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-travel-primary"></div>
      </div>
    );
  }
  
  if (user) {
    return <Navigate to="/home" replace />;
  }

  return children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes */}
      <Route path="/" element={<PublicRoute><AuthPage /></PublicRoute>} />
      
      {/* Client Routes - Protégées */}
      <Route path="/home" element={<RequireAuth><HomePage /></RequireAuth>} />
      <Route path="/search" element={<RequireAuth><SearchPage /></RequireAuth>} />
      <Route path="/travel/:id" element={<RequireAuth><TravelDetailPage /></RequireAuth>} />
      <Route path="/payment" element={<RequireAuth><PaymentPage /></RequireAuth>} />
      <Route path="/booking-confirmation" element={<RequireAuth><BookingConfirmationPage /></RequireAuth>} />
      <Route path="/profile" element={<RequireAuth><UserProfilePage /></RequireAuth>} />
      <Route path="/reservation/:id" element={<RequireAuth><ReservationDetailPage /></RequireAuth>} />
      <Route path="/cart" element={<RequireAuth><CartPage /></RequireAuth>} />
      
      {/* Admin Routes - Protégées pour les admins */}
      <Route path="/admin/offers" element={<RequireAdmin><OffersListPage /></RequireAdmin>} />
      <Route path="/admin/offers/add" element={<RequireAdmin><AddOfferPage /></RequireAdmin>} />
      <Route path="/admin/offers/edit/:id" element={<RequireAdmin><EditOfferPage /></RequireAdmin>} />
      <Route path="/admin/bookings" element={<RequireAdmin><BookingsManagementPage /></RequireAdmin>} />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
