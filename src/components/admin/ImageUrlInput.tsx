
import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUrlInputProps {
  imageUrl: string;
  onChange: (value: string) => void;
}

export const ImageUrlInput = ({ imageUrl, onChange }: ImageUrlInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };
  
  return (
    <div className="space-y-2">
      <Label htmlFor="imageUrl">URL de l'image</Label>
      <Input
        id="imageUrl"
        name="imageUrl"
        value={imageUrl}
        onChange={handleChange}
        placeholder="https://example.com/image.jpg"
      />
      <p className="text-xs text-gray-500">Laissez vide pour utiliser une image par défaut</p>
    </div>
  );
};
