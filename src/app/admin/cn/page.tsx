"use client";
import { useEffect, useState } from "react";
import { Plane, Box, CheckCircle } from "lucide-react";

const steps = ["IN_CHINA","IN_AIR","AT_DZ_DEPOT"] as const;

export default function AdminCn() {
  const [orders, setOrders] = useState<any[]>([]);
  useEffect(()=>{
    const local = JSON.parse(localStorage.getItem("hk_last_order")||"null");
    if(local && local.status==="VALIDATED") setOrders([local]);
    fetch("/api/orders").then(r=>r.json()).then(d=>{
      const validated = (d.orders||[]).filter((o:any)=>o.status==="VALIDATED" || o.status==="IN_CHINA" || o.status==="IN_AIR");
      if(validated.length) setOrders(validated);
    }).catch(()=>{});
  },[]);

  const advance = (code8:string, next:string) => {
    setOrders(prev=> prev.map(o=> o.code8===code8 ? {...o, status: next} : o));
    const upd = orders.find(o=>o.code8===code8);
    if(upd){ const merged = {...upd, status: next}; localStorage.setItem("hk_last_order", JSON.stringify(merged)); }
    alert(`${code8} → ${next}`);
  };

  return (
    <div className="mx-auto max-w-[1080px] px-4 md:px-6 py-6">
      <h1 className="font-black text-2xl md:text-3xl tracking-tighter">Admin Chine — Étapes Avion</h1>
      <p className="text-sm text-black/50 mt-1">Vous ne voyez que les commandes Validées par DZ. 3 validations : En Chine → En Vol → Reçu DZ 100% vérifié.</p>

      <div className="mt-6 grid gap-3">
        {orders.map(o=>(
          <div key={o.code8} className="bg-white border border-black/10 rounded-2xl p-4">
            <div className="flex items-center gap-2">
              <span className="font-mono font-black bg-[#0A1931] text-white px-2 py-1 rounded text-xs">{o.code8}</span>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${o.status==="IN_CHINA"?"bg-amber-100 text-amber-700":o.status==="IN_AIR"?"bg-blue-100 text-blue-700":o.status==="AT_DZ_DEPOT"?"bg-green-100 text-green-700":"bg-black/5"}`}>{o.status}</span>
              <span className="ml-auto text-xs text-black/40">{o.prenom} {o.nom} • {o.name} × {o.qty}</span>
            </div>
            <div className="mt-4 flex gap-2">
              <button onClick={()=>advance(o.code8,"IN_CHINA")} disabled={o.status!=="VALIDATED"} className="flex-1 bg-white border py-3 rounded-full font-bold text-xs disabled:opacity-30 flex items-center justify-center gap-1"><Box size={14}/> 1. En Chine</button>
              <button onClick={()=>advance(o.code8,"IN_AIR")} disabled={o.status!=="IN_CHINA"} className="flex-1 bg-[#0A1931] text-white py-3 rounded-full font-black text-xs disabled:opacity-30 flex items-center justify-center gap-1"><Plane size={14}/> 2. En Vol</button>
              <button onClick={()=>advance(o.code8,"AT_DZ_DEPOT")} disabled={o.status!=="IN_AIR"} className="flex-1 bg-green-600 text-white py-3 rounded-full font-black text-xs disabled:opacity-30 flex items-center justify-center gap-1"><CheckCircle size={14}/> 3. Reçu DZ 100%</button>
            </div>
            <div className="mt-2 text-[11px] text-center text-black/40">Vert = validé, Jaune = attente, Rouge = erreur — même couleurs que client.</div>
          </div>
        ))}
        {!orders.length && <div className="text-center py-12 text-black/40">Aucune commande validée pour le moment.</div>}
      </div>
    </div>
  );
}
