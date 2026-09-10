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
      <section className="mx-auto max-w-[1280px] px-4 md:px-6 py-8 md:py-16">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
          <div>
            <div className="text-[#E63946] font-black tracking-[0.2em] text-[11px] md:text-xs mb-2 md:mb-3">RÉSEAU GLOBAL</div>
            <h2 className="font-black text-[28px] md:text-5xl tracking-tighter leading-[0.9]">
              De <span className="text-[#E63946]">Guangzhou</span> à chez vous.<br />En un seul trajet.
            </h2>
            <p className="text-black/60 mt-3 md:mt-4 text-[14px] md:text-base leading-relaxed">Entrepôts à Guangzhou, Yiwu & Shenzhen. Collecte quotidienne, regroupement gratuit, contrôle qualité photo avant envoi.</p>
            <div className="grid grid-cols-3 gap-2 md:gap-4 mt-6 md:mt-8">
              {[{k:"10-15j",l:"Air Express"},{k:"12-15j",l:"Air Éco"},{k:"0%",l:"Casse"}].map(i=>(
                <div key={i.k} className="bg-white border border-black/10 rounded-2xl p-3 md:p-4 text-center">
                  <div className="font-black text-[16px] md:text-xl">{i.k}</div><div className="text-[11px] md:text-xs text-black/50 leading-tight">{i.l}</div>
                </div>
              ))}
            </div>
            <Link href="/network" className="mt-5 md:mt-6 inline-flex items-center justify-center gap-2 bg-[#0A1931] text-white px-6 py-3.5 md:py-3 rounded-full font-black text-sm w-full md:w-auto active:scale-[0.98] transition">Voir le réseau <ArrowRight size={16}/></Link>
          </div>
          <div className="relative bg-[#0A1931] rounded-[20px] md:rounded-[24px] p-3 md:p-6 overflow-hidden">
            <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&q=80" alt="map" className="rounded-xl md:rounded-2xl w-full h-[260px] md:h-[380px] object-cover opacity-90" />
            <div className="absolute bottom-4 md:bottom-8 left-4 md:left-8 right-4 md:right-8 bg-white rounded-2xl p-3 md:p-4 flex items-center gap-3 shadow-xl">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#E63946] grid place-items-center text-white"><Truck size={16}/></div>
              <div className="min-w-0"><div className="font-black leading-none text-[13px] md:text-sm">Trajet en cours</div><div className="text-[11px] md:text-xs text-black/50 truncate">Guangzhou → Alger • HK-992341</div></div>
              <div className="ml-auto text-[11px] md:text-xs font-black bg-green-100 text-green-700 px-2.5 md:px-3 py-1 rounded-full shrink-0">EN VOL</div>
            </div>
            {/* Arc SVG */}
            <svg className="absolute top-10 left-10 w-3/4 h-3/4 pointer-events-none opacity-30" viewBox="0 0 400 200">
              <path d="M 40 150 Q 200 20 360 150" fill="none" stroke="#E63946" strokeWidth="2" strokeDasharray="6 6" />
            </svg>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white border-y border-black/10 py-8 md:py-14">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-black text-xl md:text-2xl tracking-tighter">Ils nous font confiance</h3>
            <div className="flex items-center gap-1 text-[#E63946] text-sm shrink-0"><Star size={14} fill="currentColor" /> 4.9/5 • 1,200 avis</div>
          </div>
          <div className="flex md:grid md:grid-cols-3 gap-3 overflow-x-auto scrollbar-hide snap-x -mx-4 px-4 md:mx-0 md:px-0 mt-6 md:mt-8 pb-2 md:pb-0">
            {[
              {name:"Amine B.", city:"Alger", text:"3 ans avec HK, zéro colis perdu. Équipe hyper réactive sur WhatsApp."},
              {name:"Sarah M.", city:"Oran", text:"J'importe depuis Yiwu. Le service achat m'a économisé 30%."},
              {name:"Youcef K.", city:"Constantine", text:"Livraison 12j par avion, emballage nickel. Paiement à livraison."},
            ].map(c=>(
              <div key={c.name} className="snap-center shrink-0 w-[84vw] max-w-[320px] md:w-auto bg-[#FFF8F0] border border-black/10 rounded-[20px] p-5 md:p-6">
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
      <section className="mx-auto max-w-[1280px] px-4 md:px-6 py-8 md:py-12">
        <div className="bg-[#E63946] rounded-[24px] md:rounded-[32px] p-6 md:p-12 text-white relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="relative grid md:grid-cols-[1.2fr_0.8fr] gap-6 md:gap-8 items-center">
            <div>
              <h3 className="font-black text-[26px] md:text-5xl tracking-tighter leading-[0.9]">Prêt à importer sans stress ?</h3>
              <p className="text-white/80 mt-3 text-sm md:text-base">Devis gratuit en 5 minutes. Réponse WhatsApp en 15 min.</p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link href="/quote" className="bg-white text-[#E63946] px-7 py-3.5 rounded-full font-black inline-flex items-center justify-center gap-2 active:scale-[0.98] transition">Devis Gratuit <Zap size={16}/></Link>
                <Link href="/contact" className="bg-black text-white px-7 py-3.5 rounded-full font-bold inline-flex justify-center">Nous Contacter</Link>
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
