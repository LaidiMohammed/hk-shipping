import BureauxMap from "@/components/bureaux-map";

export default function NetworkPage(){
  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-6 py-8 md:py-12">
      <h1 className="font-black text-4xl tracking-tighter">Réseau & Couverture</h1>
      <p className="text-black/60 mt-2">48 wilayas livrées • 3 hubs Chine • Liaisons quotidiennes.</p>
      <div className="mt-6">
        <BureauxMap />
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-8">
        {[
          {k:"Guangzhou", v:"Hub Principal • 5000m²"},
          {k:"Yiwu", v:"Sourcing • Petit marché"},
          {k:"Shenzhen", v:"Électronique • Tech"},
        ].map(i=>(
          <div key={i.k} className="bg-white border border-black/10 rounded-2xl p-5">
            <div className="font-black">{i.k}</div><div className="text-sm text-black/60">{i.v}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
