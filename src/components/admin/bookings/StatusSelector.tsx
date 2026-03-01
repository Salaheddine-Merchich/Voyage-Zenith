
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface StatusSelectorProps {
  status: string;
  onStatusChange: (value: string) => void;
}

export const StatusSelector = ({ status, onStatusChange }: StatusSelectorProps) => {
  return (
    <Select
      value={status}
      onValueChange={onStatusChange}
    >
      <SelectTrigger className="w-32">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en attente">En attente</SelectItem>
        <SelectItem value="confirmée">Confirmée</SelectItem>
        <SelectItem value="annulée">Annulée</SelectItem>
      </SelectContent>
    </Select>
  );
};
