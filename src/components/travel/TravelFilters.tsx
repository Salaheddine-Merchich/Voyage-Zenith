
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface TravelFiltersProps {
  onFilterChange: (filters: any) => void;
  initialFilters?: {
    priceRange?: [number, number];
    types?: string[];
    sortBy?: string;
  };
}

export function TravelFilters({
  onFilterChange,
  initialFilters
}: TravelFiltersProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>(
    initialFilters?.priceRange || [0, 5000]
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    initialFilters?.types || []
  );
  const [sortBy, setSortBy] = useState(initialFilters?.sortBy || "recommended");
  
  useEffect(() => {
    if (initialFilters) {
      if (initialFilters.priceRange) setPriceRange(initialFilters.priceRange);
      if (initialFilters.types) setSelectedTypes(initialFilters.types);
      if (initialFilters.sortBy) setSortBy(initialFilters.sortBy);
    }
  }, [initialFilters]);

  const handleTypeChange = (type: string) => {
    setSelectedTypes(prev => 
      prev.includes(type) 
        ? prev.filter(t => t !== type) 
        : [...prev, type]
    );
  };
  
  const handleApplyFilters = () => {
    const filters = {
      priceRange,
      types: selectedTypes,
      sortBy
    };
    
    onFilterChange(filters);
    toast.success("Filtres appliqués avec succès");
  };
  
  const handleResetFilters = () => {
    setPriceRange([0, 5000]);
    setSelectedTypes([]);
    setSortBy("recommended");
    
    onFilterChange({
      priceRange: [0, 5000],
      types: [],
      sortBy: "recommended"
    });
    
    toast.info("Filtres réinitialisés");
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">Filtres</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="font-medium">Prix</h3>
          <div className="px-1">
            <Slider 
              defaultValue={priceRange} 
              min={0} 
              max={5000} 
              step={50} 
              value={priceRange} 
              onValueChange={(value) => setPriceRange(value as [number, number])} 
              className="mt-6" 
            />
            <div className="flex justify-between mt-2 text-sm">
              <div>
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR"
                }).format(priceRange[0])}
              </div>
              <div>
                {new Intl.NumberFormat("fr-FR", {
                  style: "currency",
                  currency: "EUR"
                }).format(priceRange[1])}
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Type de voyage</h3>
          <div className="space-y-2">
            {[
              { id: "flight", label: "Vol" },
              { id: "hotel", label: "Hôtel" },
              { id: "package", label: "Séjour" },
              { id: "circuit", label: "Circuit" }
            ].map(type => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox 
                  id={type.id} 
                  checked={selectedTypes.includes(type.id)} 
                  onCheckedChange={() => handleTypeChange(type.id)} 
                />
                <label 
                  htmlFor={type.id} 
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {type.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <h3 className="font-medium">Trier par</h3>
          <RadioGroup value={sortBy} onValueChange={setSortBy} className="space-y-2">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="recommended" id="recommended" />
              <Label htmlFor="recommended">Recommandés</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price-asc" id="price-asc" />
              <Label htmlFor="price-asc">Prix: croissant</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="price-desc" id="price-desc" />
              <Label htmlFor="price-desc">Prix: décroissant</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="rating" id="rating" />
              <Label htmlFor="rating">Popularité</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div className="flex flex-col space-y-2">
          <Button onClick={handleApplyFilters} className="w-full btn-travel">
            Appliquer les filtres
          </Button>
          <Button variant="outline" onClick={handleResetFilters} className="w-full">
            Réinitialiser
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
