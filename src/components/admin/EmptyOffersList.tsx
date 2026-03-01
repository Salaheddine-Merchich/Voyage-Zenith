
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const EmptyOffersList = () => {
  const navigate = useNavigate();
  
  return (
    <div className="text-center py-8">
      <p className="text-gray-500">Aucune offre disponible</p>
      <Button
        onClick={() => navigate("/admin/offers/add")}
        variant="outline"
        className="mt-4"
      >
        Ajouter votre première offre
      </Button>
    </div>
  );
};
