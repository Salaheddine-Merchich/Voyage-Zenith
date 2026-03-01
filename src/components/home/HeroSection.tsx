import { Link } from "react-router-dom";
export function HeroSection() {
  return <section className="hero-section relative h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop" alt="Travel" className="w-full h-full object-cover" loading="eager" />
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>
      
      <div className="travel-container relative z-10">
        <div className="hero-content max-w-2xl text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Découvrez le monde avec Voyage Zenith
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-100">
            Trouvez et réservez les meilleures offres de vols, hôtels et séjours pour votre prochaine aventure.
          </p>
          <div className="space-x-4 flex flex-wrap gap-4">
            <Link to="/search?type=promotions">
              
            </Link>
            <Link to="/search">
              <button className="bg-white hover:bg-gray-100 font-medium py-3 px-6 rounded-md transition-colors text-red-600">Toutes les offres</button>
            </Link>
          </div>
        </div>
      </div>
    </section>;
}