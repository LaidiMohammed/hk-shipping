import BureauxMap from "@/components/bureaux-map";
import Link from "next/link";
import { ArrowRight, Award, Eye, Zap } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="mx-auto max-w-[1280px] w-full px-4 md:px-6 py-6 md:py-12">
        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-10 items-start">
          <div className="order-1">
            <div className="inline-flex items-center gap-2 bg-[#0A1931] text-white px-3 py-1.5 rounded-full text-[11px] font-black tracking-[0.14em]">À PROPOS • DEPUIS 2018</div>
            <h1 className="font-black tracking-tighter leading-[0.88] mt-4 text-[30px] sm:text-[36px] md:text-5xl lg:text-[56px]">
              On ne transporte pas des colis. <span className="text-[#E63946]">On transporte votre business.</span>
            </h1>
            <p className="text-black/60 mt-4 leading-relaxed text-[14px] md:text-[16px]">
              Depuis 2018, HK Shipping Express connecte les entrepreneurs algériens aux usines du monde. De la petite commande test au container complet, on s&apos;occupe de tout — avec photos, pesée et suivi HK-XXXXX.
            </p>
            <div className="grid grid-cols-3 gap-2 md:gap-3 mt-6">
              {[{k:"2018",l:"Depuis",sub:"8 ans"},{k:"10K+",l:"Clients",sub:"Actifs"},{k:"6",l:"Bureaux",sub:"DZ + CN"}].map(s=>(
                <div key={s.k} className="bg-white border border-black/10 rounded-2xl p-3 md:p-4 text-center">
                  <div className="font-black text-[18px] md:text-xl leading-none">{s.k}</div>
                  <div className="text-[11px] md:text-xs font-bold tracking-wide text-black/50 leading-none mt-1">{s.l}</div>
                  <div className="text-[10px] text-black/30 hidden md:block">{s.sub}</div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex gap-3">
              <Link href="/quote" className="flex-1 md:flex-none inline-flex justify-center items-center gap-2 bg-[#E63946] text-white px-6 py-3.5 rounded-full font-black text-sm active:scale-[0.98] transition">Devis Gratuit <ArrowRight size={16}/></Link>
              <Link href="/contact" className="hidden sm:inline-flex items-center gap-2 bg-white border border-black/10 px-6 py-3.5 rounded-full font-bold text-sm">Nous contacter</Link>
            </div>
          </div>

          <div className="order-2 relative">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80" alt="warehouse" className="rounded-[20px] md:rounded-[24px] h-[280px] sm:h-[360px] md:h-[480px] w-full object-cover" />
            <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 bg-white rounded-2xl p-3 md:p-4 flex items-center gap-3 shadow-xl">
              <img src="/hk.jpg" alt="HK" className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border" />
              <div className="min-w-0">
                <div className="font-black text-[13px] md:text-sm leading-none">HK Shipping Express</div>
                <div className="text-[11px] md:text-xs text-black/50 truncate">Alger • Guangzhou • Yiwu • Shenzhen</div>
              </div>
              <div className="ml-auto hidden sm:flex items-center gap-1 text-green-600 text-xs font-bold"><Award size={14}/> Vérifié</div>
            </div>
          </div>
        </div>

        {/* Pillars - snap on phone */}
        <div className="mt-8 md:mt-12">
          <div className="flex items-center justify-between">
            <h2 className="font-black tracking-tighter text-xl md:text-2xl">Pourquoi HK ?</h2>
            <span className="md:hidden text-xs text-black/40 font-bold">Glissez →</span>
          </div>
          <div className="mt-4 flex md:grid md:grid-cols-3 gap-3 overflow-x-auto scrollbar-hide snap-x -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0">
            {[
              {icon: Eye, title:"Transparence Totale", desc:"Photos HD, vidéos, pesée avant chaque envoi. Vous validez, on expédie."},
              {icon: Zap, title:"Rapidité Garantie", desc:"Air 10-15j, Mer 25-35j. Suivi temps réel HK-XXXXX inclus."},
              {icon: Award, title:"Proximité", desc:"Bureaux DZ + CN. On parle votre langue, on comprend votre marché."},
            ].map(c=> {
              const Icon=c.icon;
              return (
              <div key={c.title} className="snap-center shrink-0 w-[82vw] max-w-[300px] md:w-auto bg-[#0A1931] text-white rounded-[20px] p-5 md:p-6 flex flex-col">
                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/10 grid place-items-center"><Icon size={16}/></div>
                <h3 className="font-black text-[16px] md:text-lg mt-3">{c.title}</h3>
                <p className="text-white/60 text-[13px] md:text-sm mt-1.5 leading-relaxed">{c.desc}</p>
              </div>
            )})}
          </div>
        </div>

        {/* Bureaux */}
        <div className="mt-10 md:mt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <h2 className="font-black tracking-tighter text-[24px] md:text-4xl leading-none">Nos Bureaux • Algérie & Chine</h2>
              <p className="text-black/60 mt-2 text-[13px] md:text-sm leading-relaxed">Touchez une ville pour voir la carte. Tous nos bureaux vous accueillent 6j/7. Itinéraire direct vers Google Maps.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs bg-white border border-black/10 rounded-full px-3 py-1.5"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/> Ouvert aujourd&apos;hui</div>
          </div>
          <div className="mt-5 md:mt-6"><BureauxMap /></div>
        </div>

        {/* Histoire - pro stacked */}
        <div className="mt-8 md:mt-12 bg-white border border-black/10 rounded-[20px] md:rounded-[24px] overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="p-5 md:p-8 order-2 md:order-1">
              <h3 className="font-black text-xl md:text-2xl tracking-tight">Notre Histoire</h3>
              <div className="mt-4 relative border-l border-black/10 ml-2 pl-6 space-y-5">
                {[
                  {year:"2018", title:"Lancement à Alger", desc:"20 clients/mois, un petit entrepôt à Guangzhou. Premier container groupé."},
                  {year:"2020", title:"Ouverture Yiwu", desc:"Bureau sourcing + 500 clients/mois. Photos & contrôle qualité systématiques."},
                  {year:"2024", title:"Réseau 6 sites", desc:"+10K clients, porte-à-porte 48 wilayas, Air & Mer quotidiens."},
                ].map(s=>(
                  <div key={s.year} className="relative">
                    <div className="absolute -left-[29px] top-1 w-3 h-3 bg-[#E63946] rounded-full border-2 border-white shadow" />
                    <div className="text-[#E63946] font-black text-xs tracking-widest">{s.year}</div>
                    <div className="font-bold text-sm mt-0.5">{s.title}</div>
                    <div className="text-[13px] text-black/60 leading-relaxed mt-1">{s.desc}</div>
                  </div>
                ))}
              </div>
              <Link href="/how-it-works" className="mt-6 inline-flex items-center gap-2 text-sm font-black text-[#E63946]">Voir comment ça marche <ArrowRight size={14}/></Link>
            </div>
            <div className="order-1 md:order-2 relative min-h-[220px] md:min-h-0">
              <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=700&q=80" alt="team" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent md:hidden" />
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur rounded-full px-3 py-1.5 text-xs font-bold flex items-center gap-2 md:hidden">
                <span className="w-2 h-2 bg-[#E63946] rounded-full" /> 6 bureaux • 10K+ colis/mois
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
