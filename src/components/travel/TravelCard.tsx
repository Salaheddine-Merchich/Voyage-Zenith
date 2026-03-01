
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Info } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";

interface TravelCardProps {
  id: string;
  title: string;
  destination: string;
  image: string;
  price: number;
  oldPrice?: number;
  duration: string;
  type: string;
  rating?: number;
}

export function TravelCard({
  id,
  title,
  destination,
  image,
  price,
  oldPrice,
  duration,
  type,
  rating,
}: TravelCardProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addToCart } = useCart();
  
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);

  const formattedOldPrice = oldPrice ? new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(oldPrice) : null;

  // Define typeLabel properly here
  const typeLabel = {
    flight: "Vol",
    hotel: "Hôtel",
    package: "Séjour",
    circuit: "Circuit",
  }[type] || type;

  const handleReservationClick = () => {
    addToCart({
      id,
      title,
      destination,
      image,
      price,
      oldPrice, // Add oldPrice to cart item
      type
    }, 1);
    
    toast({
      title: "Ajouté au panier",
      description: `${title} a été ajouté à votre panier`,
    });
  };

  const discountPercentage = oldPrice ? Math.round((1 - (price / oldPrice)) * 100) : 0;

  return (
    <Card className="card-travel group h-full flex flex-col">
      <div className="card-image-container relative">
        <img src={image} alt={title} className="card-image" />
        <div className="card-overlay"></div>
        
        {oldPrice && (
          <Badge className="badge-promo absolute top-3 right-3">{discountPercentage}% OFF</Badge>
        )}
        
        <Badge className="badge-type absolute top-3 left-3">{typeLabel}</Badge>
        
        <div className="card-action-buttons absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button 
            className="btn-travel shadow-lg"
            size="sm"
            onClick={handleReservationClick}
          >
            <ShoppingCart className="h-4 w-4 mr-1" />
            Réserver
          </Button>
        </div>
      </div>
      
      <CardContent className="flex-grow pt-4">
        <div className="mb-2">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-muted-foreground text-sm">{destination}</p>
        </div>
        <div className="flex justify-between items-center mt-2">
          <div>
            <p className="text-sm text-muted-foreground">{duration}</p>
          </div>
          {rating && (
            <div className="flex items-center">
              <span className="text-yellow-500 mr-1">★</span>
              <span className="text-sm font-medium">{rating}</span>
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between items-center border-t pt-4">
        <div>
          <div className="font-medium text-lg text-purple-700">{formattedPrice}</div>
          {formattedOldPrice && (
            <div className="text-sm text-gray-500 line-through">{formattedOldPrice}</div>
          )}
        </div>
        <Button 
          asChild
          variant="outline" 
          className="border-purple-700 text-purple-700 hover:bg-purple-700 hover:text-white"
        >
          <Link to={`/travel/${id}`}>
            <Info className="h-4 w-4 mr-1" />
            Détails
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
