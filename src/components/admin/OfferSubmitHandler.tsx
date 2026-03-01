
import React from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { TravelOfferFormData } from "@/types/admin-bookings";

interface OfferSubmitHandlerProps {
  id?: string;
  formData: TravelOfferFormData;
  startDate: Date | undefined;
  endDate: Date | undefined;
  setIsSubmitting: (value: boolean) => void;
  mode: "add" | "edit";
  children: (handleSubmit: (e: React.FormEvent) => Promise<void>) => React.ReactNode;
}

export const OfferSubmitHandler = ({
  id,
  formData,
  startDate,
  endDate,
  setIsSubmitting,
  mode,
  children
}: OfferSubmitHandlerProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!startDate || !endDate) {
      toast({
        title: "Dates requises",
        description: "Veuillez sélectionner une date de début et de fin.",
        variant: "destructive"
      });
      return;
    }
    
    // Validate if end date is after start date
    if (startDate >= endDate) {
      toast({
        title: "Dates invalides",
        description: "La date de fin doit être postérieure à la date de début.",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Calculate duration in days
      const durationInDays = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      
      // Prepare offer data - include oldPrice if it's not empty
      const offerData = {
        title: formData.title,
        destination: formData.destination,
        price: parseFloat(formData.price),
        old_price: formData.oldPrice ? parseFloat(formData.oldPrice) : null,
        type: formData.type,
        description: formData.description,
        available_spots: parseInt(formData.availableSpots),
        duration: durationInDays,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        image_url: formData.imageUrl || "https://placehold.co/600x400?text=Voyage"
      };
      
      let error;
      
      if (mode === "edit" && id) {
        // Use direct update for now to include old_price field
        const { error: updateError } = await supabase
          .from('travel_offers')
          .update({
            title: offerData.title,
            destination: offerData.destination,
            price: offerData.price,
            old_price: offerData.old_price,
            type: offerData.type,
            description: offerData.description,
            available_spots: offerData.available_spots,
            duration: offerData.duration,
            start_date: offerData.start_date,
            end_date: offerData.end_date,
            image_url: offerData.image_url
          })
          .eq('id', id);
        
        error = updateError;
        
      } else {
        // Use direct insert for now to include old_price field
        const { error: insertError } = await supabase
          .from('travel_offers')
          .insert({
            title: offerData.title,
            destination: offerData.destination,
            price: offerData.price,
            old_price: offerData.old_price,
            type: offerData.type,
            description: offerData.description,
            available_spots: offerData.available_spots,
            duration: offerData.duration,
            start_date: offerData.start_date,
            end_date: offerData.end_date,
            image_url: offerData.image_url
          });
        
        error = insertError;
      }
      
      if (error) {
        throw error;
      }
      
      toast({
        title: mode === "add" ? "Offre ajoutée" : "Offre mise à jour",
        description: mode === "add" 
          ? "L'offre a été ajoutée avec succès et est visible pour les clients."
          : "L'offre a été mise à jour avec succès et les changements sont visibles pour les clients."
      });
      
      // Redirect to offers list
      navigate("/admin/offers");
      
    } catch (error: any) {
      console.error("Détails de l'erreur:", error);
      toast({
        title: "Erreur",
        description: `Une erreur s'est produite: ${error.message || "Erreur inconnue"}. Veuillez réessayer.`,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return <>{children(handleSubmit)}</>;
};
