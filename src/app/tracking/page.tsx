"use client";
import { useState } from "react";
import { Search, Package, Check, Truck, Plane, Home } from "lucide-react";

export default function TrackingPage(){
  const [code,setCode]=useState("");
  const [result,setResult]=useState<any>(null);
  const search=()=>{
    if(!code) return;
    // mock timeline
    setResult({
      code,
      status: "En Transit",
      steps: [
        {label:"Colis réceptionné", date:"12 Jan 2026", done:true, icon:Package},
        {label:"Contrôle qualité", date:"13 Jan", done:true, icon:Check},
        {label:"Expédié de Guangzhou", date:"14 Jan", done:true, icon:Plane},
        {label:"En vol → Alger", date:"15 Jan", done:true, icon:Plane},
        {label:"Dédouanement Alger", date:"17 Jan", done:false, icon:Truck},
        {label:"Livraison domicile", date:"18 Jan", done:false, icon:Home},
      ]
    });
  };
  return (
    <div className="mx-auto max-w-[880px] px-4 md:px-6 py-8 md:py-12">
      <div className="text-center">
        <h1 className="font-black text-4xl tracking-tighter">Suivre mon colis</h1>
        <p className="text-black/60 mt-2">Entrez votre code HK-XXXXXX (ex: HK-784291)</p>
      </div>

      <div className="mt-8 bg-white border border-black/10 rounded-[24px] p-6">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" size={18}/>
            <input value={code} onChange={e=>setCode(e.target.value)} placeholder="HK-784291" className="w-full border border-black/10 rounded-full pl-11 pr-4 py-4 text-sm focus:outline-none focus:border-[#E63946] font-mono" />
          </div>
          <button onClick={search} className="bg-[#0A1931] text-white px-8 py-4 rounded-full font-bold">Suivre</button>
        </div>
        {!result && <div className="text-center text-sm text-black/40 mt-6">Essayez HK-123456 pour voir la démo.</div>}

        {result && (
          <div className="mt-8">
            <div className="bg-[#0A1931] text-white rounded-2xl p-5 flex justify-between items-center">
              <div><div className="font-mono font-bold">{result.code}</div><div className="text-xs text-white/60">{result.status} • 68%</div></div>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
            <div className="mt-6 relative">
              <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-black/10" />
              <div className="space-y-4">
                {result.steps.map((s:any,i:number)=>{
                  const Icon=s.icon;
                  return (
                    <div key={i} className="flex gap-4 relative">
                      <div className={`w-10 h-10 rounded-full grid place-items-center border-2 shrink-0 z-10 ${s.done?"bg-green-500 border-green-500 text-white":"bg-white border-black/10 text-black/30"}`}>
                        <Icon size={16}/>
                      </div>
                      <div className={`flex-1 rounded-2xl p-4 border ${s.done?"bg-green-50 border-green-200":"bg-[#FFF8F0] border-black/10 opacity-60"}`}>
                        <div className="font-bold text-sm">{s.label}</div>
                        <div className="text-xs text-black/50">{s.date}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
