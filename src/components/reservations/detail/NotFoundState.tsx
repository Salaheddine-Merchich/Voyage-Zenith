
import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

export const NotFoundState = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="travel-container py-8 flex-grow">
        <div className="bg-red-50 border border-red-100 rounded-lg p-6 text-center">
          <h1 className="text-xl font-semibold text-red-800 mb-2">Réservation non trouvée</h1>
          <p className="text-red-600 mb-4">Cette réservation n'existe pas ou vous n'avez pas les droits pour y accéder.</p>
          <Button onClick={() => navigate("/my-reservations")} className="btn-travel">
            Retourner à mes réservations
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
