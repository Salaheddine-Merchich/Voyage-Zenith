
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search } from "lucide-react";

export function SearchForm() {
  const [travelType, setTravelType] = useState("all");
  
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const searchParams = new URLSearchParams({
      type: travelType,
    });
    
    navigate(`/search?${searchParams.toString()}`);
  };

  return (
    <Card className="w-full shadow-md">
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="travelType">Type de voyage</Label>
              <Select value={travelType} onValueChange={setTravelType}>
                <SelectTrigger id="travelType" className="input-travel">
                  <SelectValue placeholder="Tous les types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="flight">Vol</SelectItem>
                  <SelectItem value="hotel">Hôtel</SelectItem>
                  <SelectItem value="package">Séjour</SelectItem>
                  <SelectItem value="circuit">Circuit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button type="submit" className="w-full sm:w-auto btn-travel">
            <Search className="mr-2 h-4 w-4" />
            Rechercher
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
