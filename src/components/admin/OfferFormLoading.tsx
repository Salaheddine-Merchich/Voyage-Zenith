
import React from "react";
import { AdminSidebar } from "@/components/layout/AdminSidebar";

export const OfferFormLoading = () => {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6 flex justify-center items-center h-full">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-travel-primary"></div>
        </div>
      </div>
    </div>
  );
};
