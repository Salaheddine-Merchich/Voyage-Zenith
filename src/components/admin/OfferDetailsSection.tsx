
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OfferDetailsSectionProps {
  title: string;
  destination: string;
  type: string;
  price: string;
  oldPrice: string;
  availableSpots: string;
  onFormDataChange: (name: string, value: string) => void;
}

export const OfferDetailsSection = ({
  title,
  destination,
  type,
  price,
  oldPrice,
  availableSpots,
  onFormDataChange,
}: OfferDetailsSectionProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onFormDataChange(name, value);
  };
  
  const handleSelectChange = (name: string, value: string) => {
    onFormDataChange(name, value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="title">Titre de l'offre</Label>
        <Input
          id="title"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="Ex: Séjour de rêve à Paris"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="destination">Destination</Label>
        <Input
          id="destination"
          name="destination"
          value={destination}
          onChange={handleChange}
          placeholder="Ex: Paris, France"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="type">Type d'offre</Label>
        <Select
          value={type}
          onValueChange={(value) => handleSelectChange("type", value)}
        >
          <SelectTrigger id="type">
            <SelectValue placeholder="Sélectionner un type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="flight">Vol</SelectItem>
            <SelectItem value="hotel">Hôtel</SelectItem>
            <SelectItem value="package">Séjour</SelectItem>
            <SelectItem value="circuit">Circuit</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="price">Prix (€)</Label>
        <Input
          id="price"
          name="price"
          type="number"
          min="0"
          step="0.01"
          value={price}
          onChange={handleChange}
          placeholder="Ex: 599.99"
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="oldPrice">Prix barré (si promotion)</Label>
        <Input
          id="oldPrice"
          name="oldPrice"
          type="number"
          min="0"
          step="0.01"
          value={oldPrice}
          onChange={handleChange}
          placeholder="Ex: 799.99"
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="availableSpots">Nombre de places disponibles</Label>
        <Input
          id="availableSpots"
          name="availableSpots"
          type="number"
          min="1"
          value={availableSpots}
          onChange={handleChange}
          required
        />
      </div>
    </div>
  );
};
