
import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";

export const EmptyReservations: React.FC = () => {
  return (
    <div className="bg-gray-50 rounded-lg p-10 text-center">
      <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gray-100 mb-4">
        <CalendarIcon className="h-10 w-10 text-gray-400" />
      </div>
      <h2 className="text-xl font-semibold mb-2">Vous n'avez pas encore de réservation</h2>
      <p className="text-gray-600 max-w-md mx-auto mb-6">
        Explorez nos offres de voyage et réservez votre prochaine aventure. Toutes vos réservations apparaîtront ici.
      </p>
      <Button className="btn-travel" onClick={() => window.location.href = "/search"}>
        Découvrir nos offres
      </Button>
    </div>
  );
};
