export interface TravelOffer {
  id: string;
  title: string;
  destination: string;
  country: string;
  description: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  price: number;
  oldPrice?: number;
  duration: string;
  departureDate?: string;
  returnDate?: string;
  included: string[];
  excluded: string[];
  type: 'flight' | 'hotel' | 'package' | 'circuit';
  rating?: number;
  reviews?: number;
  featured?: boolean;
  availability: number;
}

export const featuredDestinations = [
  {
    id: "dest-1",
    name: "Paris",
    country: "France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
  },
  {
    id: "dest-2", 
    name: "Venise",
    country: "Italie",
    image: "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?q=80&w=1974&auto=format&fit=crop", 
  },
  {
    id: "dest-3",
    name: "Santorini",
    country: "Grèce",
    image: "https://images.unsplash.com/photo-1570077188696-c68a185fea2d?q=80&w=2274&auto=format&fit=crop",
  },
  {
    id: "dest-4",
    name: "New York",
    country: "États-Unis",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
  },
  {
    id: "dest-5",
    name: "Tokyo",
    country: "Japon", 
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2071&auto=format&fit=crop",
  },
  {
    id: "dest-6",
    name: "Barcelone",
    country: "Espagne",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2070&auto=format&fit=crop", 
  }
];

export const travelOffers: TravelOffer[] = [
  {
    id: "offer-1",
    title: "Week-end romantique à Paris",
    destination: "Paris",
    country: "France",
    description: "Profitez d'un week-end romantique au cœur de la Ville Lumière. Ce séjour comprend 2 nuits dans un hôtel 4 étoiles près des Champs-Élysées, un dîner croisière sur la Seine, et l'entrée pour 2 personnes au Musée du Louvre et à la Tour Eiffel. Paris, ville de l'amour et de la gastronomie, vous attend pour un séjour inoubliable entre culture et romantisme.",
    shortDescription: "Un séjour romantique de 2 nuits au cœur de Paris avec dîner croisière sur la Seine et visites des monuments emblématiques.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2073&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1499856871958-5b9357976b82?q=80&w=2073&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1520939817895-060bdaf4fe1b?q=80&w=2073&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549144511-f099e773c147?q=80&w=2034&auto=format&fit=crop",
    ],
    price: 599,
    oldPrice: 699,
    duration: "3 jours / 2 nuits",
    departureDate: "2025-06-15",
    returnDate: "2025-06-17",
    included: [
      "2 nuits en hôtel 4 étoiles",
      "Petit-déjeuner buffet",
      "Dîner croisière sur la Seine",
      "Pass transport 3 jours",
      "Entrées au Louvre et à la Tour Eiffel"
    ],
    excluded: [
      "Transport jusqu'à Paris",
      "Déjeuners",
      "Dépenses personnelles"
    ],
    type: "package",
    rating: 4.8,
    reviews: 127,
    featured: true,
    availability: 12
  },
  {
    id: "offer-2",
    title: "Vol Paris - New York",
    destination: "New York",
    country: "États-Unis",
    description: "Vol direct Paris-New York en classe économique avec Air France. Profitez du confort d'un vol long-courrier avec repas, divertissements à bord et bagage en soute inclus. New York vous attend avec ses gratte-ciels emblématiques, ses quartiers vibrants et sa diversité culturelle incomparable.",
    shortDescription: "Vol direct de Paris à New York en classe économique avec Air France.",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1532960401447-7101e88e15da?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1522083165195-3424ed129620?q=80&w=1824&auto=format&fit=crop",
    ],
    price: 385,
    oldPrice: 450,
    duration: "8h30 de vol",
    departureDate: "2025-07-10",
    returnDate: "2025-07-25",
    included: [
      "Vol aller-retour",
      "1 bagage en cabine",
      "1 bagage en soute",
      "Repas à bord",
      "Divertissement à bord"
    ],
    excluded: [
      "Transfert aéroport-hôtel",
      "Hébergement",
      "Assurance voyage"
    ],
    type: "flight",
    rating: 4.2,
    reviews: 305,
    featured: false,
    availability: 42
  },
  {
    id: "offer-3",
    title: "Hôtel de luxe à Venise",
    destination: "Venise",
    country: "Italie",
    description: "Séjournez dans un hôtel de luxe au cœur de Venise avec vue imprenable sur les canaux. Profitez d'une terrasse privée et d'un spa pour un séjour détente parfait. Ce complexe 5 étoiles vous offre des chambres élégantes, un restaurant gastronomique et un service impeccable dans l'une des plus belles villes italiennes.",
    shortDescription: "Luxueux hôtel 5 étoiles avec vue sur les canaux et spa privé, au cœur de Venise.",
    image: "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1529447157779-c7c6cb04bbc9?q=80&w=2075&auto=format&fit=crop",
    ],
    price: 1250,
    oldPrice: 1450,
    duration: "Par nuit",
    included: [
      "Suite avec vue sur canal",
      "Petit-déjeuner à la carte",
      "Accès au spa et piscine",
      "Wi-Fi gratuit",
      "Service de conciergerie"
    ],
    excluded: [
      "Transport jusqu'à Venise",
      "Repas (hors petit-déjeuner)",
      "Activités extérieures",
      "Transferts aéroport"
    ],
    type: "hotel",
    rating: 4.9,
    reviews: 86,
    featured: true,
    availability: 5
  },
  {
    id: "offer-4",
    title: "Circuit découverte du Japon",
    destination: "Tokyo, Kyoto, Osaka",
    country: "Japon",
    description: "Embarquez pour un voyage culturel exceptionnel à travers les plus grandes villes du Japon. Ce circuit vous permet de découvrir Tokyo, la capitale ultra-moderne, Kyoto, ville des traditions et des temples, et Osaka, capitale gastronomique du pays. Entre gratte-ciels futuristes, temples séculaires, jardins zen et gastronomie raffinée, ce circuit vous dévoile toutes les facettes de la culture japonaise.",
    shortDescription: "Circuit guidé de 12 jours à travers Tokyo, Kyoto et Osaka avec visites des sites incontournables.",
    image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2071&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1528360983277-13d401cdc186?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1493780474015-ba834fd0ce2f?q=80&w=2042&auto=format&fit=crop",
    ],
    price: 3200,
    oldPrice: 3500,
    duration: "12 jours / 11 nuits",
    departureDate: "2025-09-05",
    returnDate: "2025-09-16",
    included: [
      "Vols aller-retour",
      "Hébergement en hôtels 4 étoiles",
      "Petit-déjeuner quotidien",
      "Guide francophone",
      "Transport en train à grande vitesse",
      "Entrées dans les sites touristiques"
    ],
    excluded: [
      "Certains repas",
      "Dépenses personnelles",
      "Assurance voyage",
      "Pourboires"
    ],
    type: "circuit",
    rating: 4.7,
    reviews: 59,
    featured: true,
    availability: 8
  },
  {
    id: "offer-5",
    title: "Séjour tout inclus à Barcelone",
    destination: "Barcelone",
    country: "Espagne",
    description: "Profitez d'un séjour tout inclus à Barcelone, capitale catalane riche en architecture, culture et gastronomie. Ce forfait comprend l'hébergement en hôtel 4 étoiles proche de la plage, les repas, et un pass pour visiter les principaux sites touristiques, dont la Sagrada Familia et le Parc Güell.",
    shortDescription: "Séjour complet avec hébergement, repas et visites des sites emblématiques de Barcelone.",
    image: "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1511527661048-7fe73d85e9a4?q=80&w=2065&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583422409516-2895a77efded?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515443961218-a51367888e4b?q=80&w=2000&auto=format&fit=crop",
    ],
    price: 850,
    oldPrice: 950,
    duration: "5 jours / 4 nuits",
    departureDate: "2025-06-22",
    returnDate: "2025-06-26",
    included: [
      "Vol aller-retour",
      "Hébergement en hôtel 4 étoiles",
      "Pension complète",
      "Pass touristique Barcelona Card",
      "Transferts aéroport-hôtel",
      "Visite guidée de la ville"
    ],
    excluded: [
      "Dépenses personnelles",
      "Activités non mentionnées",
      "Assurance voyage"
    ],
    type: "package",
    rating: 4.5,
    reviews: 112,
    featured: false,
    availability: 15
  },
  {
    id: "offer-6",
    title: "Escapade à Venise",
    destination: "Venise",
    country: "Italie",
    description: "Partez à la découverte de Venise, la cité des Doges et ses canaux emblématiques. Ce séjour comprend 3 nuits d'hébergement dans un hôtel de charme au cœur de la ville, une visite guidée des principaux monuments, et une promenade romantique en gondole.",
    shortDescription: "Week-end à Venise avec hébergement central, visite guidée et promenade en gondole incluses.",
    image: "https://images.unsplash.com/photo-1529447157779-c7c6cb04bbc9?q=80&w=2075&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1514890547357-a9ee288728e0?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534113414509-0eec2bfb493f?q=80&w=1974&auto=format&fit=crop",
    ],
    price: 720,
    oldPrice: 850,
    duration: "4 jours / 3 nuits",
    departureDate: "2025-08-10",
    returnDate: "2025-08-13",
    included: [
      "Vol aller-retour",
      "3 nuits en hôtel de charme",
      "Petit-déjeuner quotidien",
      "Visite guidée de 2 heures",
      "Promenade en gondole",
      "Pass vaporetto 3 jours"
    ],
    excluded: [
      "Repas (hors petit-déjeuner)",
      "Entrées aux musées",
      "Dépenses personnelles"
    ],
    type: "package",
    rating: 4.6,
    reviews: 93,
    featured: true,
    availability: 10
  },
  {
    id: "offer-7",
    title: "Séjour détente à Bali",
    destination: "Bali",
    country: "Indonésie",
    description: "Offrez-vous une parenthèse paradisiaque à Bali, l'île des dieux. Ce séjour comprend 7 nuits dans un resort 5 étoiles avec accès direct à la plage, des massages quotidiens et des excursions pour découvrir les temples et rizières emblématiques de l'île.",
    shortDescription: "Une semaine de détente dans un resort de luxe à Bali avec soins spa et excursions culturelles.",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=2038&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555400038-63f5ba517a47?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604999286549-9d954d2b8208?q=80&w=2070&auto=format&fit=crop",
    ],
    price: 1890,
    oldPrice: 2200,
    duration: "8 jours / 7 nuits",
    departureDate: "2025-07-10",
    returnDate: "2025-07-17",
    included: [
      "Vols aller-retour",
      "Hébergement en resort 5 étoiles",
      "Demi-pension",
      "3 massages balinais",
      "Transferts aéroport",
      "2 excursions guidées"
    ],
    excluded: [
      "Certains repas",
      "Dépenses personnelles",
      "Activités optionnelles"
    ],
    type: "package",
    rating: 4.8,
    reviews: 154,
    featured: true,
    availability: 7
  },
  {
    id: "offer-8",
    title: "Croisière en Méditerranée",
    destination: "Marseille, Barcelone, Naples, Santorin",
    country: "Multiple",
    description: "Embarquez pour une croisière inoubliable en Méditerranée à bord d'un navire de luxe. Vous découvrirez les plus belles escales méditerranéennes : Marseille, Barcelone, Naples et Santorin. Profitez des activités à bord et des excursions organisées à chaque escale.",
    shortDescription: "Croisière de luxe avec escales dans les plus belles villes de la Méditerranée.",
    image: "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2064&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=2064&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551524164-687a55dd1126?q=80&w=2025&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1548566862-2239b8fab9b1?q=80&w=2071&auto=format&fit=crop",
    ],
    price: 1499,
    oldPrice: 1799,
    duration: "10 jours / 9 nuits",
    departureDate: "2025-08-15",
    returnDate: "2025-08-24",
    included: [
      "Hébergement en cabine vue mer",
      "Pension complète",
      "Animations et spectacles",
      "Accès aux installations du navire",
      "Taxes portuaires"
    ],
    excluded: [
      "Boissons hors forfait",
      "Excursions à terre",
      "Pourboires",
      "Dépenses personnelles"
    ],
    type: "circuit",
    rating: 4.7,
    reviews: 89,
    featured: true,
    availability: 12
  },
  {
    id: "offer-9",
    title: "Safari au Kenya",
    destination: "Nairobi, Masai Mara",
    country: "Kenya",
    description: "Partez pour une aventure inoubliable au cœur de la savane kenyane. Ce safari vous fait découvrir la réserve nationale du Masai Mara, célèbre pour son exceptionnelle concentration d'animaux sauvages et la grande migration des gnous. Logement en lodges de luxe avec vue panoramique sur la savane.",
    shortDescription: "Aventure safari dans la réserve du Masai Mara avec observation de la faune sauvage et hébergement en lodges de luxe.",
    image: "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1534614971-6be99a7a3ffd?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop",
    ],
    price: 2850,
    duration: "7 jours / 6 nuits",
    departureDate: "2025-09-20",
    returnDate: "2025-09-26",
    included: [
      "Vols internationaux",
      "Hébergement en lodges 4 et 5 étoiles",
      "Pension complète",
      "Safaris quotidiens",
      "Guide francophone",
      "Transferts"
    ],
    excluded: [
      "Visa kenyan",
      "Pourboires",
      "Activités optionnelles",
      "Assurance voyage"
    ],
    type: "circuit",
    rating: 4.9,
    reviews: 42,
    featured: false,
    availability: 6
  },
  {
    id: "offer-10",
    title: "City break à Rome",
    destination: "Rome",
    country: "Italie",
    description: "Découvrez la Ville Éternelle le temps d'un week-end culturel. Ce séjour comprend l'hébergement dans un hôtel central, des billets coupe-file pour le Colisée, le Forum Romain et les Musées du Vatican, ainsi qu'une visite guidée de la Rome baroque.",
    shortDescription: "Week-end culturel à Rome avec visites des sites emblématiques et hébergement central.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=1996&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1604580864964-0462f5d5b1a8?q=80&w=2070&auto=format&fit=crop",
    ],
    price: 490,
    oldPrice: 590,
    duration: "3 jours / 2 nuits",
    departureDate: "2025-05-15",
    returnDate: "2025-05-17",
    included: [
      "Vol aller-retour",
      "2 nuits en hôtel 3 étoiles",
      "Petit-déjeuner",
      "Pass transport 3 jours",
      "Entrées coupe-file aux sites",
      "Visite guidée (3h)"
    ],
    excluded: [
      "Repas (hors petit-déjeuner)",
      "Transferts aéroport",
      "Dépenses personnelles"
    ],
    type: "package",
    rating: 4.5,
    reviews: 78,
    featured: false,
    availability: 18
  },
  {
    id: "offer-11",
    title: "Exploration du Portugal",
    destination: "Lisbonne, Porto",
    country: "Portugal",
    description: "Découvrez les charmes du Portugal lors de ce voyage guidé qui vous emmène des rues pavées de Lisbonne aux vignobles de la vallée du Douro, en passant par les plages de l'Algarve. Goûtez à la cuisine portugaise, écoutez le fado et visitez des monuments historiques classés au patrimoine mondial.",
    shortDescription: "Circuit découverte des trésors du Portugal, entre villes historiques, falaises spectaculaires et traditions authentiques.",
    image: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1585208798174-6cedd86ea13a?q=80&w=2073&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1508050919630-b135583b29ab?q=80&w=2071&auto=format&fit=crop",
    ],
    price: 1250,
    duration: "8 jours / 7 nuits",
    departureDate: "2025-06-18",
    returnDate: "2025-06-25",
    included: [
      "Vols aller-retour",
      "Hébergement en hôtels 4 étoiles",
      "Petit-déjeuner quotidien",
      "Guide francophone",
      "Transport en autocar climatisé",
      "Visites guidées"
    ],
    excluded: [
      "Certains repas",
      "Dépenses personnelles",
      "Assurance voyage"
    ],
    type: "circuit",
    rating: 4.6,
    reviews: 84,
    featured: false,
    availability: 14
  },
  {
    id: "offer-12",
    title: "La magie des fjords norvégiens",
    destination: "Oslo, Bergen, Geiranger",
    country: "Norvège",
    description: "Embarquez pour une aventure inoubliable au cœur des paysages spectaculaires des fjords norvégiens. Ce voyage vous fera découvrir les plus beaux panoramas de Norvège, entre montagnes majestueuses, cascades vertigineuses et eaux d'un bleu profond. Une expérience qui ravira les amoureux de la nature.",
    shortDescription: "Croisière et excursions terrestres pour découvrir les magnifiques fjords de Norvège et la culture scandinave.",
    image: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1588599376442-3cbf9c67449e?q=80&w=2071&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1513519245088-0eec2bfb493f?q=80&w=2070&auto=format&fit=crop",
    ],
    price: 1890,
    duration: "9 jours / 8 nuits",
    departureDate: "2025-07-05",
    returnDate: "2025-07-13",
    included: [
      "Vols aller-retour",
      "Hébergement en hôtels",
      "Croisière sur les fjords",
      "Petit-déjeuner et dîners",
      "Guide francophone",
      "Transport terrestre"
    ],
    excluded: [
      "Déjeuners",
      "Activités optionnelles",
      "Dépenses personnelles"
    ],
    type: "circuit",
    rating: 4.9,
    reviews: 63,
    featured: false,
    availability: 9
  },
  {
    id: "offer-13",
    title: "Trésors marocains",
    destination: "Marrakech, Fès, Chefchaouen",
    country: "Maroc",
    description: "Découvrez les trésors du Maroc lors d'un voyage qui vous transportera des médinas animées de Marrakech et Fès aux montagnes de l'Atlas, en passant par le désert du Sahara et la ville bleue de Chefchaouen. Immergez-vous dans la culture marocaine, dégustez la cuisine locale et explorez des paysages variés.",
    shortDescription: "Circuit culturel à travers les villes impériales du Maroc, entre désert, montagnes et médinas colorées.",
    image: "https://images.unsplash.com/photo-1489749798304-4aa5d6a8c00e?q=80&w=2071&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=2076&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1535318324768-39e9248bf927?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1553903964-4f39414e0954?q=80&w=2073&auto=format&fit=crop",
    ],
    price: 1050,
    duration: "10 jours / 9 nuits",
    departureDate: "2025-09-10",
    returnDate: "2025-09-19",
    included: [
      "Vols aller-retour",
      "Hébergement en riads et hôtels",
      "Demi-pension",
      "Guide local francophone",
      "Transport en 4x4 et minibus",
      "Excursion dans le désert"
    ],
    excluded: [
      "Certains repas",
      "Pourboires",
      "Dépenses personnelles"
    ],
    type: "circuit",
    rating: 4.7,
    reviews: 98,
    featured: false,
    availability: 16
  },
  {
    id: "offer-14",
    title: "Merveilles de la Thaïlande",
    destination: "Bangkok, Chiang Mai, Phuket",
    country: "Thaïlande",
    description: "Embarquez pour un voyage fascinant à travers la Thaïlande, du nord au sud. Découvrez les temples de Bangkok, les villages traditionnels du nord et les plages paradisiaques du sud. Entre culture, nature et détente, cette découverte complète vous permettra de saisir toute la diversité et la richesse de ce pays d'Asie du Sud-Est.",
    shortDescription: "Circuit complet à travers la Thaïlande, des temples anciens aux plages tropicales en passant par les montagnes du nord.",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070&auto=format&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1504214208698-ea1916a2195a?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2139&auto=format&fit=crop",
    ],
    price: 1650,
    duration: "12 jours / 11 nuits",
    departureDate: "2025-11-15",
    returnDate: "2025-11-26",
    included: [
      "Vols internationaux et domestiques",
      "Hébergement en hôtels 3 et 4 étoiles",
      "Petit-déjeuner quotidien",
      "Guide francophone",
      "Transport terrestre",
      "Excursions mentionnées"
    ],
    excluded: [
      "Repas non mentionnés",
      "Pourboires",
      "Dépenses personnelles",
      "Assurance voyage"
    ],
    type: "circuit",
    rating: 4.6,
    reviews: 74,
    featured: false,
    availability: 11
  }
];

