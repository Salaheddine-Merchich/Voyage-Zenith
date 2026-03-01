
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OfferDetailsSection } from "./OfferDetailsSection";
import { DateRangeSelector } from "./DateRangeSelector";
import { ImageUrlInput } from "./ImageUrlInput";
import { DescriptionSection } from "./DescriptionSection";
import { TravelOfferFormData } from "@/types/admin-bookings";

interface OfferFormProps {
  formData: TravelOfferFormData;
  startDate: Date | undefined;
  endDate: Date | undefined;
  isSubmitting: boolean;
  mode: "add" | "edit";
  onSubmit: (e: React.FormEvent) => void;
  onFormDataChange: (name: string, value: string) => void;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onCancel: () => void;
}

export const OfferForm = ({
  formData,
  startDate,
  endDate,
  isSubmitting,
  mode,
  onSubmit,
  onFormDataChange,
  onStartDateChange,
  onEndDateChange,
  onCancel
}: OfferFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Détails de l'offre</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="space-y-6">
          <OfferDetailsSection
            title={formData.title}
            destination={formData.destination}
            type={formData.type}
            price={formData.price}
            oldPrice={formData.oldPrice}
            availableSpots={formData.availableSpots}
            onFormDataChange={onFormDataChange}
          />
          
          <DateRangeSelector
            startDate={startDate}
            endDate={endDate}
            onStartDateChange={onStartDateChange}
            onEndDateChange={onEndDateChange}
          />
          
          <ImageUrlInput
            imageUrl={formData.imageUrl}
            onChange={(value) => onFormDataChange("imageUrl", value)}
          />
          
          <DescriptionSection
            description={formData.description}
            onChange={onFormDataChange}
          />
          
          <div className="flex space-x-2">
            <Button
              type="submit"
              className="btn-travel"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? (mode === "add" ? "Ajout en cours..." : "Modification en cours...")
                : (mode === "add" ? "Ajouter l'offre" : "Mettre à jour l'offre")
              }
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Annuler
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
