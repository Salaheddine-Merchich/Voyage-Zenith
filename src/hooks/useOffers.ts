
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TravelOffer } from "@/types/booking";

export const useOffers = () => {
  const { toast } = useToast();
  const [offers, setOffers] = useState<TravelOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [offerToDelete, setOfferToDelete] = useState<string | null>(null);
  
  const fetchOffers = async () => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('travel_offers')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      setOffers(data || []);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger les offres",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchOffers();
    
    // Set up realtime subscription to listen for changes to the travel_offers table
    const channel = supabase
      .channel('travel_offers_changes')
      .on('postgres_changes', 
        { 
          event: '*', 
          schema: 'public', 
          table: 'travel_offers' 
        }, 
        (payload) => {
          console.log('Change received!', payload);
          fetchOffers(); // Refresh the data when any change occurs
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
  const handleDeleteClick = (id: string) => {
    setOfferToDelete(id);
    setDeleteDialogOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!offerToDelete) return;
    
    try {
      // Delete the offer permanently from the database
      const { error } = await supabase
        .from('travel_offers')
        .delete()
        .eq('id', offerToDelete);
        
      if (error) throw error;
      
      toast({
        title: "Offre supprimée",
        description: "L'offre a été supprimée définitivement avec succès."
      });
      
      // Immediately update local state to remove the deleted offer
      setOffers(prevOffers => prevOffers.filter(offer => offer.id !== offerToDelete));
      
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de supprimer l'offre",
        variant: "destructive"
      });
    } finally {
      setDeleteDialogOpen(false);
      setOfferToDelete(null);
    }
  };

  return {
    offers,
    loading,
    deleteDialogOpen,
    offerToDelete,
    setDeleteDialogOpen,
    handleDeleteClick,
    confirmDelete,
    fetchOffers
  };
};
