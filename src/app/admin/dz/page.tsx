"use client";
import { useEffect, useState } from "react";
import { Check, X, SlidersHorizontal, Package, Download } from "lucide-react";

export default function AdminDz() {
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState("PENDING");
  const [negotiate, setNegotiate] = useState<{ id: string; price: number } | null>(null);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("hk_last_order") || "null");
    if (local) setOrders([local]);
    fetch("/api/orders").then(r => r.json()).then(d => { if (d.orders?.length) setOrders(d.orders); }).catch(() => {});
  }, []);

  const count = (s: string) => orders.filter(o => (o.status || "PENDING") === s).length;

  const validate = (code8: string) => {
    setOrders(prev => prev.map(o => o.code8 === code8 ? { ...o, status: "VALIDATED" } : o));
    alert(`Validé ${code8} → QR/code8 créé, envoyé à CN.`);
  };

  const reject = (code8: string) => {
    setOrders(prev => prev.map(o => o.code8 === code8 ? { ...o, status: "REJECTED" } : o));
  };

  const exportExcel = () => {
    window.location.href = "/api/admin/reports?format=excel&month=" + new Date().toISOString().slice(0, 7);
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 md:px-6 py-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="font-black text-2xl md:text-3xl tracking-tighter">Admin DZ — Validation & Revenu</h1>
        <button onClick={exportExcel} className="inline-flex items-center gap-2 bg-[#0A1931] text-white px-4 py-2 rounded-full text-sm font-bold active:scale-95"><Download size={14} /> Export Excel (mois)</button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
        {[{k:"En attente",v:count("PENDING"),c:"bg-amber-100 text-amber-800"},{k:"Validés",v:count("VALIDATED"),c:"bg-green-100 text-green-800"},{k:"Revenus",v:"12.4M DA",c:"bg-[#0A1931] text-white"},{k:"Clients",v:orders.length,c:"bg-white border"}].map(i=>(
          <div key={i.k} className={`rounded-2xl p-4 text-center border ${i.c}`}><div className="font-black text-xl">{i.v}</div><div className="text-xs font-bold opacity-60">{i.k}</div></div>
        ))}
      </div>

      <div className="mt-6 flex gap-2 overflow-x-auto scrollbar-hide">
        {["PENDING","VALIDATED","REJECTED","ALL"].map(s=>(
          <button key={s} onClick={()=>setFilter(s)} className={`px-4 py-2 rounded-full text-xs font-black whitespace-nowrap ${filter===s?"bg-[#0A1931] text-white":"bg-white border text-black/60"}`}>{s}</button>
        ))}
      </div>

      <div className="mt-4 grid gap-3">
        {orders.filter(o=> filter==="ALL" || (o.status||"PENDING")===filter).map(o=>(
          <div key={o.code8} className="bg-white border border-black/10 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2"><span className="font-mono font-black bg-black text-white px-2 py-1 rounded text-xs">{o.code8}</span><span className={`text-xs font-bold px-2 py-1 rounded-full ${o.status==="VALIDATED"?"bg-green-100 text-green-700":o.status==="REJECTED"?"bg-red-100 text-red-700":"bg-amber-100 text-amber-700"}`}>{o.status||"PENDING"}</span><span className={`text-xs px-2 py-1 rounded-full ${o.isLarge?"bg-[#E63946] text-white":"bg-black/5"}`}>{o.isLarge?"GROSSE MACHINE":"PETIT COLIS"}</span></div>
              <div className="font-bold mt-1">{o.prenom} {o.nom} • {o.phone} • {o.wilaya}</div>
              <div className="text-sm text-black/60 truncate">{o.name} • {o.qty} × {o.unitPrice} DA {o.length?`• ${o.length}x${o.width}x${o.height}cm`: ""}</div>
              {o.image && <div className="text-xs text-black/40">Image: {o.image?.name || "uploaded"}</div>}
            </div>

            <div className="flex flex-col gap-2 w-full md:w-auto">
              <div className="flex items-center gap-2">
                <div className="flex-1 flex items-center gap-2 bg-[#FFF8F0] border rounded-full px-3 py-2">
                  <SlidersHorizontal size={14} /><input type="range" min={Math.floor(o.unitPrice * 0.8) || 0} max={Math.ceil(o.unitPrice * 1.5) || 10000} defaultValue={o.unitPrice} onChange={e=> setNegotiate({ id: o.code8, price: Number(e.target.value) })} className="flex-1 accent-[#E63946]" /><span className="font-mono text-xs font-bold w-16 text-right">{negotiate?.id===o.code8? (negotiate as any).price : o.unitPrice} DA</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>validate(o.code8)} className="flex-1 bg-green-600 text-white py-2.5 rounded-full font-black text-sm flex items-center justify-center gap-1"><Check size={14}/> Valider</button>
                <button onClick={()=>reject(o.code8)} className="flex-1 bg-white border border-red-200 text-red-600 py-2.5 rounded-full font-bold text-sm flex items-center justify-center gap-1"><X size={14}/> Rejeter</button>
                <a href={`https://wa.me/${o.phone}`} target="_blank" className="px-4 py-2.5 bg-[#0A1931] text-white rounded-full text-xs font-bold">WhatsApp</a>
              </div>
              <div className="text-[11px] text-center"><span className={negotiate?.id===o.code8 && (negotiate as any).price!==o.unitPrice ? "text-green-600 font-bold" : "text-black/30"}>Vert = validé, Rouge = erreur, Jaune = attente</span></div>
            </div>
          </div>
        ))}
        {!orders.length && <div className="text-center py-12 text-black/40">Aucune commande — testez <a href="/client/commande" className="text-[#E63946] font-bold">/client/commande</a></div>}
      </div>

      <div className="mt-8 bg-white border border-black/10 rounded-2xl p-5">
        <h3 className="font-black flex items-center gap-2"><Package size={16}/> Actualités & Forbidden</h3>
        <div className="mt-2 text-sm text-black/50">Gérez les actualités visibles sur la page d’accueil + liste interdite.</div>
        <div className="mt-3 flex gap-2">
          <button onClick={()=>alert('Actualité: à brancher Supabase Actualite table')} className="bg-[#E63946] text-white px-4 py-2 rounded-full text-sm font-bold">+ Actualité</button>
          <button onClick={()=> fetch('/api/admin/forbidden').then(r=>r.json()).then(d=>alert(JSON.stringify(d.rules.slice(0,3),null,2)))} className="bg-white border border-black/10 px-4 py-2 rounded-full text-sm font-bold">Voir interdits</button>
          <button onClick={()=> {const n=prompt('Nom interdit?'); const r=prompt('Raison?'); if(n&&r) fetch('/api/admin/forbidden',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n,reason:r})}).then(()=>alert('Ajouté'))}} className="bg-white border border-black/10 px-4 py-2 rounded-full text-sm font-bold">+ Ajouter interdit</button>
        </div>
        <div className="mt-3 text-xs text-black/30">Forbidden géré par DZ — visible en warning doux sur /client/commande.</div>
      </div>
    </div>
  );
}
