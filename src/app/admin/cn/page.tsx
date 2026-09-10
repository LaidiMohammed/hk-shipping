"use client";
import { useEffect, useState, useRef } from "react";
import { Plane, Box, CheckCircle, Search, Camera, X, ScanLine } from "lucide-react";

const steps = ["IN_CHINA","IN_AIR","AT_DZ_DEPOT"] as const;

export default function AdminCn() {
  const [orders, setOrders] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [showScanner, setShowScanner] = useState(false);
  const scannerRef = useRef<any>(null);
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

  const filtered = orders.filter(o=>{
    if(!search) return true;
    const hay = `${o.code8} ${o.id} ${o.phone} ${o.nom} ${o.prenom} ${o.name}`.toLowerCase();
    return hay.includes(search.toLowerCase());
  });

  const openScanner = async () => {
    setShowScanner(true);
    setTimeout(async()=>{
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        const qr = new Html5Qrcode("hk-qr-reader-cn");
        scannerRef.current = qr;
        await qr.start({ facingMode: "environment" }, { fps:10, qrbox:{width:250,height:250}},
          (decoded:string)=>{
            const m = decoded.match(/(HK[ -]?[A-Z0-9]{6,8})/i);
            const code = m? m[1].replace(/[^A-Z0-9]/gi,"").toUpperCase(): decoded.trim().toUpperCase();
            const found = filtered.find(o=> o.code8.toUpperCase()===code) || orders.find(o=> decoded.toUpperCase().includes(o.code8.toUpperCase()));
            if(found){ qr.stop().catch(()=>{}); setShowScanner(false); setSearch(found.code8);}
            else alert(`QR: ${decoded.slice(0,60)} — non trouvé`);
          }, ()=>{});
      } catch(e){ alert("Caméra indisponible"); }
    },300);
  };

  const closeScanner = ()=>{ try{ scannerRef.current?.stop()?.catch(()=>{});}catch{} setShowScanner(false); };

  return (
    <div className="mx-auto max-w-[1080px] px-4 md:px-6 py-6">
      <h1 className="font-black text-2xl md:text-3xl tracking-tighter">Admin Chine — Étapes Avion</h1>
      <p className="text-sm text-black/50 mt-1">Vous ne voyez que les commandes Validées par DZ. 3 validations : En Chine → En Vol → Reçu DZ 100% vérifié.</p>

      <div className="mt-4 flex gap-2">
        <div className="flex-1 relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Scanner QR ou rechercher code8, tel, nom..." className="w-full border rounded-full pl-9 pr-4 py-2.5 text-sm"/><button onClick={openScanner} className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#0A1931] text-white p-1.5 rounded-full"><Camera size={14}/></button></div>
        <button onClick={openScanner} className="hidden md:inline-flex items-center gap-2 bg-[#0A1931] text-white px-4 py-2.5 rounded-full text-sm font-black"><ScanLine size={14}/> Scanner QR</button>
      </div>
      {showScanner && (
        <div className="fixed inset-0 z-50 bg-black/70 grid place-items-center p-4" onClick={closeScanner}>
          <div onClick={e=>e.stopPropagation()} className="bg-white rounded-2xl w-full max-w-[400px] p-4"><div className="flex justify-between items-center"><h3 className="font-black">Scanner</h3><button onClick={closeScanner} className="w-8 h-8 bg-black text-white rounded-full grid place-items-center"><X size={14}/></button></div><div id="hk-qr-reader-cn" className="mt-3 w-full aspect-square bg-black rounded-xl overflow-hidden"/><div className="text-xs text-center text-black/40 mt-2">QR code8, tel, id, nom — tout est cherchable</div></div>
        </div>
      )}

      <div className="mt-6 grid gap-3">
        {filtered.map(o=>(
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
