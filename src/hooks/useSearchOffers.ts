
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { TravelOffer } from "@/types/booking";

interface SearchParams {
  destination?: string | null;
  type?: string | null;
  passengers?: string | null;
  departureDate?: string | null;
  returnDate?: string | null;
  promotional?: boolean;
  regular?: boolean;
}

interface Filters {
  priceRange: [number, number];
  types: string[];
  sortBy: string;
}

export const useSearchOffers = ({
  destination,
  type,
  passengers,
  departureDate,
  returnDate,
  promotional,
  regular
}: SearchParams) => {
  const [offers, setOffers] = useState<TravelOffer[]>([]);
  const [filteredResults, setFilteredResults] = useState<TravelOffer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState<Filters>({
    priceRange: [0, 5000],
    types: [],
    sortBy: "recommended"
  });
  
  // Fetch travel offers from Supabase
  useEffect(() => {
    const fetchOffers = async () => {
      setIsLoading(true);
      
      try {
        let query = supabase
          .from('travel_offers')
          .select('*');
          
        // Apply filters based on URL params
        if (destination) {
          query = query.ilike('destination', `%${destination}%`);
        }
        
        if (type && type !== 'all') {
          query = query.eq('type', type);
        }
        
        // Handle promotional vs regular offers
        if (promotional) {
          query = query.not('old_price', 'is', null);
        } else if (regular) {
          query = query.is('old_price', null);
        }
        
        const { data, error } = await query;
        
        if (error) {
          throw error;
        }
        
        setOffers(data || []);
        
        // Apply initial filters to the loaded data
        const initiallyFiltered = applyFilters(data || [], activeFilters);
        setFilteredResults(initiallyFiltered);
        
      } catch (error: any) {
        console.error("Error fetching travel offers:", error.message);
        setOffers([]);
        setFilteredResults([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchOffers();
  }, [destination, type, passengers, departureDate, returnDate, promotional, regular]);
  
  // Apply filters to the offers
  const applyFilters = (data: TravelOffer[], filters: Filters) => {
    let results = [...data];
    
    // Filter by price range
    results = results.filter(
      offer => offer.price >= filters.priceRange[0] && offer.price <= filters.priceRange[1]
    );
    
    // Filter by types
    if (filters.types && filters.types.length > 0) {
      results = results.filter(offer => filters.types.includes(offer.type));
    }
    
    // Sort results
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "price-asc":
          results.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          results.sort((a, b) => b.price - a.price);
          break;
        case "rating":
          // For now, we don't have a rating field, so we'll just sort by price
          results.sort((a, b) => b.price - a.price);
          break;
        // Add more sorting options as needed
      }
    }
    
    return results;
  };
  
  // Handle filter changes from the filter component
  const handleFilterChange = (filters: Filters) => {
    setActiveFilters(filters);
    const newFilteredResults = applyFilters(offers, filters);
    setFilteredResults(newFilteredResults);
  };
  
  return { 
    filteredResults, 
    isLoading, 
    handleFilterChange,
    activeFilters 
  };
};
