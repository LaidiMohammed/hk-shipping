import { Ship, Plane, Home, FileCheck, ShoppingCart, Warehouse, Check } from "lucide-react";
import Link from "next/link";

const services = [
  { icon: Ship, title:"Fret Maritime", price:"Dès 6$/kg", time:"25-35 jours", desc:"Pour gros volumes, meubles, machines. Container groupé, assurance incluse.", features:["Regroupement gratuit","Assurance casse","Dédouanement inclus"]},
  { icon: Plane, title:"Fret Aérien", price:"Dès 12$/kg", time:"10-15 jours", desc:"Urgent, léger, valeur. Idéal e-commerce & téléphones.", features:["Vol quotidien","Suivi temps réel","Paiement à livraison"]},
  { icon: Home, title:"Door-to-Door", price:"Tout inclus", time:"10-35j", desc:"On gère enlèvement usine → livraison chez vous. Vous ne bougez pas.", features:["Enlèvement usine","Livraison 48 wilayas","0 paperasse"]},
  { icon: FileCheck, title:"Dédouanement", price:"Inclus", time:"2-3j", desc:"Factures, HS code, douane algérienne : on s'en charge.", features:["0 surprise","Facture conforme","Délai garanti"]},
  { icon: ShoppingCart, title:"Achats & Sourcing", price:"2% commission", time:"24h", desc:"Pas de fournisseur ? Notre équipe Yiwu achète, négocie, vérifie.", features:["Négociation prix","Contrôle qualité","Photos avant envoi"]},
  { icon: Warehouse, title:"Entreposage", price:"Gratuit 30j", time:"—", desc:"Stockage Chine, regroupement de colis, photos & pesée.", features:["Gratuit 30 jours","Regroupement","Reconditionnement"]},
];

export default function ServicesPage(){
  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-6 py-8 md:py-12">
      <div className="text-center max-w-2xl mx-auto">
        <div className="text-[#E63946] font-black tracking-[0.2em] text-xs">SERVICES</div>
        <h1 className="font-black text-5xl tracking-tighter leading-none mt-3">Un service pour <span className="text-[#E63946]">chaque besoin</span></h1>
        <p className="text-black/60 mt-4">Que vous importiez 5kg ou 5 tonnes, on a la solution la plus rentable.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {services.map(s=>{
          const Icon=s.icon;
          return (
          <div key={s.title} className="bg-white border border-black/10 rounded-[24px] p-6 flex flex-col hover:shadow-xl hover:-translate-y-1 transition">
            <div className="w-12 h-12 rounded-full bg-[#0A1931] text-white grid place-items-center"><Icon size={20}/></div>
            <div className="flex items-center gap-2 mt-4">
              <span className="bg-[#E63946] text-white text-xs font-black px-3 py-1 rounded-full">{s.price}</span>
              <span className="bg-[#FFF8F0] border text-xs font-bold px-3 py-1 rounded-full">{s.time}</span>
            </div>
            <h3 className="font-black text-xl mt-3">{s.title}</h3>
            <p className="text-sm text-black/60 mt-2 leading-relaxed">{s.desc}</p>
            <ul className="mt-4 space-y-2">
              {s.features.map(f=> <li key={f} className="flex items-center gap-2 text-sm"><Check size={14} className="text-green-600"/>{f}</li>)}
            </ul>
            <Link href="/quote" className="mt-6 inline-flex justify-center bg-[#0A1931] text-white py-3 rounded-full font-bold text-sm">Demander ce service →</Link>
          </div>
        )})}
      </div>
    </div>
  );
}
