
import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Booking } from "@/types/booking";

export const useReservationDetail = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [booking, setBooking] = useState<Booking | null>(location.state?.booking || null);
  const [loading, setLoading] = useState(!booking);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (booking || !id || !user) return;
      
      try {
        setLoading(true);
        
        const { data, error } = await supabase
          .from('bookings')
          .select(`
            *,
            travel_offer:travel_offer_id (*),
            payments (*)
          `)
          .eq('id', id)
          .eq('user_id', user.id)
          .single();
          
        if (error) throw error;
        
        setBooking(data as Booking);
      } catch (error: any) {
        console.error("Error fetching booking details:", error);
        toast({
          title: "Erreur",
          description: "Impossible de charger les détails de cette réservation.",
          variant: "destructive",
        });
        navigate("/my-reservations");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingDetails();
  }, [id, booking, toast, navigate, user]);

  const handleCancel = async () => {
    if (!booking || !user) return;
    
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'annulée' })
        .eq('id', booking.id)
        .eq('user_id', user.id);
        
      if (error) throw error;
      
      // Update local state
      setBooking({
        ...booking,
        status: 'annulée'
      });
      
      toast({
        title: "Réservation annulée",
        description: "Votre réservation a été annulée avec succès.",
      });
    } catch (error: any) {
      console.error("Error cancelling booking:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'annuler cette réservation. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return {
    booking,
    loading,
    handleCancel
  };
};
