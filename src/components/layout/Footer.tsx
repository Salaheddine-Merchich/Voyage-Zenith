
import { Link } from "react-router-dom";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-travel-dark text-white mt-auto">
      <div className="travel-container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Voyage Zenith</h3>
            <p className="text-gray-300">
              Votre partenaire de confiance pour des voyages inoubliables. Découvrez le monde avec nous !
            </p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Liens Rapides</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white transition-colors">Accueil</Link></li>
              <li><Link to="/search" className="text-gray-300 hover:text-white transition-colors">Rechercher</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white transition-colors">À propos de nous</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Types de Voyages</h4>
            <ul className="space-y-2">
              <li><Link to="/search?type=flight" className="text-gray-300 hover:text-white transition-colors">Vols</Link></li>
              <li><Link to="/search?type=hotel" className="text-gray-300 hover:text-white transition-colors">Hôtels</Link></li>
              <li><Link to="/search?type=package" className="text-gray-300 hover:text-white transition-colors">Séjours</Link></li>
              <li><Link to="/search?type=circuit" className="text-gray-300 hover:text-white transition-colors">Circuits</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Contact</h4>
            <address className="not-italic text-gray-300 space-y-2">
              <p>123 Avenue du Voyage</p>
              <p>75000 Paris, France</p>
              <p>Email: contact@voyagezenith.com</p>
              <p>Tél: +33 (0)1 23 45 67 89</p>
            </address>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400">© {currentYear} Voyage Zenith. Tous droits réservés.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">Conditions générales</Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
