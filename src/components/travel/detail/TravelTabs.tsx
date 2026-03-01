
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import { TravelOffer } from "@/types/booking";

interface TravelTabsProps {
  offer: TravelOffer;
}

export const TravelTabs = ({ offer }: TravelTabsProps) => {
  return (
    <Tabs defaultValue="description" className="space-y-8">
      <TabsList className="w-full grid grid-cols-3 gap-2">
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="details">Détails</TabsTrigger>
        <TabsTrigger value="photos">Photos</TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="space-y-6">
        <div>
          <h2 className="text-xl font-bold mb-4">À propos de cette offre</h2>
          <p className="text-gray-700">{offer.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-bold mb-2">Le prix comprend :</h3>
            <ul className="space-y-1">
              {offer.included.map((item, index) => <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{item}</span>
                </li>)}
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold mb-2">Le prix ne comprend pas :</h3>
            <ul className="space-y-1">
              {offer.excluded.map((item, index) => <li key={index} className="flex items-start">
                  <svg className="h-5 w-5 text-red-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                  <span>{item}</span>
                </li>)}
            </ul>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="details">
        <div className="space-y-6">
          <h2 className="text-xl font-bold mb-4">Détails de l'offre</h2>
          
          {offer.type !== "hotel" && <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {offer.departureDate && <div className="flex items-center p-4 border rounded-md">
                  <div className="bg-travel-primary/10 rounded-full p-3 mr-4">
                    <Calendar className="h-6 w-6 text-travel-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Départ</p>
                    <p className="font-medium">{new Date(offer.departureDate).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</p>
                  </div>
                </div>}
              
              {offer.returnDate && <div className="flex items-center p-4 border rounded-md">
                  <div className="bg-travel-primary/10 rounded-full p-3 mr-4">
                    <Calendar className="h-6 w-6 text-travel-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Retour</p>
                    <p className="font-medium">{new Date(offer.returnDate).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                })}</p>
                  </div>
                </div>}
            </div>}
          
          {offer.type === "flight" && <div>
              <h3 className="font-bold mb-2">Informations vol</h3>
              <p className="text-gray-700">
                Durée estimée du vol : {offer.duration}
              </p>
            </div>}
          
          {offer.type === "package" && <div>
              <h3 className="font-bold mb-2">Hébergement</h3>
              <p className="text-gray-700">
                Inclus dans le forfait : {offer.included.find(i => i.includes("hôtel") || i.includes("hébergement"))}
              </p>
            </div>}
          
          {offer.type === "hotel" && <div>
              <h3 className="font-bold mb-2">Équipements</h3>
              <div className="grid grid-cols-2 gap-2">
                {offer.included.map((item, index) => <div key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-travel-secondary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{item}</span>
                  </div>)}
              </div>
            </div>}
          
          <div>
            <h3 className="font-bold mb-2">Disponibilité</h3>
            <p className={`font-medium ${offer.availability < 5 ? 'text-red-500' : 'text-green-600'}`}>
              {offer.availability < 5 ? `Plus que ${offer.availability} places disponibles !` : `${offer.availability} places disponibles`}
            </p>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="photos">
        <h2 className="text-xl font-bold mb-4">Galerie photos</h2>
        <div className="travel-gallery">
          <div className="travel-gallery-main">
            <img src={offer.image} alt={offer.title} className="w-full h-full object-cover rounded-lg shadow-lg gallery-image" />
          </div>
          
          {offer.gallery?.map((image, index) => <img key={index} src={image} alt={`${offer.title} - image ${index + 1}`} className="travel-gallery-item gallery-image" />)}
          
          {/* Si nous n'avons pas assez d'images dans la galerie, utilisons l'image principale à nouveau */}
          {offer.gallery && offer.gallery.length < 2 && <img src={offer.image} alt={`${offer.title} - additional view`} className="travel-gallery-item gallery-image" />}
        </div>
      </TabsContent>
    </Tabs>
  );
};
