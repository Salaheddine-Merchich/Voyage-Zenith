
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { Booking } from "@/types/booking";

export const useBookings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);

  const fetchUserBookings = async () => {
    if (!user) return;
    
    try {
      setLoading(true);
      
      console.log("Fetching bookings for user:", user.id);
      
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          *,
          travel_offer:travel_offer_id (
            id, title, destination, type, price, image_url, start_date, end_date, duration
          ),
          payments (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
        
      if (error) {
        console.error("Error details:", error);
        throw error;
      }
      
      console.log("Fetched bookings data:", data);
      setBookings(data as Booking[] || []);
    } catch (error: any) {
      console.error("Error fetching bookings:", error);
      toast({
        title: "Erreur",
        description: "Impossible de charger vos réservations. Veuillez réessayer plus tard.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserBookings();
    
    // Configure real-time subscription
    if (user) {
      const channel = supabase
        .channel('user-bookings')
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'bookings',
          filter: `user_id=eq.${user.id}`
        }, (payload) => {
          console.log("Booking change detected:", payload);
          fetchUserBookings();
        })
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'payments'
        }, (payload) => {
          console.log("Payment change detected:", payload);
          fetchUserBookings();
        })
        .subscribe();
        
      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [user, toast]);

  return {
    bookings,
    loading,
    refetch: fetchUserBookings
  };
};
