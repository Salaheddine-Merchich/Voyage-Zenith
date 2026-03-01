
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-travel-light to-white p-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-travel-primary">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page non trouvée</h2>
        <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto">
          Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Button asChild className="btn-travel">
          <Link to="/">Retourner à l'accueil</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
