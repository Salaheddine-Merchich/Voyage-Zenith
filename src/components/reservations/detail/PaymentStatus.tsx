
import React from "react";
import { Booking } from "@/types/booking";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PaymentStatusProps = {
  booking: Booking;
  onCancel: () => void;
};

export const PaymentStatus = ({ booking, onCancel }: PaymentStatusProps) => {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-4">Statut du paiement</h2>
        
        {booking.payments && booking.payments.length > 0 ? (
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Méthode</span>
              <span>{booking.payments[0].payment_method}</span>
            </div>
            
            <div className="flex justify-between">
              <span>Statut</span>
              <span className={`px-2 py-0.5 rounded-full text-xs ${
                booking.payments[0].status === 'completed' ? 'bg-green-100 text-green-800' : 
                booking.payments[0].status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                'bg-gray-100 text-gray-800'
              }`}>
                {booking.payments[0].status === 'completed' ? 'Payé' : 
                 booking.payments[0].status === 'pending' ? 'En attente' : booking.payments[0].status}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span>Date</span>
              <span>{formatDate(booking.payments[0].payment_date)}</span>
            </div>
          </div>
        ) : (
          <p className="text-gray-600">Aucune information de paiement disponible</p>
        )}
      </div>
      
      {booking.status.toLowerCase() !== 'annulée' && (
        <Button
          variant="destructive"
          className="w-full"
          onClick={onCancel}
        >
          Annuler la réservation
        </Button>
      )}
    </div>
  );
};
