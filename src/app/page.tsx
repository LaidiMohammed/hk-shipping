import Hero from "@/components/hero";
import Marquee from "@/components/marquee";
import ServicesPreview from "@/components/services-preview";
import HowTeaser from "@/components/how-teaser";
import Link from "next/link";
import { ArrowRight, Star, Quote, Truck, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Marquee />
      <ServicesPreview />
      <HowTeaser />

      {/* Coverage */}
      <section className="mx-auto max-w-[1280px] px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="text-[#E63946] font-black tracking-[0.2em] text-xs mb-3">RÉSEAU GLOBAL</div>
            <h2 className="font-black text-4xl md:text-5xl tracking-tighter leading-[0.9]">
              De <span className="text-[#E63946]">Guangzhou</span> à chez vous.<br />En un seul trajet.
            </h2>
            <p className="text-black/60 mt-4 leading-relaxed">Entrepôts à Guangzhou, Yiwu & Shenzhen. Collecte quotidienne, regroupement gratuit, contrôle qualité photo avant envoi. Votre stock est entre de bonnes mains.</p>
            <div className="grid grid-cols-3 gap-4 mt-8">
              {[{k:"10-15j",l:"Air Express"},{k:"25-35j",l:"Mer Éco"},{k:"0%",l:"Casse"}].map(i=>(
                <div key={i.k} className="bg-white border border-black/10 rounded-2xl p-4 text-center">
                  <div className="font-black text-xl">{i.k}</div><div className="text-xs text-black/50">{i.l}</div>
                </div>
              ))}
            </div>
            <Link href="/network" className="mt-6 inline-flex items-center gap-2 bg-[#0A1931] text-white px-6 py-3 rounded-full font-bold">Voir le réseau <ArrowRight size={16}/></Link>
          </div>
          <div className="relative bg-[#0A1931] rounded-[24px] p-6 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&q=80" alt="map" className="rounded-2xl w-full h-[380px] object-cover opacity-90" />
            <div className="absolute bottom-8 left-8 right-8 bg-white rounded-2xl p-4 flex items-center gap-3 shadow-xl">
              <div className="w-10 h-10 rounded-full bg-[#E63946] grid place-items-center text-white"><Truck size={18}/></div>
              <div><div className="font-bold leading-none">Trajet en cours</div><div className="text-xs text-black/50">Guangzhou → Alger • HK-992341</div></div>
              <div className="ml-auto text-xs font-bold bg-green-100 text-green-700 px-3 py-1 rounded-full">EN VOL</div>
            </div>
            {/* Arc SVG */}
            <svg className="absolute top-10 left-10 w-3/4 h-3/4 pointer-events-none opacity-30" viewBox="0 0 400 200">
              <path d="M 40 150 Q 200 20 360 150" fill="none" stroke="#E63946" strokeWidth="2" strokeDasharray="6 6" />
            </svg>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white border-y border-black/10 py-14">
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="flex items-center justify-between">
            <h3 className="font-black text-2xl tracking-tighter">Ils nous font confiance</h3>
            <div className="flex items-center gap-1 text-[#E63946]"><Star size={16} fill="currentColor" /> 4.9/5 • 1,200 avis</div>
          </div>
          <div className="grid md:grid-cols-3 gap-4 mt-8">
            {[
              {name:"Amine B.", city:"Alger", text:"3 ans avec HK, zéro colis perdu. Équipe hyper réactive sur WhatsApp. Je recommande à 100%."},
              {name:"Sarah M.", city:"Oran", text:"J'importe du prêt-à-porter depuis Yiwu. Le service achat m'a économisé 30% sur mes coûts."},
              {name:"Youcef K.", city:"Constantine", text:"Livraison en 12 jours par avion, emballage nickel. Paiement à la livraison rassurant."},
            ].map(c=>(
              <div key={c.name} className="bg-[#FFF8F0] border border-black/10 rounded-[20px] p-6">
                <Quote size={20} className="text-black/20" />
                <p className="mt-3 text-sm leading-relaxed">“{c.text}”</p>
                <div className="flex items-center gap-3 mt-4">
                  <img src={`https://i.pravatar.cc/100?img=${Math.floor(Math.random()*20)+10}`} alt="" className="w-9 h-9 rounded-full" />
                  <div><div className="font-bold text-sm leading-none">{c.name}</div><div className="text-xs text-black/50">{c.city}</div></div>
                  <div className="ml-auto flex text-[#E63946]">{[1,2,3,4,5].map(i=><Star key={i} size={12} fill="currentColor"/>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-[1280px] px-6 py-12">
        <div className="bg-[#E63946] rounded-[32px] p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="relative grid md:grid-cols-[1.2fr_0.8fr] gap-8 items-center">
            <div>
              <h3 className="font-black text-3xl md:text-5xl tracking-tighter leading-[0.9]">Prêt à importer sans stress ?</h3>
              <p className="text-white/80 mt-3">Devis gratuit en 5 minutes. Réponse WhatsApp en 15 min.</p>
              <div className="flex gap-3 mt-6">
                <Link href="/quote" className="bg-white text-[#E63946] px-7 py-3 rounded-full font-black inline-flex items-center gap-2">Devis Gratuit <Zap size={16}/></Link>
                <Link href="/contact" className="bg-black text-white px-7 py-3 rounded-full font-bold">Nous Contacter</Link>
              </div>
            </div>
            <div className="bg-white text-[#0A1931] rounded-[20px] p-6">
              <div className="flex items-center gap-2 font-bold"><Shield size={18} className="text-green-600"/> Garanties HK</div>
              <ul className="mt-3 space-y-2 text-sm">
                <li>✓ Remboursement si retard {'>'} 3 jours</li>
                <li>✓ Photos & pesée avant envoi</li>
                <li>✓ Assurance casse incluse</li>
                <li>✓ Paiement à la livraison</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
