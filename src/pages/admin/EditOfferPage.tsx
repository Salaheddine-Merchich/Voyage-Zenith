
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AdminSidebar } from "@/components/layout/AdminSidebar";
import { OfferForm } from "@/components/admin/OfferForm";
import { useOfferForm } from "@/hooks/useOfferForm";
import { OfferSubmitHandler } from "@/components/admin/OfferSubmitHandler";
import { OfferFormLoading } from "@/components/admin/OfferFormLoading";

const EditOfferPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { 
    formData, 
    startDate, 
    endDate, 
    isSubmitting, 
    isLoading, 
    setStartDate, 
    setEndDate, 
    setIsSubmitting, 
    handleFormDataChange 
  } = useOfferForm("edit");

  if (isLoading) {
    return <OfferFormLoading />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-travel-primary">Modifier une offre de voyage</h1>
          </div>
          
          <OfferSubmitHandler
            id={id}
            formData={formData}
            startDate={startDate}
            endDate={endDate}
            setIsSubmitting={setIsSubmitting}
            mode="edit"
          >
            {(handleSubmit) => (
              <OfferForm 
                formData={formData}
                startDate={startDate}
                endDate={endDate}
                isSubmitting={isSubmitting}
                mode="edit"
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

export default EditOfferPage;
