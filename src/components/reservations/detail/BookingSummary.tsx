
import React from "react";
import { Booking } from "@/types/booking";
import { formatDate, formatPrice } from "@/lib/utils";
import { Tag } from "lucide-react";

type BookingSummaryProps = {
  booking: Booking;
};

export const BookingSummary = ({ booking }: BookingSummaryProps) => {
  // Calculate discount percentage only if oldPrice exists and is greater than the current price
  const hasDiscount = booking?.travel_offer?.old_price && 
                      booking.travel_offer.old_price > booking.travel_offer.price;
                      
  const discountPercentage = hasDiscount
    ? Math.round((1 - (booking.travel_offer.price / booking.travel_offer.old_price)) * 100) 
    : 0;

  return (
    <div className="bg-gray-50 rounded-lg p-5">
      <h2 className="text-lg font-semibold mb-4">Résumé de la réservation</h2>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Date de réservation</span>
          <span>{formatDate(booking?.created_at || '')}</span>
        </div>
        
        <div className="flex justify-between items-start">
          <span>Prix par voyageur</span>
          <div className="text-right">
            <span>{formatPrice(booking?.travel_offer?.price || 0)}</span>
            {hasDiscount && (
              <>
                <div className="flex items-center space-x-1 text-xs text-green-600 justify-end">
                  <Tag className="h-3 w-3" />
                  <span>Économie de {discountPercentage}%</span>
                </div>
                <div className="text-xs text-gray-500 line-through">
                  {formatPrice(booking.travel_offer.old_price)}
                </div>
              </>
            )}
          </div>
        </div>
        
        <div className="flex justify-between">
          <span>Nombre de voyageurs</span>
          <span>{booking?.number_of_travelers}</span>
        </div>
        
        <div className="border-t pt-2 mt-2 flex justify-between font-bold">
          <span>Total</span>
          <span>{formatPrice(booking?.total_price || 0)}</span>
        </div>
        
        {hasDiscount && (
          <div className="flex justify-between text-sm text-gray-500">
            <span>Prix normal total</span>
            <span className="line-through">
              {formatPrice(booking.travel_offer.old_price * booking.number_of_travelers)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
