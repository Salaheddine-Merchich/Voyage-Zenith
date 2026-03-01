
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/contexts/CartContext";
import { useTravelOffer } from "@/hooks/useTravelOffer";
import { LoadingState } from "@/components/travel/detail/LoadingState";
import { NotFoundState } from "@/components/travel/detail/NotFoundState";
import { TravelHero } from "@/components/travel/detail/TravelHero";
import { TravelTabs } from "@/components/travel/detail/TravelTabs";
import { BookingCard } from "@/components/travel/detail/BookingCard";

const TravelDetailPage = () => {
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { offer, isLoading } = useTravelOffer();
  
  const handleAddToCart = () => {
    if (!offer) return;
    addToCart({
      id: offer.id,
      title: offer.title,
      destination: offer.destination,
      image: offer.image || offer.image_url || "https://placehold.co/600x400?text=Voyage",
      price: offer.price,
      type: offer.type
    }, quantity);
    toast({
      title: "Ajouté au panier",
      description: `${quantity} x ${offer.title} a été ajouté au panier`
    });
  };
  
  const handleBookNow = () => {
    if (!offer) return;

    // First add to cart
    addToCart({
      id: offer.id,
      title: offer.title,
      destination: offer.destination,
      image: offer.image || offer.image_url || "https://placehold.co/600x400?text=Voyage",
      price: offer.price,
      type: offer.type
    }, quantity);
    toast({
      title: "Réservation en cours",
      description: "Vous allez être redirigé vers la page de paiement"
    });
    // Navigate to the payment page
    navigate("/payment", {
      state: {
        offerId: offer.id,
        offerTitle: offer.title,
        quantity: quantity,
        totalPrice: offer.price * quantity
      }
    });
  };
  
  if (isLoading) {
    return <LoadingState />;
  }
  
  if (!offer) {
    return <NotFoundState />;
  }

  // Define typeLabel based on offer.type
  const typeLabel = {
    flight: "Vol",
    hotel: "Hôtel",
    package: "Séjour",
    circuit: "Circuit"
  }[offer.type] || offer.type;
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <TravelHero offer={offer} typeLabel={typeLabel} />
      
      {/* Content Section */}
      <section className="travel-container py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <TravelTabs offer={offer} />
          </div>
          
          {/* Booking Card */}
          <div>
            <BookingCard
              offer={offer}
              quantity={quantity}
              setQuantity={setQuantity}
              handleBookNow={handleBookNow}
              handleAddToCart={handleAddToCart}
            />
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default TravelDetailPage;
