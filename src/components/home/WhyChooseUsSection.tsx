
export function WhyChooseUsSection() {
  return (
    <section className="bg-travel-light mt-16 py-16">
      <div className="travel-container">
        <h2 className="text-2xl font-bold text-center text-travel-primary mb-12">
          Pourquoi choisir Voyage Zenith ?
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="bg-travel-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-travel-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Réservations Sécurisées</h3>
            <p className="text-gray-600">
              Toutes vos transactions sont sécurisées avec nos partenaires de paiement de confiance.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="bg-travel-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-travel-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Support 24/7</h3>
            <p className="text-gray-600">
              Notre équipe d'assistance est disponible à tout moment pour répondre à vos questions.
            </p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-md text-center">
            <div className="bg-travel-primary/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-travel-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Meilleurs Prix</h3>
            <p className="text-gray-600">
              Nous vous garantissons les meilleurs tarifs pour tous vos voyages.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
