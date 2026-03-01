
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { AdminBooking } from '@/types/admin-bookings';
import { getClientName, getPaymentStatus, getStatusBadgeClass } from '@/lib/booking-utils';
import { StatusSelector } from './StatusSelector';

interface BookingsTableProps {
  bookings: AdminBooking[];
  onStatusChange: (bookingId: string, newStatus: string) => void;
}

export const BookingsTable = ({ bookings, onStatusChange }: BookingsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Client</TableHead>
            <TableHead>Offre</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Voyageurs</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Paiement</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Statut</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id}>
              <TableCell>
                {getClientName(booking)}
              </TableCell>
              <TableCell>{booking.travel_offers?.title || "Offre inconnue"}</TableCell>
              <TableCell>{booking.travel_offers?.destination || "-"}</TableCell>
              <TableCell>{booking.number_of_travelers}</TableCell>
              <TableCell>
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                }).format(booking.total_price)}
              </TableCell>
              <TableCell>
                {booking.payments && booking.payments.length > 0 ? (
                  <span className={`px-2 py-1 rounded-full text-xs ${getPaymentStatus(booking).className}`}>
                    {getPaymentStatus(booking).text}
                  </span>
                ) : (
                  <span className="text-xs text-gray-500">Non payé</span>
                )}
              </TableCell>
              <TableCell>
                {format(new Date(booking.created_at), "dd/MM/yyyy HH:mm", { locale: fr })}
              </TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusBadgeClass(booking.status)}`}>
                  {booking.status}
                </span>
              </TableCell>
              <TableCell>
                <StatusSelector 
                  status={booking.status} 
                  onStatusChange={(value) => onStatusChange(booking.id, value)} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
