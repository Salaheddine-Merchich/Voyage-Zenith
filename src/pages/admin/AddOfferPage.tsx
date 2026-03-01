
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { OfferForm } from "@/components/admin/OfferForm";
import { useOfferForm } from "@/hooks/useOfferForm";
import { OfferSubmitHandler } from "@/components/admin/OfferSubmitHandler";

const AddOfferPage = () => {
  const navigate = useNavigate();
  const { 
    formData, 
    startDate, 
    endDate, 
    isSubmitting, 
    setStartDate, 
    setEndDate, 
    setIsSubmitting, 
    handleFormDataChange 
  } = useOfferForm("add");

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-travel-primary">Ajouter une offre de voyage</h1>
          </div>
          
          <OfferSubmitHandler
            formData={formData}
            startDate={startDate}
            endDate={endDate}
            setIsSubmitting={setIsSubmitting}
            mode="add"
          >
            {(handleSubmit) => (
              <OfferForm 
                formData={formData}
                startDate={startDate}
                endDate={endDate}
                isSubmitting={isSubmitting}
                mode="add"
                onSubmit={handleSubmit}
                onFormDataChange={handleFormDataChange}
                onStartDateChange={setStartDate}
                onEndDateChange={setEndDate}
                onCancel={() => navigate("/admin/offers")}
              />
            )}
          </OfferSubmitHandler>
        </div>
      </div>
    </div>
  );
};

export default AddOfferPage;
