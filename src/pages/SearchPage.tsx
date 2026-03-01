
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchForm } from "@/components/travel/SearchForm";
import { TravelCard } from "@/components/travel/TravelCard";
import { TravelFilters } from "@/components/travel/TravelFilters";
import { Button } from "@/components/ui/button";
import { useSearchOffers } from "@/hooks/useSearchOffers";
import { Search, Filter } from "lucide-react";
import { toast } from "sonner";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  
  const destination = searchParams.get("destination") || "";
  const type = searchParams.get("type") || "all";
  const passengers = searchParams.get("passengers") || "1";
  const departureDate = searchParams.get("departureDate");
  const returnDate = searchParams.get("returnDate");
  const promotional = searchParams.get("promotional") === "true";
  const regular = searchParams.get("regular") === "true";
  
  const {
    filteredResults,
    isLoading,
    handleFilterChange,
    activeFilters
  } = useSearchOffers({
    destination,
    type,
    passengers,
    departureDate,
    returnDate,
    promotional,
    regular
  });
  
  useEffect(() => {
    // Set initial filter types if a type was selected in the search
    if (type && type !== "all") {
      handleFilterChange({
        ...activeFilters,
        types: [type]
      });
    }
  }, [type]);
  
  // Filter results by type buttons (Vols, Hôtels, etc.)
  const handleTypeFilter = (type: string) => {
    const updatedTypes = activeFilters.types.includes(type)
      ? activeFilters.types.filter(t => t !== type)
      : [...activeFilters.types, type];
    
    const updatedFilters = {
      ...activeFilters,
      types: updatedTypes
    };
    
    handleFilterChange(updatedFilters);
    toast.success(`Filtre ${activeFilters.types.includes(type) ? 'retiré' : 'ajouté'}: ${type}`);
  };

  // Get page title based on query parameters
  const getPageTitle = () => {
    if (promotional) {
      return "Offres promotionnelles";
    } else if (regular) {
      return "Voyages réguliers";
    } else if (destination) {
      return `Résultats pour "${destination}"`;
    } else {
      return "Toutes les offres";
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Search Form Section */}
      <section className="bg-travel-primary py-8">
        <div className="travel-container">
          <SearchForm />
        </div>
      </section>
      
      {/* Travel Type Quick Filters */}
      <section className="bg-gray-50 border-b">
        <div className="travel-container py-4">
          <div className="flex items-center overflow-x-auto gap-3 py-1">
            <span className="text-gray-500 font-medium whitespace-nowrap">Voir toutes les offres:</span>
            {[
              { id: "flight", label: "Vols" },
              { id: "hotel", label: "Hôtels" },
              { id: "package", label: "Séjours" },
              { id: "circuit", label: "Circuits" },
            ].map((typeOption) => (
              <Button
                key={typeOption.id}
                variant={activeFilters.types.includes(typeOption.id) ? "default" : "outline"}
                size="sm"
                onClick={() => handleTypeFilter(typeOption.id)}
                className={
                  activeFilters.types.includes(typeOption.id)
                    ? "bg-travel-primary hover:bg-travel-primary/90"
                    : "hover:bg-gray-100"
                }
              >
                {typeOption.label}
              </Button>
            ))}
          </div>
        </div>
      </section>
      
      {/* Results Section */}
      <section className="travel-container py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-travel-primary">
            {isLoading ? "Recherche en cours..." : (
              filteredResults.length > 0 
                ? `${filteredResults.length} résultats - ${getPageTitle()}`
                : "Aucun résultat trouvé"
            )}
          </h1>
          
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden flex items-center gap-2"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? "Masquer les filtres" : "Afficher les filtres"}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters - Desktop */}
          <div className="hidden md:block">
            <TravelFilters 
              onFilterChange={handleFilterChange} 
              initialFilters={activeFilters}
            />
          </div>
          
          {/* Filters - Mobile */}
          {showFilters && (
            <div className="md:hidden">
              <TravelFilters 
                onFilterChange={handleFilterChange} 
                initialFilters={activeFilters}
              />
            </div>
          )}
          
          {/* Results */}
          <div className="lg:col-span-3">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-travel-primary mb-4"></div>
                <p className="text-travel-primary text-lg">Recherche des meilleures offres...</p>
              </div>
            ) : filteredResults.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredResults.map(offer => (
                  <TravelCard
                    key={offer.id}
                    id={offer.id}
                    title={offer.title}
                    destination={offer.destination}
                    image={offer.image_url || "https://placehold.co/600x400?text=Voyage"}
                    price={offer.price}
                    oldPrice={offer.old_price || undefined}
                    duration={`${offer.duration || 7} jours`}
                    type={offer.type}
                    rating={4.5}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="bg-gray-100 rounded-full p-6 mb-4">
                  <Search className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-bold mb-2">Aucun résultat trouvé</h3>
                <p className="text-gray-600 max-w-md mb-6">
                  Nous n'avons pas trouvé d'offres correspondant à votre recherche. Essayez de modifier vos critères ou contactez-nous pour une recherche personnalisée.
                </p>
                <Button 
                  className="btn-travel"
                  onClick={() => {
                    handleFilterChange({
                      priceRange: [0, 5000],
                      types: [],
                      sortBy: "recommended"
                    });
                  }}
                >
                  Réinitialiser les filtres
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default SearchPage;
