"use client";
import { useState } from "react";
import { Calculator, Ship, Plane } from "lucide-react";

export default function QuotePage(){
  const [kg,setKg]=useState(10);
  const [type,setType]=useState<"air"|"sea">("air");
  const pricePerKg = type==="air"?12:6;
  const total = kg*pricePerKg;
  const [form,setForm]=useState({name:"",phone:""});
  const submit=(e:React.FormEvent)=>{
    e.preventDefault();
    const text=`Devis HK Shipping%0A Nom:${form.name}%0A Tel:${form.phone}%0A Type:${type}%0A Poids:${kg}kg%0A Total: $${total}`;
    window.open(`https://wa.me/213550000000?text=${text}`,"_blank");
    fetch("/api/quote",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...form,kg,type,total})});
    alert("Devis envoyé via WhatsApp & Email !");
  };
  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-6 py-8 md:py-12">
      <div className="max-w-3xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-[#0A1931] text-white px-4 py-2 rounded-full text-xs font-bold"><Calculator size={14}/> CALCULATEUR INSTANTANÉ</div>
          <h1 className="font-black text-4xl tracking-tighter mt-4">Devis gratuit en 30 secondes</h1>
          <p className="text-black/60 mt-2">Prix transparents, pas de surprise.</p>
        </div>

        <div className="mt-8 bg-white border border-black/10 rounded-[24px] p-6">
          <div className="grid grid-cols-2 gap-3">
            <button onClick={()=>setType("air")} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 ${type==="air"?"border-[#E63946] bg-[#FFF8F0]":"border-black/10"}`}>
              <Plane size={20}/><span className="font-bold text-sm">Air Express</span><span className="text-xs text-black/50">10-15j • 12$/kg</span>
            </button>
            <button onClick={()=>setType("sea")} className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 ${type==="sea"?"border-[#E63946] bg-[#FFF8F0]":"border-black/10"}`}>
              <Ship size={20}/><span className="font-bold text-sm">Mer Éco</span><span className="text-xs text-black/50">25-35j • 6$/kg</span>
            </button>
          </div>

          <div className="mt-6">
            <label className="font-bold text-sm">Poids (kg): {kg} kg</label>
            <input type="range" min={1} max={100} value={kg} onChange={e=>setKg(Number(e.target.value))} className="w-full mt-2 accent-[#E63946]" />
            <div className="flex justify-between text-xs text-black/40"><span>1 kg</span><span>100 kg</span></div>
          </div>

          <div className="mt-6 bg-[#0A1931] text-white rounded-2xl p-6 flex justify-between items-center">
            <div><div className="text-white/60 text-xs tracking-widest font-bold">TOTAL ESTIMÉ</div><div className="font-black text-3xl">${total} <span className="text-sm font-normal text-white/60">tout inclus</span></div></div>
            <div className="text-right text-xs text-white/60">Dédouanement<br/>Livraison incluse</div>
          </div>

          <form onSubmit={submit} className="mt-6 grid gap-3">
            <input placeholder="Votre nom" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required className="border border-black/10 rounded-full px-4 py-3 text-sm" />
            <input placeholder="WhatsApp / Téléphone" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} required className="border border-black/10 rounded-full px-4 py-3 text-sm" />
            <button className="bg-[#E63946] text-white py-4 rounded-full font-black">Obtenir mon devis →</button>
            <div className="text-xs text-center text-black/40">En cliquant, vous ouvrez WhatsApp + envoi email automatique.</div>
          </form>
        </div>
      </div>
    </div>
  );
}
