
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TravelCard } from "@/components/travel/TravelCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { TravelOffer } from "@/types/booking";

export function RegularTravelsSection() {
  const [regularTravels, setRegularTravels] = useState<TravelOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchOffers = async () => {
    try {
      setIsLoading(true);
      
      // Get regular travel offers (with old_price = null) (limit to 4)
      const { data, error } = await supabase
        .from('travel_offers')
        .select('*')
        .is('old_price', null)
        .limit(4)
        .order('created_at', { ascending: false });
          
      if (error) {
        throw error;
      }
      
      setRegularTravels(data || []);
    } catch (error: any) {
      console.error("Error fetching regular travel offers:", error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOffers();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('regular_travels_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'travel_offers' 
        }, 
        (payload) => {
          console.log('Change received in RegularTravelsSection:', payload);
          
          if (payload.eventType === 'DELETE') {
            // Remove deleted offer from state
            setRegularTravels(current => 
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
    <section className="travel-container mt-16 bg-gray-50 py-10 rounded-xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="section-title">Voyages Réguliers</h2>
          <p className="section-subtitle">Découvrez nos destinations sans promotion</p>
        </div>
        <Button asChild variant="outline" className="border-purple-700 text-purple-700">
          <Link to="/search?regular=true">Voir tous les voyages réguliers</Link>
        </Button>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-travel-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {regularTravels.length > 0 ? (
            regularTravels.map(travel => (
              <TravelCard
                key={travel.id}
                id={travel.id}
                title={travel.title}
                destination={travel.destination}
                image={travel.image_url || "https://placehold.co/600x400?text=Voyage"}
                price={travel.price}
                duration={`${travel.duration || 7} jours`}
                type={travel.type}
                rating={4.5}
              />
            ))
          ) : (
            <div className="col-span-4 text-center py-10">
              <p className="text-gray-500">Aucun voyage régulier disponible pour le moment.</p>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
