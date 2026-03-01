
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
      <div className="flex-grow flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Offre non trouvée</h1>
          <p className="text-gray-600 mb-6">L'offre que vous recherchez n'existe pas ou a été supprimée.</p>
          <Button className="btn-travel" onClick={() => navigate("/search")}>
            Retour à la recherche
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
};
