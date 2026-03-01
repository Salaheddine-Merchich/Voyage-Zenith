
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Users } from "lucide-react";
import { TravelOffer } from "@/types/booking";

interface BookingCardProps {
  offer: TravelOffer;
  quantity: number;
  setQuantity: (quantity: number) => void;
  handleBookNow: () => void;
  handleAddToCart: () => void;
}

export const BookingCard = ({ 
  offer, 
  quantity, 
  setQuantity, 
  handleBookNow, 
  handleAddToCart 
}: BookingCardProps) => {
  // Format price
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR"
  }).format(offer.price);
  
  // Only format oldPrice if it exists and is greater than the current price
  const formattedOldPrice = offer.old_price && offer.old_price > offer.price 
    ? new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR"
      }).format(offer.old_price) 
    : null;
  
  // Calculate discount only if oldPrice exists and is greater than current price
  const discountPercentage = offer.old_price && offer.old_price > offer.price 
    ? Math.round(100 - (offer.price / offer.old_price * 100)) 
    : 0;

  return (
    <Card className="sticky top-6">
      <CardContent className="p-6">
        <div className="mb-4">
          <div className="flex items-end gap-2">
            <span className="text-3xl font-bold text-travel-primary">{formattedPrice}</span>
            {formattedOldPrice && (
              <span className="text-sm text-gray-500 line-through">{formattedOldPrice}</span>
            )}
            {formattedOldPrice && discountPercentage > 0 && (
              <Badge className="bg-red-500 ml-2">
                -{discountPercentage}%
              </Badge>
            )}
          </div>
          <p className="text-sm text-gray-500">
            {offer.type === "hotel" ? "par nuit" : "par personne"}
          </p>
        </div>
        
        <Separator className="my-4" />
        
        <div className="space-y-4">
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium mb-1">
              Nombre de voyageurs
            </label>
            <div className="flex items-center">
              <Button type="button" variant="outline" className="h-9 w-9 p-0" 
                onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                disabled={quantity <= 1}>
                -
              </Button>
              <div className="w-12 text-center">{quantity}</div>
              <Button type="button" variant="outline" className="h-9 w-9 p-0" 
                onClick={() => setQuantity(Math.min(offer.availability, quantity + 1))} 
                disabled={quantity >= offer.availability}>
                +
              </Button>
              <Users className="ml-2 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium mb-1">Résumé</h4>
            <div className="flex justify-between text-sm">
              <span>{quantity} {quantity > 1 ? "personnes" : "personne"}</span>
              <span>{new Intl.NumberFormat("fr-FR", {
                style: "currency",
                currency: "EUR"
              }).format(offer.price * quantity)}</span>
            </div>
            {offer.type !== "hotel" && offer.type !== "flight" && <p className="text-xs text-gray-500 mt-1">
                Du {offer.departureDate && new Date(offer.departureDate).toLocaleDateString('fr-FR')} au {offer.returnDate && new Date(offer.returnDate).toLocaleDateString('fr-FR')}
              </p>}
          </div>
          
          <div className="space-y-2">
            <Button className="w-full btn-travel" onClick={handleBookNow}>
              Procéder au paiement
            </Button>
            
            <Button variant="outline" className="w-full border-purple-700 text-purple-700" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Ajouter au panier
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
