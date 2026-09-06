"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { locations } from "@/lib/locations";
import { MapPin, Phone, Clock } from "lucide-react";
import { motion } from "framer-motion";

const MapContainer = dynamic(() => import("react-leaflet").then(m => m.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then(m => m.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then(m => m.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then(m => m.Popup), { ssr: false });

export default function BureauxMap({ filter }: { filter?: "DZ" | "CN" }) {
  const [active, setActive] = useState<string>(locations[0].id);
  const [country, setCountry] = useState<"DZ" | "CN">(filter || "DZ");
  const [icon, setIcon] = useState<any>(null);

  useEffect(() => {
    import("leaflet").then(L => {
      // fix default icon path
      // @ts-ignore
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      const custom = L.divIcon({
        html: '<div style="width:28px;height:28px;background:#E63946;border:3px solid white;border-radius:50%;box-shadow:0 4px 12px rgba(0,0,0,0.3);display:grid;place-items:center;color:white;font-weight:900;font-size:11px">HK</div>',
        className: "",
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      });
      setIcon(custom);
    });
    // load css
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);
  }, []);

  const filtered = locations.filter(l => l.country === country);
  const activeLoc = locations.find(l => l.id === active) || filtered[0];
  const center: [number, number] = activeLoc ? activeLoc.coords : [36.7, 3.0];

  return (
    <div className="grid lg:grid-cols-[360px_1fr] gap-4">
      <div className="bg-white rounded-[20px] border border-black/10 p-3 md:p-4 flex flex-col gap-3">
        <div className="flex gap-2 p-1 bg-[#FFF8F0] rounded-full border">
          <button onClick={() => setCountry("DZ")} className={`flex-1 py-2.5 md:py-2 rounded-full font-black text-sm transition ${country==="DZ"?"bg-[#0A1931] text-white":"text-black/60"}`}>🇩🇿 Algérie</button>
          <button onClick={() => setCountry("CN")} className={`flex-1 py-2.5 md:py-2 rounded-full font-black text-sm transition ${country==="CN"?"bg-[#E63946] text-white":"text-black/60"}`}>🇨🇳 Chine</button>
        </div>

        <div className="flex lg:flex-col gap-2 overflow-x-auto scrollbar-hide snap-x lg:overflow-visible -mx-3 px-3 lg:mx-0 lg:px-0 pb-1 lg:pb-0 lg:max-h-[320px] lg:overflow-auto lg:pr-1">
          {filtered.map(loc => (
            <button
              key={loc.id}
              onClick={() => setActive(loc.id)}
              className={`snap-center lg:snap-align-none shrink-0 w-[78vw] max-w-[280px] lg:w-full text-left rounded-2xl p-4 border transition ${active===loc.id ? "bg-[#0A1931] text-white border-transparent shadow-lg" : "bg-[#FFF8F0] border-black/10"}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="font-black leading-none">{loc.city}</div>
                  <div className={`text-xs ${active===loc.id?"text-white/60":"text-black/50"}`}>{loc.type}</div>
                </div>
                <div className={`w-8 h-8 rounded-full grid place-items-center ${active===loc.id?"bg-white text-[#0A1931]":"bg-white border"}`}><MapPin size={14} /></div>
              </div>
              <div className={`text-xs mt-2 leading-relaxed ${active===loc.id?"text-white/70":"text-black/60"}`}>{loc.address}</div>
              <div className="flex gap-3 mt-2 text-xs">
                <span className="flex items-center gap-1"><Phone size={12}/>{loc.phone}</span>
              </div>
            </button>
          ))}
        </div>

        {activeLoc && (
          <motion.div layout className="bg-[#FFF8F0] rounded-2xl p-4 border border-black/10">
            <img src={activeLoc.image} alt={activeLoc.city} className="w-full h-28 object-cover rounded-xl" />
            <div className="font-bold mt-2">{activeLoc.city} • {activeLoc.type}</div>
            <div className="text-xs text-black/60 flex items-center gap-1 mt-1"><Clock size={12}/>{activeLoc.hours}</div>
            <a href={`https://www.google.com/maps/search/?api=1&query=${activeLoc.coords[0]},${activeLoc.coords[1]}`} target="_blank" className="mt-3 inline-flex w-full justify-center bg-[#E63946] text-white py-2 rounded-full font-bold text-sm">Itinéraire →</a>
          </motion.div>
        )}
      </div>

      <div className="h-[360px] md:h-[520px] rounded-[20px] overflow-hidden border border-black/10 bg-[#E2E8F0] relative">
        <div className="relative h-full">
          {/* @ts-ignore */}
          <MapContainer center={center} zoom={country==="CN" ? 5 : 6} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
            {/* @ts-ignore */}
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution="© OpenStreetMap" />
            {icon && filtered.map(loc => (
              // @ts-ignore
              <Marker key={loc.id} position={loc.coords} icon={icon} eventHandlers={{ click: () => setActive(loc.id) }}>
                {/* @ts-ignore */}
                <Popup><b>{loc.city}</b><br/>{loc.address}</Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}
