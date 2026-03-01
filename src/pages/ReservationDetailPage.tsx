
import React from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useReservationDetail } from "@/hooks/useReservationDetail";
import { BookingHeader } from "@/components/reservations/detail/BookingHeader";
import { TravelDetails } from "@/components/reservations/detail/TravelDetails";
import { BookingSummary } from "@/components/reservations/detail/BookingSummary";
import { PaymentStatus } from "@/components/reservations/detail/PaymentStatus";
import { LoadingState } from "@/components/reservations/detail/LoadingState";
import { NotFoundState } from "@/components/reservations/detail/NotFoundState";

const ReservationDetailPage = () => {
  const navigate = useNavigate();
  const { booking, loading, handleCancel } = useReservationDetail();

  if (loading) {
    return <LoadingState />;
  }

  if (!booking) {
    return <NotFoundState />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="travel-container py-8 flex-grow">
        <Button
          variant="ghost"
          className="mb-6 flex items-center"
          onClick={() => navigate("/my-reservations")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Retour à mes réservations
        </Button>
        
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          {/* Header */}
          <BookingHeader booking={booking} />
          
          {/* Main content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Left column - Image and offer details */}
            <div className="md:col-span-2">
              <TravelDetails booking={booking} />
            </div>
            
            {/* Right column - Booking summary */}
            <div className="space-y-6">
              <BookingSummary booking={booking} />
              <PaymentStatus booking={booking} onCancel={handleCancel} />
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ReservationDetailPage;
