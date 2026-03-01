
import { Badge } from "@/components/ui/badge";

type OfferType = "flight" | "hotel" | "package" | "circuit";

interface OfferTypeBadgeProps {
  type: string;
}

export const getOfferTypeLabel = (type: string): string => {
  const types = {
    flight: "Vol",
    hotel: "Hôtel",
    package: "Séjour",
    circuit: "Circuit"
  };
  return types[type as keyof typeof types] || type;
};

export const OfferTypeBadge = ({ type }: OfferTypeBadgeProps) => {
  const styles = {
    flight: "bg-blue-500",
    hotel: "bg-purple-500",
    package: "bg-green-500",
    circuit: "bg-orange-500"
  };
  
  return (
    <Badge className={styles[type as keyof typeof styles]}>
      {getOfferTypeLabel(type)}
    </Badge>
  );
};
