
import React from "react";
import { Booking } from "@/types/booking";
import { formatDate } from "@/lib/utils";
import { MapPin, CalendarIcon, Users, CreditCard, Package } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

type TravelDetailsProps = {
  booking: Booking;
};

export const TravelDetails = ({ booking }: TravelDetailsProps) => {
  return (
    <div className="space-y-6">
      <div className="rounded-lg overflow-hidden border">
        {booking?.travel_offer?.image_url ? (
          <AspectRatio ratio={16 / 9}>
            <img
              src={booking?.travel_offer.image_url}
              alt={booking?.travel_offer.title}
              className="w-full h-full object-cover"
            />
          </AspectRatio>
        ) : (
          <AspectRatio ratio={16 / 9}>
            <div className="w-full h-full flex items-center justify-center bg-gray-100">
              <Package className="h-16 w-16 text-gray-400" />
            </div>
          </AspectRatio>
        )}
      </div>
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Détails du voyage</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div className="flex items-start">
              <MapPin className="h-5 w-5 mr-3 text-travel-secondary mt-0.5" />
              <div>
                <p className="font-medium">Destination</p>
                <p className="text-gray-600">{booking?.travel_offer?.destination}</p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CalendarIcon className="h-5 w-5 mr-3 text-travel-secondary mt-0.5" />
              <div>
                <p className="font-medium">Dates</p>
                {booking?.travel_offer?.start_date && booking?.travel_offer?.end_date ? (
                  <p className="text-gray-600">
                    Du {formatDate(booking.travel_offer.start_date)} au {formatDate(booking.travel_offer.end_date)}
                  </p>
                ) : (
                  <p className="text-gray-600">
                    Durée: {booking?.travel_offer?.duration || "Non spécifiée"} jours
                  </p>
                )}
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start">
              <Users className="h-5 w-5 mr-3 text-travel-secondary mt-0.5" />
              <div>
                <p className="font-medium">Voyageurs</p>
                <p className="text-gray-600">
                  {booking?.number_of_travelers} {booking?.number_of_travelers > 1 ? 'personnes' : 'personne'}
                </p>
              </div>
            </div>
            
            <div className="flex items-start">
              <CreditCard className="h-5 w-5 mr-3 text-travel-secondary mt-0.5" />
              <div>
                <p className="font-medium">Référence de paiement</p>
                <p className="text-gray-600">
                  {booking?.payment_reference || "Aucune référence"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