export const getOfferById = (id: string): TravelOffer | undefined => {
  return travelOffers.find(offer => offer.id === id);
};

export const searchOffers = (params: any) => {
  let results = [...travelOffers];
  
  // Filter by destination
  if (params.destination) {
    const searchTerm = params.destination.toLowerCase();
    results = results.filter(
      offer => 
        offer.destination.toLowerCase().includes(searchTerm) || 
        offer.country.toLowerCase().includes(searchTerm)
    );
  }
  
  // Filter by type
  if (params.type && params.type !== 'all') {
    results = results.filter(offer => offer.type === params.type);
  }
  
  // Filter by price range
  if (params.minPrice !== undefined && params.maxPrice !== undefined) {
    results = results.filter(
      offer => offer.price >= params.minPrice && offer.price <= params.maxPrice
    );
  }
  
  // Filter by dates
  if (params.departureDate) {
    results = results.filter(
      offer => !offer.departureDate || new Date(offer.departureDate) >= new Date(params.departureDate)
    );
  }

  if (params.returnDate) {
    results = results.filter(
      offer => !offer.returnDate || new Date(offer.returnDate) <= new Date(params.returnDate)
    );
  }
  
  // Sort results
  if (params.sortBy) {
    switch (params.sortBy) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      default:
        // Default sorting (recommended) can be based on featured status and then rating
        results.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return (b.rating || 0) - (a.rating || 0);
        });
    }
  }
  
  return results;
};
