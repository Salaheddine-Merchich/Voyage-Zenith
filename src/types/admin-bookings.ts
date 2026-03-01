
import { Payment } from "./booking";

export interface AdminBooking {
  id: string;
  user_id: string;
  travel_offer_id: string;
  number_of_travelers: number;
  total_price: number;
  payment_reference: string | null;
  status: string;
  created_at: string;
  payments: Payment[] | null;
  profiles: {
    first_name: string | null;
    last_name: string | null;
    email?: string | null;
  } | null;
  travel_offers: {
    title: string;
    destination: string;
    type: string;
  } | null;
}

export interface TravelOfferFormData {
  title: string;
  destination: string;
  price: string;
  oldPrice: string;
  description: string;
  type: string;
  availableSpots: string;
  duration: string;
  imageUrl: string;
}
