
import React from "react";
import { BookingCard } from "./BookingCard";
import { EmptyReservations } from "./EmptyReservations";
import { Booking } from "@/types/booking";

type ReservationsListProps = {
  bookings: Booking[];
  loading: boolean;
};

export const ReservationsList: React.FC<ReservationsListProps> = ({ bookings, loading }) => {
  if (loading) {
    return (
      <div className="flex-grow flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-travel-primary"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return <EmptyReservations />;
  }

  return (
    <div className="space-y-6">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
};
