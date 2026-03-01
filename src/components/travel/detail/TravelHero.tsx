
import React from "react";
import { MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TravelOffer } from "@/types/booking";

interface TravelHeroProps {
  offer: TravelOffer;
  typeLabel: string;
}

export const TravelHero = ({ offer, typeLabel }: TravelHeroProps) => {
  return (
    <section className="relative h-[400px]">
      <div className="absolute inset-0">
        <img src={offer.gallery?.[0] || offer.image} alt={offer.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      </div>
      
      <div className="travel-container relative h-full flex items-end pb-8">
        <div className="text-white max-w-3xl">
          <Badge className="bg-travel-secondary mb-2">{typeLabel}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{offer.title}</h1>
          <div className="flex items-center space-x-4 text-sm md:text-base">
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{offer.destination}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{offer.duration}</span>
            </div>
            {offer.rating && <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{offer.rating} ({offer.reviews} avis)</span>
              </div>}
          </div>
        </div>
      </div>
    </section>
  );
};
