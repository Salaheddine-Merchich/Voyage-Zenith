import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { featuredDestinations } from "@/data/mockData";
import { MapPin } from "lucide-react";
export function PopularDestinationsSection() {
  // Filtrer pour exclure Santorini
  const filteredDestinations = featuredDestinations.filter(destination => destination.name !== "Santorini");
  return <section className="travel-container mt-16">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="section-title">Destinations populaires</h2>
          <p className="section-subtitle">Explorez nos destinations les plus recherchées</p>
        </div>
        <Button asChild variant="outline" className="border-purple-700 text-purple-700">
          
        </Button>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {filteredDestinations.map(destination => <div key={destination.id} className="destination-card group">
            <img src={destination.image} alt={destination.name} className="destination-image" />
            <div className="destination-overlay"></div>
            <div className="destination-content">
              <p className="font-bold">{destination.name}</p>
              <div className="flex items-center text-gray-200 text-sm">
                <MapPin className="h-3 w-3 mr-1" />
                <span>{destination.country}</span>
              </div>
            </div>
          </div>)}
      </div>
    </section>;
}