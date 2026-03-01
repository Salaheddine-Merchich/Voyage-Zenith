
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { OfferTypeBadge } from "./OfferTypeBadge";
import { TravelOffer } from "@/types/booking";

interface OffersTableProps {
  offers: TravelOffer[];
  onDeleteClick: (id: string) => void;
}

export const OffersTable = ({ offers, onDeleteClick }: OffersTableProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Titre</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Destination</TableHead>
            <TableHead>Prix</TableHead>
            <TableHead>Places</TableHead>
            <TableHead>Date départ</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {offers.map((offer) => (
            <TableRow key={offer.id}>
              <TableCell className="font-medium">{offer.title}</TableCell>
              <TableCell><OfferTypeBadge type={offer.type} /></TableCell>
              <TableCell>{offer.destination}</TableCell>
              <TableCell>
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR",
                }).format(offer.price)}
              </TableCell>
              <TableCell>{offer.available_spots}</TableCell>
              <TableCell>
                {offer.start_date ? format(new Date(offer.start_date), "dd/MM/yyyy", { locale: fr }) : "N/A"}
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/admin/offers/edit/${offer.id}`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteClick(offer.id)}
                    className="hover:bg-red-100 hover:text-red-600"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
