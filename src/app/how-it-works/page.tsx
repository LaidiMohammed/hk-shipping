export default function HowPage(){
  const steps=[
    {n:"01", t:"Vous commandez", d:"Envoyez-nous les liens Taobao/1688/Alibaba ou demandez sourcing. Notre équipe Yiwu négocie pour vous.", img:"https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&q=80"},
    {n:"02", t:"On contrôle", d:"Réception à Guangzhou, photos HD, vérification quantité/qualité, pesée précise. Vous validez.", img:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&q=80"},
    {n:"03", t:"On expédie", d:"Choisissez Air (10-15j) ou Mer (25-35j). On déclare la douane, on emballe pro.", img:"https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&q=80"},
    {n:"04", t:"Vous recevez", d:"Livraison 48 wilayas, suivi HK-XXXXX temps réel, paiement à la réception. Zéro stress.", img:"https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&q=80"},
  ];
  return (
    <div className="mx-auto max-w-[1280px] px-6 py-12">
      <div className="text-center">
        <div className="text-[#E63946] font-black tracking-[0.2em] text-xs">PROCESSUS</div>
        <h1 className="font-black text-5xl tracking-tighter mt-3">Comment ça marche ?</h1>
        <p className="text-black/60 mt-3">4 étapes simples. On gère la complexité pour vous.</p>
      </div>
      <div className="mt-10 space-y-6">
        {steps.map((s,i)=>(
          <div key={s.n} className={`grid md:grid-cols-2 gap-6 items-center bg-white border border-black/10 rounded-[24px] p-6 ${i%2===1?"md:[&>*:first-child]:order-2":""}`}>
            <div>
              <div className="text-6xl font-black text-black/5">{s.n}</div>
              <div className="inline-flex w-10 h-10 rounded-full bg-[#E63946] text-white grid place-items-center font-black -mt-6 relative">{s.n}</div>
              <h3 className="font-black text-2xl mt-4">{s.t}</h3>
              <p className="text-black/60 mt-2 leading-relaxed">{s.d}</p>
            </div>
            <img src={s.img} alt={s.t} className="rounded-2xl h-64 w-full object-cover" />
          </div>
        ))}
      </div>
      <div className="mt-10 bg-[#0A1931] text-white rounded-[24px] p-8 text-center">
        <h3 className="font-black text-2xl">Besoin d'une démo ?</h3>
        <p className="text-white/60 mt-2">Regardez comment suivre votre colis en temps réel.</p>
        <a href="/tracking" className="mt-4 inline-flex bg-[#E63946] text-white px-8 py-3 rounded-full font-bold">Tester le suivi →</a>
      </div>
    </div>
  );
}
