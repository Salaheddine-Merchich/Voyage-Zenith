
import React from "react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionSectionProps {
  description: string;
  onChange: (name: string, value: string) => void;
}

export const DescriptionSection = ({ description, onChange }: DescriptionSectionProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        name="description"
        value={description}
        onChange={handleChange}
        placeholder="Décrivez l'offre en détail..."
        rows={5}
        required
      />
    </div>
  );
};
