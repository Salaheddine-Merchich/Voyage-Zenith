
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SearchForm } from "@/components/travel/SearchForm";
import { HeroSection } from "@/components/home/HeroSection";
import { PromotionalOffersSection } from "@/components/home/PromotionalOffersSection";
import { RegularTravelsSection } from "@/components/home/RegularTravelsSection";
import { PopularDestinationsSection } from "@/components/home/PopularDestinationsSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { NewsletterSection } from "@/components/home/NewsletterSection";

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <HeroSection />
      
      {/* Search Section */}
      <section className="travel-container -mt-24 relative z-20">
        <SearchForm />
      </section>
      
      <PromotionalOffersSection />
      
      <RegularTravelsSection />
      
      <PopularDestinationsSection />
      
      <WhyChooseUsSection />
      
      <NewsletterSection />
      
      <Footer />
    </div>
  );
};

export default HomePage;
