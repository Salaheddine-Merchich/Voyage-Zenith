
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TravelCard } from "@/components/travel/TravelCard";
import { Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { TravelOffer } from "@/types/booking";
import { Button } from "@/components/ui/button";

export function PromotionalOffersSection() {
  const [promotionalOffers, setPromotionalOffers] = useState<TravelOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchOffers = async () => {
    try {
      setIsLoading(true);
      
      // Get promotional offers (with old_price not null) (limit to 4)
      const { data, error } = await supabase
        .from('travel_offers')
        .select('*')
        .not('old_price', 'is', null)
        .limit(4)
        .order('created_at', { ascending: false });
        
      if (error) {
        throw error;
      }
      
      setPromotionalOffers(data || []);
    } catch (error: any) {
      console.error("Error fetching promotional offers:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOffers();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('promo_offers_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'travel_offers' 
        }, 
        (payload) => {
          console.log('Change received in PromotionalOffersSection:', payload);
          
          if (payload.eventType === 'DELETE') {
            // Remove deleted offer from state
            setPromotionalOffers(current => 
              current.filter(offer => offer.id !== payload.old.id)
            );
          } else {
            // Refetch data for other changes
            fetchOffers();
          }
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <section className="travel-container mt-16">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <div className="promo-icon">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="section-title">Offres promotionnelles</h2>
            <p className="section-subtitle">Profitez de nos réductions exceptionnelles</p>
          </div>
        </div>
        <Button asChild variant="outline" className="border-purple-700 text-purple-700">
          <Link to="/search?promotional=true">Voir toutes les offres promotionnelles</Link>
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-travel-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promotionalOffers.length > 0 ? (
            promotionalOffers.map(offer => (
              <div key={offer.id} className="relative">
                <TravelCard
                  id={offer.id}
                  title={offer.title}
                  destination={offer.destination}
                  image={offer.image_url || "https://placehold.co/600x400?text=Voyage"}
                  price={offer.price}
                  oldPrice={offer.old_price || undefined}
                  duration={`${offer.duration || 7} jours`}
                  type={offer.type}
                  rating={4.5}
                />
              </div>
            ))
          ) : (
            <div className="col-span-4 text-center py-10">
              <p className="text-gray-500">Aucune offre promotionnelle disponible pour le moment.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
