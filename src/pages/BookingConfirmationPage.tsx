
import { useLocation, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Tag } from "lucide-react"; // Replace Discount with Tag

const BookingConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Toujours utiliser des valeurs par défaut pour garantir l'affichage
  const state = location.state || {};
  const offerTitle = state.offerTitle || "Voyage réservé";
  const quantity = state.quantity || 1;
  const totalPrice = state.totalPrice || 0;
  const oldPrice = state.oldPrice;
  const email = state.email || "Non spécifié";
  
  // Calculate discount percentage if oldPrice exists
  const discountPercentage = oldPrice ? Math.round((1 - totalPrice / oldPrice) * 100) : 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="travel-container py-12 flex-grow flex items-center justify-center">
        <Card className="max-w-lg w-full">
          <CardContent className="pt-6 text-center">
            <div className="flex justify-center mb-6">
              <div className="rounded-full bg-green-100 p-3">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Réservation confirmée !</h1>
            <p className="text-gray-600 mb-6">
              Merci pour votre réservation. 
              {email && email !== "Non spécifié" ? ` Un email de confirmation a été envoyé à ${email}.` : " Aucun email n'a été fourni."}
            </p>
            
            <div className="bg-gray-50 p-4 rounded-md text-left mb-6">
              <h2 className="font-medium mb-2">Détails de la réservation</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Offre:</span>
                  <span className="font-medium">{offerTitle}</span>
                </div>
                <div className="flex justify-between">
                  <span>Voyageurs:</span>
                  <span>{quantity}</span>
                </div>
                <div className="flex justify-between items-start">
                  <span>Total:</span>
                  <div className="text-right">
                    <span className="font-medium">{new Intl.NumberFormat("fr-FR", {
                      style: "currency",
                      currency: "EUR",
                    }).format(totalPrice)}</span>
                    
                    {oldPrice && oldPrice > totalPrice && (
                      <div className="flex items-center space-x-1 text-xs text-green-600 justify-end">
                        <Tag className="h-3 w-3" /> {/* Replace Discount with Tag */}
                        <span>Économie de {discountPercentage}%</span>
                      </div>
                    )}
                    
                    {oldPrice && (
                      <div className="text-xs text-gray-500 line-through">
                        {new Intl.NumberFormat("fr-FR", {
                          style: "currency",
                          currency: "EUR",
                        }).format(oldPrice)}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-between">
                  <span>Email:</span>
                  <span>{email}</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Button className="w-full btn-travel" onClick={() => navigate("/home")}>
                Retourner à l'accueil
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Footer />
    </div>
  );
};

export default BookingConfirmationPage;
