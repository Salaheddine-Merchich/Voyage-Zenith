
export type Payment = {
  id: string;
  amount: number;
  payment_method: string;
  status: string;
  payment_date: string;
};

export type TravelOffer = {
  id: string;
  title: string;
  destination: string;
  description?: string;
  type: string;
  price: number;
  old_price?: number | null;  // Added explicitly to match database field
  oldPrice?: number;          // Keep for backward compatibility
  image_url: string;
  image?: string;
  gallery?: string[];
  start_date: string | null;
  end_date: string | null;
  duration: number | null;
  departureDate?: string;
  returnDate?: string;
  rating?: number;
  reviews?: number;
  included?: string[];
  excluded?: string[];
  available_spots?: number;
  availability?: number;
  travelers_count?: number;
};

export type Booking = {
  id: string;
  travel_offer_id: string;
  user_id: string;
  number_of_travelers: number;
  total_price: number;
  payment_reference: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  payments: Payment[] | null;
  travel_offer: TravelOffer;
};
