
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TravelOfferFormData } from "@/types/admin-bookings";
import { TravelOffer } from "@/types/booking";

export const useOfferForm = (mode: "add" | "edit") => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(mode === "edit");
  
  const [formData, setFormData] = useState<TravelOfferFormData>({
    title: "",
    destination: "",
    price: "",
    oldPrice: "",
    description: "",
    type: "package",
    availableSpots: "10",
    duration: "7",
    imageUrl: ""
  });
  
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  
  // Fetch the offer data when the component mounts (only for edit mode)
  useEffect(() => {
    async function fetchOfferData() {
      if (mode !== "edit" || !id) return;
      
      try {
        setIsLoading(true);
        
        const { data, error } = await supabase
          .from('travel_offers')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) {
          console.error("Erreur lors de la récupération de l'offre:", error);
          throw error;
        }
        
        if (data) {
          // Ensure we're using the correct type for the data
          const offerData = data as TravelOffer;
          
          setFormData({
            title: offerData.title || "",
            destination: offerData.destination || "",
            price: offerData.price?.toString() || "",
            oldPrice: offerData.old_price?.toString() || "",  // Use old_price from the database
            description: offerData.description || "",
            type: offerData.type || "package",
            availableSpots: offerData.available_spots?.toString() || "10",
            duration: offerData.duration?.toString() || "7",
            imageUrl: offerData.image_url || ""
          });
          
          if (offerData.start_date) {
            setStartDate(new Date(offerData.start_date));
          }
          
          if (offerData.end_date) {
            setEndDate(new Date(offerData.end_date));
          }
        }
      } catch (error: any) {
        console.error("Erreur lors du chargement de l'offre:", error);
        toast({
          title: "Erreur",
          description: `Impossible de charger les détails de l'offre: ${error.message || "Erreur inconnue"}`,
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchOfferData();
  }, [id, toast, mode]);
  
  const handleFormDataChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return {
    formData,
    startDate,
    endDate,
    isSubmitting,
    isLoading,
    setStartDate,
    setEndDate,
    setIsSubmitting,
    handleFormDataChange
  };
};
