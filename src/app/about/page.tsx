import BureauxMap from "@/components/bureaux-map";

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="mx-auto max-w-[1280px] px-4 md:px-6 py-8 md:py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-[#E63946] font-black tracking-[0.2em] text-xs">À PROPOS</div>
            <h1 className="font-black text-5xl md:text-6xl tracking-tighter leading-[0.9] mt-3">On ne transporte pas des colis. <span className="text-[#E63946]">On transporte votre business.</span></h1>
            <p className="text-black/60 mt-4 leading-relaxed">Depuis 2018, HK Shipping Express connecte les entrepreneurs algériens aux usines du monde. De la petite commande test au container complet, on s'occupe de tout.</p>
            <div className="grid grid-cols-3 gap-3 mt-8">
              {[{k:"2018",l:"Depuis"},{k:"10K+",l:"Clients"},{k:"6",l:"Bureaux"}].map(s=>(
                <div key={s.k} className="bg-white border border-black/10 rounded-2xl p-4 text-center"><div className="font-black text-xl">{s.k}</div><div className="text-xs text-black/50">{s.l}</div></div>
              ))}
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80" alt="warehouse" className="rounded-[24px] h-[480px] w-full object-cover" />
        </div>

        <div className="grid md:grid-cols-3 gap-4 mt-12">
          {[
            {title:"Transparence Totale", desc:"Photos, vidéos, pesée avant chaque envoi. Vous validez, on expédie."},
            {title:"Rapidité Garantie", desc:"Air 10-15j, Mer 25-35j. Suivi temps réel HK-XXXXX."},
            {title:"Proximité", desc:"Bureaux en Algérie + Chine. On parle votre langue, on comprend votre marché."},
          ].map(c=>(
            <div key={c.title} className="bg-[#0A1931] text-white rounded-[20px] p-6">
              <h3 className="font-black text-lg">{c.title}</h3><p className="text-white/60 text-sm mt-2 leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h2 className="font-black text-3xl md:text-4xl tracking-tighter">Nos Bureaux • Algérie & Chine</h2>
          <p className="text-black/60 mt-2">Cliquez sur une ville pour voir la carte. Tous nos bureaux vous accueillent 6j/7.</p>
          <div className="mt-6"><BureauxMap /></div>
        </div>

        <div className="mt-12 bg-white border border-black/10 rounded-[24px] p-8 grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-black text-xl">Notre Histoire</h3>
            <div className="mt-4 space-y-3 text-sm text-black/60 leading-relaxed">
              <p><b className="text-[#0A1931]">2018</b> — Lancement à Alger avec 20 clients/mois, un petit entrepôt à Guangzhou.</p>
              <p><b className="text-[#0A1931]">2020</b> — Ouverture Yiwu pour le sourcing. 500 clients/mois.</p>
              <p><b className="text-[#0A1931]">2024</b> — 6 sites, +10K clients, porte à porte 48 wilayas.</p>
            </div>
          </div>
          <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&q=80" alt="team" className="rounded-2xl h-64 object-cover" />
        </div>
      </section>
    </div>
  );
}
