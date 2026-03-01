
import { AdminBooking } from "@/types/admin-bookings";

export const getStatusBadgeClass = (status: string) => {
  switch (status) {
    case "confirmée":
      return "bg-green-100 text-green-800";
    case "en attente":
      return "bg-yellow-100 text-yellow-800";
    case "annulée":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const getClientName = (booking: AdminBooking) => {
  if (booking.profiles && booking.profiles.first_name && booking.profiles.last_name) {
    return `${booking.profiles.first_name} ${booking.profiles.last_name}`;
  }
  return booking.user_id.startsWith('guest-') ? 'Client invité' : "Client inconnu";
};

export const getPaymentStatus = (booking: AdminBooking) => {
  if (booking.payments && booking.payments.length > 0) {
    const payment = booking.payments[0];
    return {
      text: payment.status === 'completed' ? 'Payé' : 
            payment.status === 'pending' ? 'En attente' : payment.status,
      className: payment.status === 'completed' ? 'bg-green-100 text-green-800' : 
               payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
               'bg-gray-100 text-gray-800'
    };
  }
  return {
    text: "Non payé",
    className: "text-gray-500"
  };
};
