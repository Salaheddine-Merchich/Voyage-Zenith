
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { AdminBooking } from "@/types/admin-bookings";

export const useAdminBookings = () => {
  const { toast } = useToast();
  const [bookings, setBookings] = useState<AdminBooking[]>([]);
  const [loading, setLoading] = useState(true);
  
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          profiles:user_id (first_name, last_name, email),
          travel_offers:travel_offer_id (title, destination, type),
          payments (*)
        `)
        .order('created_at', { ascending: false });
        
      if (error) throw error;
      
      // Process the data to ensure it matches our AdminBooking interface
      const processedBookings: AdminBooking[] = (data || []).map(booking => ({
        ...booking,
        profiles: booking.profiles && typeof booking.profiles === 'object' ? booking.profiles : null,
        travel_offers: booking.travel_offers && typeof booking.travel_offers === 'object' ? booking.travel_offers : null,
        payments: booking.payments || null
      }));
      
      setBookings(processedBookings);
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de charger les réservations",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: newStatus })
        .eq('id', bookingId);
        
      if (error) throw error;
      
      // Update local state
      setBookings(prev => 
        prev.map(booking => 
          booking.id === bookingId ? { ...booking, status: newStatus } : booking
        )
      );
      
      toast({
        title: "Statut mis à jour",
        description: "Le statut de la réservation a été mis à jour avec succès."
      });
      
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message || "Impossible de mettre à jour le statut",
        variant: "destructive"
      });
    }
  };
  
  useEffect(() => {
    fetchBookings();
    
    // Set up realtime subscription
    const channel = supabase
      .channel('bookings_changes')
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'bookings' },
          () => fetchBookings())
      .on('postgres_changes', 
          { event: '*', schema: 'public', table: 'payments' },
          () => fetchBookings())
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return {
    bookings,
    loading,
    updateBookingStatus,
    refreshBookings: fetchBookings
  };
};
