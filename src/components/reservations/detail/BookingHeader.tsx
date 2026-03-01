
import React from "react";
import { Booking } from "@/types/booking";
import { getTypeIcon, typeLabels, getStatusBadgeClass } from "@/components/reservations/BookingCard";
import { formatPrice } from "@/lib/utils";
import { Star, StarHalf, StarOff } from "lucide-react";

type BookingHeaderProps = {
  booking: Booking;
};

// Generate a consistent but "random" rating based on booking ID
const generateRating = (bookingId: string): number => {
  // Use the booking ID to generate a deterministic but seemingly random rating
  let hash = 0;
  for (let i = 0; i < bookingId.length; i++) {
    hash = ((hash << 5) - hash) + bookingId.charCodeAt(i);
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Generate a number between 1 and 5, with one decimal place
  const rating = Math.abs(hash % 41) / 10 + 1;
  return Math.min(5, Math.max(1, rating)); // Ensure between 1-5
};

// Function to render star rating component
const StarRating: React.FC<{ rating: number }> = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  
  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
      ))}
      {halfStar && (
        <StarHalf className="h-4 w-4 text-yellow-500 fill-yellow-500" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOff key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      ))}
      <span className="ml-1 text-sm font-medium text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
};

export const BookingHeader = ({ booking }: BookingHeaderProps) => {
  // Generate rating based on the booking ID
  const rating = generateRating(booking.id);
  
  return (
    <div className="border-b p-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block px-3 py-1 text-sm border rounded-md">
              {getTypeIcon(booking?.travel_offer?.type)} {typeLabels[booking?.travel_offer?.type] || booking?.travel_offer?.type}
            </span>
            <span className={`inline-block px-3 py-1 text-sm border rounded-md ${getStatusBadgeClass(booking?.status || '')}`}>
              {booking?.status}
            </span>
          </div>
          <h1 className="text-2xl font-bold">{booking?.travel_offer?.title}</h1>
          {/* Add star rating */}
          <div className="mt-2">
            <StarRating rating={rating} />
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500 mb-1">Réservation #{booking?.id.substring(0, 8)}</p>
          <p className="text-2xl font-bold text-travel-primary">{formatPrice(booking?.total_price || 0)}</p>
        </div>
      </div>
    </div>
  );
};
