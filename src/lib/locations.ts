export type LocationType = {
  id: string;
  city: string;
  country: "DZ" | "CN";
  coords: [number, number];
  address: string;
  type: string;
  phone: string;
  hours: string;
  image: string;
};

export const locations: LocationType[] = [
  {
    id: "alger",
    city: "Alger",
    country: "DZ",
    coords: [36.7538, 3.0588],
    address: "Bab Ezzouar, Alger - Algérie (Bureau Principal)",
    type: "Bureau Principal • Siège",
    phone: "+213 550 00 00 00",
    hours: "Lun - Sam: 08:00 - 18:00",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600&q=80",
  },
  {
    id: "oran",
    city: "Oran",
    country: "DZ",
    coords: [35.6987, -0.6349],
    address: "Bir El Djir, Oran - Algérie",
    type: "Agence Ouest",
    phone: "+213 550 00 00 01",
    hours: "Lun - Sam: 08:00 - 18:00",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80",
  },
  {
    id: "setif",
    city: "Sétif",
    country: "DZ",
    coords: [36.1917, 5.4133],
    address: "Zone Industrielle, Sétif - Algérie",
    type: "Entrepôt Est",
    phone: "+213 550 00 00 02",
    hours: "Lun - Sam: 08:00 - 18:00",
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80",
  },
  {
    id: "guangzhou",
    city: "Guangzhou",
    country: "CN",
    coords: [23.1291, 113.2644],
    address: "Tianhe District, Guangzhou, Guangdong - Chine",
    type: "Entrepôt Chine Sud",
    phone: "+86 135 0000 0000",
    hours: "Lun - Sam: 09:00 - 18:00 (CST)",
    image: "https://images.unsplash.com/photo-1536599018102-9f803c140fc1?w=600&q=80",
  },
  {
    id: "yiwu",
    city: "Yiwu",
    country: "CN",
    coords: [29.3064, 120.0678],
    address: "Futian Market, Yiwu, Zhejiang - Chine",
    type: "Bureau Achats & Collecte",
    phone: "+86 135 0000 0001",
    hours: "Lun - Sam: 09:00 - 19:00 (CST)",
    image: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&q=80",
  },
  {
    id: "shenzhen",
    city: "Shenzhen",
    country: "CN",
    coords: [22.5431, 114.0579],
    address: "Bao'an District, Shenzhen - Chine",
    type: "Hub Électronique",
    phone: "+86 135 0000 0002",
    hours: "Lun - Sam: 09:00 - 18:00 (CST)",
    image: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=600&q=80",
  },
];
