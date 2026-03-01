
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { TravelOffer } from "@/types/booking";
import { useToast } from "@/hooks/use-toast";

export const useTravelOffer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [offer, setOffer] = useState<TravelOffer | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const fetchOfferData = async () => {
    if (!id) {
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('travel_offers')
        .select('*')
        .eq('id', id)
        .single();
        
      if (error) {
        throw error;
      }
      
      if (!data) {
        // Offer not found (may have been deleted)
        toast({
          title: "Offre non disponible",
          description: "Cette offre de voyage n'est plus disponible.",
        });
        navigate('/search');
        return;
      }
      
      // Transform offer data to match the expected format
      const transformedOffer: TravelOffer = {
        ...data,
        duration: data.duration || 7,
        image: data.image_url || "https://placehold.co/600x400?text=Voyage",
        gallery: data.images || [],
        departureDate: data.start_date,
        returnDate: data.end_date,
        oldPrice: data.price * 1.2, // Just for display purposes
        rating: 4.5,
        reviews: 12,
        availability: data.available_spots || 10,
        included: [
          "Vol aller-retour",
          "Hébergement en hôtel 4 étoiles",
          "Petit-déjeuner",
          "Transfert aéroport-hôtel"
        ],
        excluded: [
          "Assurance voyage",
          "Repas non mentionnés",
          "Activités optionnelles",
          "Pourboires"
        ],
      };
      
      setOffer(transformedOffer);
    } catch (error: any) {
      console.error("Error fetching travel offer:", error.message);
      setOffer(null);
      
      if (error.code === 'PGRST116') {
        // Record not found
        toast({
          title: "Offre non disponible",
          description: "Cette offre de voyage n'est plus disponible.",
        });
        navigate('/search');
      } else {
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de l'offre.",
          variant: "destructive"
        });
      }
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOfferData();
    
    // Set up realtime subscription to detect if the offer is deleted
    const channel = supabase
      .channel(`offer_${id}`)
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'travel_offers',
          filter: `id=eq.${id}`
        }, 
        (payload) => {
          console.log('Offer detail change received:', payload);
          
          if (payload.eventType === 'DELETE') {
            // The offer was deleted
            toast({
              title: "Offre supprimée",
              description: "Cette offre n'est plus disponible."
            });
            navigate('/search');
          } else if (payload.eventType === 'UPDATE') {
            // The offer was updated, refetch the data
            fetchOfferData();
          }
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [id, navigate]);
  
  return {
    offer,
    isLoading
  };
};
