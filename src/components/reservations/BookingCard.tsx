
import React from "react";
import { useNavigate } from "react-router-dom";
import { formatDate, formatPrice } from "@/lib/utils";
import { CalendarIcon, MapPin, AlertCircle, Package, InfoIcon, CreditCard, Tag } from "lucide-react";
import { Star, StarHalf, StarOff } from "lucide-react"; // Import star icons
import { Button } from "@/components/ui/button";
import { Payment, Booking } from "@/types/booking";

type BookingCardProps = {
  booking: Booking;
};

export const typeLabels: Record<string, string> = {
  flight: "Vol",
  hotel: "Hôtel",
  package: "Séjour",
  circuit: "Circuit",
};

export const typeIcons = {
  flight: "✈️",
  hotel: "🏨",
  package: "🎁",
  circuit: "🗺️"
};

export const getTypeIcon = (type: string) => {
  return typeIcons[type as keyof typeof typeIcons] || "📍";
};

export const getStatusBadgeClass = (status: string) => {
  switch (status.toLowerCase()) {
    case "confirmée":
      return "bg-green-100 text-green-800 border-green-200";
    case "en attente":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "annulée":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
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

const getPaymentStatus = (booking: Booking) => {
  if (booking.payments && booking.payments.length > 0) {
    const payment = booking.payments[0];
    return (
      <div className="flex items-center text-gray-600 mt-1">
        <CreditCard className="h-4 w-4 mr-2 text-travel-secondary" />
        <span>Paiement: </span>
        <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
          payment.status === 'completed' ? 'bg-green-100 text-green-800' : 
          payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
          'bg-gray-100 text-gray-800'
        }`}>
          {payment.status === 'completed' ? 'Payé' : 
          payment.status === 'pending' ? 'En attente' : payment.status}
        </span>
        <span className="ml-2 text-xs">({payment.payment_method})</span>
      </div>
    );
  }
  return (
    <div className="flex items-center text-gray-600 mt-1">
      <CreditCard className="h-4 w-4 mr-2 text-travel-secondary" />
      <span>Paiement: </span>
      <span className="ml-2 text-xs text-gray-500">Non payé</span>
    </div>
  );
};

export const BookingCard: React.FC<BookingCardProps> = ({ booking }) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/reservation/${booking.id}`, { state: { booking } });
  };
  
  // Calculate discount percentage if oldPrice exists
  const discountPercentage = booking.travel_offer?.oldPrice 
    ? Math.round((1 - (booking.travel_offer.price / booking.travel_offer.oldPrice)) * 100) 
    : 0;
  
  // Generate a rating based on booking ID
  const rating = generateRating(booking.id);
  
  return (
    <div 
      className="bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="grid grid-cols-1 md:grid-cols-4">
        {/* Image */}
        <div className="md:col-span-1 h-48 md:h-full overflow-hidden bg-gray-100">
          {booking.travel_offer?.image_url ? (
            <img 
              src={booking.travel_offer.image_url} 
              alt={booking.travel_offer.title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <Package className="h-12 w-12 text-gray-400" />
            </div>
          )}
        </div>
        
        {/* Info */}
        <div className="md:col-span-3 p-5">
          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block px-2 py-1 text-xs border rounded-md">
                  {getTypeIcon(booking.travel_offer?.type)} {typeLabels[booking.travel_offer?.type] || booking.travel_offer?.type}
                </span>
                <span className={`inline-block px-2 py-1 text-xs border rounded-md ${getStatusBadgeClass(booking.status)}`}>
                  {booking.status}
                </span>
              </div>
              <h2 className="text-xl font-semibold mt-2">{booking.travel_offer?.title || "Offre indisponible"}</h2>
              {/* Add the star rating component */}
              <div className="mt-1">
                <StarRating rating={rating} />
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Réservé le {formatDate(booking.created_at)}</p>
              <p className="text-xl font-bold text-travel-primary mt-1">
                {formatPrice(booking.total_price)}
              </p>
              {booking.travel_offer?.oldPrice && booking.travel_offer.oldPrice > booking.travel_offer.price && (
                <div className="flex items-center text-xs text-green-600 justify-end space-x-1">
                  <Tag className="h-3 w-3" />
                  <span>Économie de {discountPercentage}%</span>
                  <span className="text-gray-500 line-through">{formatPrice(booking.travel_offer.oldPrice * booking.number_of_travelers)}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="flex items-center text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-travel-secondary" />
                {booking.travel_offer?.destination || "Destination non spécifiée"}
              </p>
              <p className="flex items-center text-gray-600 mt-1">
                <CalendarIcon className="h-4 w-4 mr-2 text-travel-secondary" />
                {booking.travel_offer?.start_date ? (
                  <>Du {formatDate(booking.travel_offer?.start_date)} au {formatDate(booking.travel_offer?.end_date)}</>
                ) : (
                  <>Durée: {booking.travel_offer?.duration !== null ? `${booking.travel_offer?.duration} jours` : "Non spécifiée"}</>
                )}
              </p>
              {getPaymentStatus(booking)}
            </div>
            <div>
              <p className="flex items-center text-gray-600">
                <InfoIcon className="h-4 w-4 mr-2 text-travel-secondary" />
                {booking.number_of_travelers} {booking.number_of_travelers > 1 ? "voyageurs" : "voyageur"}
              </p>
              {booking.payment_reference && (
                <p className="flex items-center text-gray-600 mt-1">
                  <AlertCircle className="h-4 w-4 mr-2 text-travel-secondary" />
                  Réf: {booking.payment_reference.substring(0, 12)}...
                </p>
              )}
            </div>
          </div>
          
          <div className="mt-5 flex justify-end gap-3">
            <Button variant="outline" onClick={handleViewDetails}>
              Détails
            </Button>
            {booking.status.toLowerCase() !== "annulée" && (
              <Button variant="destructive">
                Annuler
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
