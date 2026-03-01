
import React from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminBookings } from "@/hooks/useAdminBookings";
import { BookingsTable } from "@/components/admin/bookings/BookingsTable";
import { BookingsLoading } from "@/components/admin/bookings/BookingsLoading";
import { EmptyBookings } from "@/components/admin/bookings/EmptyBookings";

const BookingsManagementPage = () => {
  const { bookings, loading, updateBookingStatus } = useAdminBookings();
  
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-travel-primary">Gestion des réservations</h1>
          </div>
          
          {loading ? (
            <BookingsLoading />
          ) : bookings.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Réservations</CardTitle>
              </CardHeader>
              <CardContent>
                <BookingsTable 
                  bookings={bookings}
                  onStatusChange={updateBookingStatus}
                />
              </CardContent>
            </Card>
          ) : (
            <EmptyBookings />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingsManagementPage;
