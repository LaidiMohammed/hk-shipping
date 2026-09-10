"use client";
import { useEffect, useState, useRef } from "react";
import { Check, X, SlidersHorizontal, Download, Search, Package, Users, TrendingUp, AlertTriangle, Plane, MapPin, Calendar, Eye, Trash2, Edit3, Plus, FileText, Shield, Clock, DollarSign, Truck, Camera, ScanLine } from "lucide-react";

type Tab = "overview" | "orders" | "clients" | "admins" | "reports" | "forbidden";

export default function AdminDz() {
  const [tab, setTab] = useState<Tab>("overview");
  const [orders, setOrders] = useState<any[]>([]);
  const [filter, setFilter] = useState("ALL");
  const [search, setSearch] = useState("");
  const [negotiate, setNegotiate] = useState<{ id: string; price: number } | null>(null);
  const [selected, setSelected] = useState<any>(null);
  const [forbidden, setForbidden] = useState<any[]>([]);
  const [showForbiddenForm, setShowForbiddenForm] = useState(false);
  const [newForbidden, setNewForbidden] = useState({ name: "", reason: "" });
  const [showScanner, setShowScanner] = useState(false);
  const [scanError, setScanError] = useState("");
  const scannerRef = useRef<any>(null);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("hk_last_order") || "null");
    fetch("/api/orders").then(r => r.json()).then(d => {
      let list = d.orders || [];
      if (local && !list.find((o: any) => o.code8 === local.code8)) list = [local, ...list];
      // add more mock variety for demo
      if (list.length < 5) {
        list = [
          ...list,
          { code8: "HK8K2P9Q", status: "IN_CHINA", nom: "Boudiaf", prenom: "Rami", phone: "0550881122", wilaya: "Blida", address: "Ouled Yaich", name: "Téléphones - 30 pcs", qty: 30, unitPrice: 18500, length: "40", width: "30", height: "25", weight: "18", isLarge: false, createdAt: new Date(Date.now() - 86400000 * 2).toISOString() },
          { code8: "HK1A3Z7Y", status: "AT_DZ_DEPOT", nom: "Hamza", prenom: "Nassim", phone: "0770998877", wilaya: "Constantine", address: "Ali Mendjli", name: "Vêtements enfants - 200 pcs", qty: 200, unitPrice: 900, length: "70", width: "50", height: "40", weight: "35", isLarge: false, createdAt: new Date(Date.now() - 86400000 * 5).toISOString() },
          { code8: "HK5T6U1W", status: "REJECTED", nom: "AileVoiture", prenom: "Test", phone: "0660000000", wilaya: "Alger", address: "Test", name: "Aile voiture non démontable", qty: 1, unitPrice: 30000, isLarge: true, dismantlable: false, createdAt: new Date().toISOString() },
        ];
      }
      setOrders(list);
    }).catch(() => {});
    fetch("/api/admin/forbidden").then(r => r.json()).then(d => setForbidden(d.rules || [])).catch(() => {});
  }, []);

  const count = (s: string) => orders.filter(o => (o.status || "PENDING") === s).length;
  const totalRevenue = orders.filter(o => o.status === "VALIDATED" || o.status === "AT_DZ_DEPOT" || o.status === "DELIVERED").reduce((a, o) => a + (o.negotiationPrice || o.unitPrice) * (o.qty || 1), 0);
  const pendingRevenue = orders.filter(o => o.status === "PENDING").reduce((a, o) => a + o.unitPrice * (o.qty || 1), 0);

  const filtered = orders.filter(o => {
    if (filter !== "ALL" && (o.status || "PENDING") !== filter) return false;
    if (search) {
      const hay = `${o.code8} ${o.id} ${o.nom} ${o.prenom} ${o.phone} ${o.name} ${o.wilaya} ${o.address} ${o.deliveryAddress || ""}`.toLowerCase();
      if (!hay.includes(search.toLowerCase())) return false;
    }
    return true;
  });

  const openScanner = async () => {
    setShowScanner(true);
    setScanError("");
    // dynamic import to avoid SSR
    setTimeout(async () => {
      try {
        const { Html5Qrcode } = await import("html5-qrcode");
        const id = "hk-qr-reader";
        const qr = new Html5Qrcode(id);
        scannerRef.current = qr;
        await qr.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decoded: string) => {
            // try extract code8: HKxxxxx or HK-xxxxx or raw 8 chars
            const m = decoded.match(/(HK[ -]?[A-Z0-9]{6,8})|([A-Z0-9]{8})/i);
            const code = m ? (m[1] || m[2]).replace(/[^A-Z0-9]/gi, "").toUpperCase() : decoded.trim().toUpperCase();
            // normalize: ensure starts with HK if 6-8 len without HK, try find order
            let found = orders.find(o => o.code8.toUpperCase() === code) || orders.find(o => code.includes(o.code8.toUpperCase())) || orders.find(o => decoded.toUpperCase().includes(o.code8.toUpperCase()));
            if (!found && code.length === 8) found = orders.find(o => o.code8.slice(-8) === code);
            if (found) {
              qr.stop().catch(()=>{});
              setShowScanner(false);
              setSelected(found);
              setSearch(found.code8);
              setTab("orders");
            } else {
              // if decoded contains HK:xxx payload with |, extract first part
              const first = decoded.split("|")[0].replace(/[^A-Z0-9]/gi, "");
              const f2 = orders.find(o => first.includes(o.code8.toUpperCase()));
              if (f2) {
                qr.stop().catch(()=>{});
                setShowScanner(false);
                setSelected(f2);
              } else {
                setScanError(`QR lu: ${decoded.slice(0,60)} — aucun client trouvé. Essayez recherche manuelle.`);
              }
            }
          },
          () => {}
        );
      } catch (e: any) {
        setScanError(e?.message || "Caméra indisponible");
      }
    }, 300);
  };

  const closeScanner = () => {
    try { scannerRef.current?.stop()?.catch(()=>{}); } catch {}
    setShowScanner(false);
  };

  const validate = (code8: string) => { setOrders(prev => prev.map(o => o.code8 === code8 ? { ...o, status: "VALIDATED" } : o)); alert(`${code8} validé → QR créé, transmis à CN`); };
  const reject = (code8: string) => { if (confirm("Rejeter ?")) setOrders(prev => prev.map(o => o.code8 === code8 ? { ...o, status: "REJECTED" } : o)); };
  const exportExcel = () => { window.location.href = "/api/admin/reports?format=excel&month=" + new Date().toISOString().slice(0, 7); };

  const tabs: { id: Tab; label: string; icon: any; count?: number }[] = [
    { id: "overview", label: "Vue d'ensemble", icon: TrendingUp },
    { id: "orders", label: "Commandes", icon: Package, count: orders.length },
    { id: "clients", label: "Clients", icon: Users, count: new Set(orders.map(o => o.phone)).size },
    { id: "admins", label: "Admins", icon: Shield, count: 2 },
    { id: "reports", label: "Rapports", icon: FileText },
    { id: "forbidden", label: "Interdits", icon: AlertTriangle, count: forbidden.length },
  ];

  return (
    <div className="mx-auto max-w-[1360px] px-3 md:px-6 py-4 md:py-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="font-black text-2xl md:text-3xl tracking-tighter">Admin DZ <span className="text-[#E63946]">— Centre de contrôle</span></h1>
          <p className="text-xs md:text-sm text-black/50 mt-1">Gestion complète: validation, négociation, revenu, clients, admins, rapports, interdits, actualités. Air uniquement.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={exportExcel} className="inline-flex items-center gap-2 bg-[#0A1931] text-white px-4 py-2.5 rounded-full text-xs md:text-sm font-black active:scale-95"><Download size={14} /> Export Excel</button>
          <a href="/client/commande" className="hidden md:inline-flex items-center gap-2 bg-white border px-4 py-2.5 rounded-full text-sm font-bold">Voir formulaire client →</a>
        </div>
      </div>

      {/* Tab bar */}
      <div className="mt-5 flex gap-1.5 overflow-x-auto scrollbar-hide pb-1 -mx-3 px-3 md:mx-0 md:px-0">
        {tabs.map(t => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} className={`shrink-0 inline-flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-black whitespace-nowrap border transition ${tab === t.id ? "bg-[#0A1931] text-white border-transparent shadow" : "bg-white border-black/10 text-black/60 hover:border-black/20"}`}>
              <Icon size={14} /> {t.label} {t.count !== undefined && <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${tab === t.id ? "bg-white text-[#0A1931]" : "bg-black/5"}`}>{t.count}</span>}
            </button>
          );
        })}
      </div>

      {/* OVERVIEW */}
      {tab === "overview" && (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3 mt-5">
            <div className="bg-[#0A1931] text-white rounded-2xl p-4"><div className="text-[11px] tracking-widest font-bold opacity-60">REVENU TOTAL VALIDÉ</div><div className="font-black text-xl md:text-2xl mt-1">{(totalRevenue / 1000000).toFixed(1)}M DA</div><div className="text-xs opacity-60 mt-1">+12% ce mois</div></div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4"><div className="text-[11px] font-bold tracking-widest text-amber-700">EN ATTENTE</div><div className="font-black text-xl md:text-2xl text-amber-800 mt-1">{count("PENDING")}</div><div className="text-xs text-amber-700/60">À valider • {pendingRevenue.toLocaleString()} DA en jeu</div></div>
            <div className="bg-white border border-black/10 rounded-2xl p-4"><div className="text-[11px] font-bold tracking-widest text-black/40">COMMANDES</div><div className="font-black text-xl md:text-2xl mt-1">{orders.length}</div><div className="text-xs text-black/40">{count("VALIDATED")} validées • {count("REJECTED")} rejetées</div></div>
            <div className="bg-white border border-black/10 rounded-2xl p-4"><div className="text-[11px] font-bold tracking-widest text-black/40">CLIENTS UNIQUES</div><div className="font-black text-xl md:text-2xl mt-1">{new Set(orders.map(o => o.phone)).size}</div><div className="text-xs text-black/40">48 wilayas • {orders.filter(o=>o.wantsHome).length} livraisons</div></div>
          </div>

          <div className="grid md:grid-cols-2 gap-3 mt-4">
            <div className="bg-white border border-black/10 rounded-2xl p-4">
              <div className="font-black text-sm flex items-center gap-2"><TrendingUp size={14} className="text-[#E63946]" /> Revenu par statut</div>
              <div className="mt-4 space-y-2">
                {[
                  { label: "Validé", val: totalRevenue, max: totalRevenue + pendingRevenue || 1, color: "bg-green-500" },
                  { label: "En attente", val: pendingRevenue, max: totalRevenue + pendingRevenue || 1, color: "bg-amber-400" },
                  { label: "Rejeté", val: orders.filter(o=>o.status==="REJECTED").length * 15000, max: totalRevenue + pendingRevenue || 1, color: "bg-red-400" },
                ].map(r => (
                  <div key={r.label} className="flex items-center gap-3"><span className="text-xs font-bold w-20">{r.label}</span><div className="flex-1 h-2 bg-black/5 rounded-full overflow-hidden"><div className={`h-full ${r.color}`} style={{ width: `${(r.val / r.max) * 100}%` }} /></div><span className="text-xs font-mono w-24 text-right">{r.val.toLocaleString()} DA</span></div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-black/10 rounded-2xl p-4">
              <div className="font-black text-sm flex items-center gap-2"><MapPin size={14} className="text-[#E63946]" /> Répartition wilayas</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {Array.from(new Set(orders.map(o=>o.wilaya))).map(w => {
                  const c = orders.filter(o=>o.wilaya===w).length;
                  return <span key={w} className="bg-[#FFF8F0] border px-3 py-1.5 rounded-full text-xs font-bold">{w} • {c}</span>;
                })}
                {!orders.length && <span className="text-xs text-black/30">Aucune donnée</span>}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="bg-[#0A1931] text-white rounded-xl p-3"><div className="font-black">{orders.filter(o=>!o.isLarge).length}</div><div className="text-[10px] opacity-60">Petits colis</div></div>
                <div className="bg-[#E63946] text-white rounded-xl p-3"><div className="font-black">{orders.filter(o=>o.isLarge).length}</div><div className="text-[10px] opacity-80">Grosses machines</div></div>
                <div className="bg-white border rounded-xl p-3"><div className="font-black">{orders.filter(o=>o.status==="AT_DZ_DEPOT").length}</div><div className="text-[10px] text-black/50">Au dépôt</div></div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-white border border-black/10 rounded-2xl p-4">
            <div className="font-black text-sm">Dernières activités</div>
            <div className="mt-3 space-y-2">
              {orders.slice(0,4).map(o=>(
                <div key={o.code8} className="flex items-center gap-3 text-sm border-b border-black/5 last:border-0 pb-2 last:pb-0">
                  <span className={`w-2 h-2 rounded-full ${o.status==="VALIDATED"?"bg-green-500": o.status==="REJECTED"?"bg-red-500":"bg-amber-400"}`} />
                  <span className="font-mono font-bold text-xs">{o.code8}</span>
                  <span className="text-black/60 truncate flex-1">{o.prenom} {o.nom} — {o.name}</span>
                  <span className="text-xs text-black/30 hidden md:block">{new Date(o.createdAt).toLocaleDateString()}</span>
                  <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${o.status==="VALIDATED"?"bg-green-100 text-green-700": o.status==="REJECTED"?"bg-red-100 text-red-700":"bg-amber-100 text-amber-700"}`}>{o.status}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* ORDERS */}
      {tab === "orders" && (
        <>
          <div className="mt-4 flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative flex gap-2">
              <div className="flex-1 relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" /><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Rechercher code8, n° tel, id, nom, commande..." className="w-full border border-black/10 rounded-full pl-9 pr-9 py-2.5 text-sm focus:border-[#E63946] outline-none" /><button onClick={()=>setSearch("")} className={`absolute right-2 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black/5 grid place-items-center ${!search?"hidden":""}`}><X size={12}/></button></div>
              <button onClick={openScanner} className="shrink-0 inline-flex items-center gap-1.5 bg-[#0A1931] text-white px-3 md:px-4 py-2.5 rounded-full text-xs md:text-sm font-black active:scale-95"><Camera size={16}/> <span className="hidden sm:inline">Scanner QR</span><ScanLine size={14} className="sm:hidden"/></button>
            </div>
            <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
              {["ALL","PENDING","VALIDATED","IN_CHINA","IN_AIR","AT_DZ_DEPOT","REJECTED"].map(s=>(
                <button key={s} onClick={()=>setFilter(s)} className={`px-3 py-2 rounded-full text-xs font-black whitespace-nowrap border ${filter===s?"bg-[#0A1931] text-white border-transparent":"bg-white text-black/60 border-black/10"}`}>{s} ({s==="ALL"?orders.length: count(s)})</button>
              ))}
            </div>
          </div>

          <div className="mt-4 grid gap-3">
            {filtered.map(o=>(
              <div key={o.code8} className="bg-white border border-black/10 rounded-2xl p-3 md:p-4 flex flex-col lg:flex-row gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="font-mono font-black bg-black text-white px-2 py-1 rounded text-xs">{o.code8}</span>
                    <span className={`text-[11px] font-black px-2 py-1 rounded-full border ${o.status==="VALIDATED"?"bg-green-50 border-green-200 text-green-700": o.status==="REJECTED"?"bg-red-50 border-red-200 text-red-700": o.status==="AT_DZ_DEPOT"?"bg-blue-50 border-blue-200 text-blue-700":"bg-amber-50 border-amber-200 text-amber-700"}`}>{o.status}</span>
                    <span className={`text-[11px] font-bold px-2 py-1 rounded-full ${o.isLarge?"bg-[#E63946] text-white":"bg-black/5"}`}>{o.isLarge?"GROSSE MACHINE":"PETIT COLIS"}</span>
                    {o.wantsHome && <span className="text-[11px] bg-[#0A1931] text-white px-2 py-1 rounded-full flex items-center gap-1"><Truck size={10}/> Domicile</span>}
                    <button onClick={()=>setSelected(o)} className="ml-auto text-xs font-bold text-[#E63946] flex items-center gap-1">Détails <Eye size={12}/></button>
                  </div>
                  <div className="font-bold text-sm mt-2">{o.prenom} {o.nom} • {o.phone} • {o.wilaya}</div>
                  <div className="text-xs text-black/40 truncate">{o.address} {o.extra? `• ${o.extra}`:""} {o.wantsHome? `• Livr: ${o.deliveryAddress}`:" • Retrait dépôt"}</div>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs">
                    <span className="bg-[#FFF8F0] border px-2 py-1 rounded-full font-bold">{o.name}</span>
                    <span className="font-mono">{o.qty} × {(o.negotiationPrice||o.unitPrice).toLocaleString()} DA</span>
                    {o.length && <span className="text-black/40">{o.length}x{o.width}x{o.height}cm • {o.weight}kg</span>}
                    {o.grossisteCount && <span className="bg-black text-white px-2 py-0.5 rounded-full text-[10px]">{o.grossisteCount} grossistes</span>}
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-[11px] text-black/30"><Calendar size={12}/>{new Date(o.createdAt).toLocaleString()} • Total {(o.qty*(o.negotiationPrice||o.unitPrice)).toLocaleString()} DA</div>
                </div>

                <div className="w-full lg:w-[320px] flex flex-col gap-2 shrink-0">
                  <div className="flex items-center gap-2 bg-[#FFF8F0] border rounded-full px-3 py-2">
                    <SlidersHorizontal size={14} className="shrink-0" />
                    <input type="range" min={Math.floor(o.unitPrice*0.7)||0} max={Math.ceil(o.unitPrice*1.6)||100000} defaultValue={o.negotiationPrice||o.unitPrice} onChange={e=> setNegotiate({ id: o.code8, price: Number(e.target.value) })} className="flex-1 accent-[#E63946]" />
                    <span className={`font-mono text-xs font-black w-20 text-right ${negotiate?.id===o.code8 && (negotiate as any).price!==o.unitPrice?"text-[#E63946]":""}`}>{negotiate?.id===o.code8? (negotiate as any).price.toLocaleString() : (o.negotiationPrice||o.unitPrice).toLocaleString()} DA</span>
                  </div>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button onClick={()=>validate(o.code8)} className="bg-green-600 text-white py-2.5 rounded-full font-black text-xs flex items-center justify-center gap-1 active:scale-95"><Check size={12}/> Valider</button>
                    <button onClick={()=>reject(o.code8)} className="bg-white border border-red-200 text-red-600 py-2.5 rounded-full font-bold text-xs flex items-center justify-center gap-1"><X size={12}/> Rejeter</button>
                    <a href={`https://wa.me/${String(o.phone).replace(/\s/g,"")}`} target="_blank" className="bg-[#0A1931] text-white py-2.5 rounded-full font-bold text-xs grid place-items-center">WhatsApp</a>
                  </div>
                  <div className="flex gap-1">
                    <button onClick={()=>setSelected(o)} className="flex-1 bg-white border py-2 rounded-full text-xs font-bold">QR + Détails</button>
                    <span className={`flex-1 text-center py-2 rounded-full text-[10px] font-black ${o.status==="VALIDATED"?"bg-green-500 text-white":o.status==="REJECTED"?"bg-red-500 text-white":"bg-amber-400 text-black"}`}>{o.status==="VALIDATED"?"vert validé":o.status==="REJECTED"?"rouge erreur":"jaune attente"}</span>
                  </div>
                </div>
              </div>
            ))}
            {!filtered.length && <div className="text-center py-12 bg-white border border-dashed rounded-2xl text-black/40">Aucune commande pour ce filtre. <a href="/client/commande" className="text-[#E63946] font-bold">Créer une commande</a></div>}
          </div>
        </>
      )}

      {/* CLIENTS */}
      {tab === "clients" && (
        <div className="mt-4 bg-white border border-black/10 rounded-2xl overflow-hidden">
          <div className="p-4 border-b flex items-center justify-between"><h3 className="font-black flex items-center gap-2"><Users size={16}/> Registre clients ({new Set(orders.map(o=>o.phone)).size})</h3><span className="text-xs text-black/40">Groupé par téléphone</span></div>
          <div className="divide-y">
            {Array.from(new Map(orders.map(o=>[o.phone, o])).values()).map(c=> {
              const cnt = orders.filter(o=>o.phone===c.phone).length;
              const spent = orders.filter(o=>o.phone===c.phone).reduce((a,o)=>a+ o.qty*(o.negotiationPrice||o.unitPrice),0);
              return (
                <div key={c.phone} className="p-4 flex flex-col md:flex-row md:items-center gap-3 hover:bg-[#FFF8F0]/50">
                  <div className="w-10 h-10 rounded-full bg-[#0A1931] text-white grid place-items-center font-black shrink-0">{c.prenom[0]}{c.nom[0]}</div>
                  <div className="flex-1 min-w-0"><div className="font-bold text-sm">{c.prenom} {c.nom} • {c.phone}</div><div className="text-xs text-black/50 truncate">{c.wilaya} • {c.address} • {c.extra}</div></div>
                  <div className="flex gap-2 text-center">
                    <div className="bg-black text-white rounded-xl px-3 py-2"><div className="font-black text-sm">{cnt}</div><div className="text-[10px] opacity-60">Commandes</div></div>
                    <div className="bg-[#E63946] text-white rounded-xl px-3 py-2"><div className="font-black text-sm">{(spent/1000).toFixed(0)}k</div><div className="text-[10px] opacity-80">DA dépensés</div></div>
                    <a href={`https://wa.me/${c.phone}`} target="_blank" className="bg-white border px-3 py-2 rounded-xl grid place-items-center text-xs font-bold">WhatsApp</a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ADMINS */}
      {tab === "admins" && (
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          <div className="bg-white border border-black/10 rounded-2xl p-5">
            <h3 className="font-black flex items-center gap-2"><Shield size={16}/> Admins DZ</h3>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-3 p-3 bg-[#0A1931] text-white rounded-xl"><div className="w-9 h-9 rounded-full bg-white text-black grid place-items-center font-black">31</div><div><div className="font-bold text-sm leading-none">Super Admin DZ (vous)</div><div className="text-xs opacity-60">id 31 • ldldld • tous droits</div></div><span className="ml-auto text-[10px] bg-green-500 px-2 py-1 rounded-full font-black">ACTIF</span></div>
              <div className="flex items-center gap-3 p-3 bg-white border rounded-xl"><div className="w-9 h-9 rounded-full bg-black/5 grid place-items-center font-bold">DZ</div><div><div className="font-bold text-sm">Admin DZ 2</div><div className="text-xs text-black/50">dz2@hk.dz • validation</div></div><button className="ml-auto text-xs border px-3 py-1 rounded-full">Gérer</button></div>
            </div>
            <button className="mt-4 w-full bg-[#E63946] text-white py-2.5 rounded-full font-black text-sm flex items-center justify-center gap-2"><Plus size={14}/> Ajouter Admin DZ</button>
          </div>
          <div className="bg-white border border-black/10 rounded-2xl p-5">
            <h3 className="font-black flex items-center gap-2"><Plane size={16}/> Admins Chine</h3>
            <div className="mt-3 space-y-2">
              <div className="flex items-center gap-3 p-3 bg-white border rounded-xl"><div className="w-9 h-9 rounded-full bg-[#E63946] text-white grid place-items-center font-black">CN</div><div><div className="font-bold text-sm">Admin CN Guangzhou</div><div className="text-xs text-black/50">cn_gz@hk.dz • étapes avion</div></div><span className="ml-auto text-[10px] bg-green-500 text-white px-2 py-1 rounded-full font-black">ACTIF</span></div>
              <div className="flex items-center gap-3 p-3 bg-white border rounded-xl opacity-60"><div className="w-9 h-9 rounded-full bg-black/5 grid place-items-center font-bold">CN</div><div><div className="font-bold text-sm">Admin CN Yiwu</div><div className="text-xs text-black/50">cn_yw@hk.dz</div></div><span className="ml-auto text-[10px] border px-2 py-1 rounded-full">Inactif</span></div>
            </div>
            <button className="mt-4 w-full bg-[#0A1931] text-white py-2.5 rounded-full font-black text-sm flex items-center justify-center gap-2"><Plus size={14}/> Ajouter Admin CN</button>
            <div className="mt-3 text-xs text-black/30">CN ne voit que les commandes Validées, 3 boutons: En Chine → En Vol → Reçu DZ 100% vérifié.</div>
          </div>
        </div>
      )}

      {/* REPORTS */}
      {tab === "reports" && (
        <div className="mt-4 grid gap-3">
          <div className="bg-white border border-black/10 rounded-2xl p-5">
            <h3 className="font-black flex items-center gap-2"><FileText size={16}/> Rapports mensuels</h3>
            <div className="mt-3 grid md:grid-cols-3 gap-3">
              <div className="bg-[#FFF8F0] border rounded-2xl p-4 text-center"><div className="text-xs font-bold tracking-widest text-black/40">SEPT 2026</div><div className="font-black text-xl mt-1">{orders.length} commandes</div><div className="text-xs text-black/50">{totalRevenue.toLocaleString()} DA revenu</div><button onClick={()=>window.location.href="/api/admin/reports?format=excel&month=2026-09"} className="mt-3 w-full bg-[#0A1931] text-white py-2 rounded-full text-xs font-black flex items-center justify-center gap-1"><Download size={12}/> Excel Sept</button></div>
              <div className="bg-white border rounded-2xl p-4 text-center opacity-60"><div className="text-xs font-bold tracking-widest text-black/40">AOÛT 2026</div><div className="font-black text-xl mt-1">—</div><button className="mt-3 w-full border py-2 rounded-full text-xs font-bold">Excel Août</button></div>
              <div className="bg-white border rounded-2xl p-4 text-center opacity-60"><div className="text-xs font-bold tracking-widest text-black/40">JUIL 2026</div><div className="font-black text-xl mt-1">—</div><button className="mt-3 w-full border py-2 rounded-full text-xs font-bold">Excel Juil</button></div>
            </div>
            <div className="mt-4 overflow-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b font-black text-black/40"><th className="text-left p-2">Code8</th><th className="text-left p-2">Client</th><th className="text-left p-2">Wilaya</th><th className="text-right p-2">Total</th><th className="text-left p-2">Statut</th></tr></thead>
                <tbody>{orders.slice(0,6).map(o=>(
                  <tr key={o.code8} className="border-b last:border-0"><td className="p-2 font-mono font-bold">{o.code8}</td><td className="p-2">{o.prenom} {o.nom}</td><td className="p-2">{o.wilaya}</td><td className="p-2 text-right font-mono">{(o.qty*(o.negotiationPrice||o.unitPrice)).toLocaleString()} DA</td><td className="p-2"><span className={`text-[10px] font-black px-2 py-1 rounded-full ${o.status==="VALIDATED"?"bg-green-100 text-green-700":"bg-amber-100 text-amber-700"}`}>{o.status}</span></td></tr>
                ))}</tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* FORBIDDEN */}
      {tab === "forbidden" && (
        <div className="mt-4 bg-white border border-black/10 rounded-2xl p-5">
          <div className="flex items-center justify-between"><h3 className="font-black flex items-center gap-2"><AlertTriangle size={16} className="text-amber-500"/> Liste interdite (éditable DZ)</h3><button onClick={()=>setShowForbiddenForm(v=>!v)} className="bg-[#E63946] text-white px-4 py-2 rounded-full text-xs font-black flex items-center gap-1"><Plus size={12}/> Ajouter</button></div>
          {showForbiddenForm && (
            <div className="mt-4 grid md:grid-cols-[1fr_1fr_auto] gap-2 p-3 bg-[#FFF8F0] border rounded-2xl">
              <input placeholder="Nom (ex: Aile voiture non démontable)" value={newForbidden.name} onChange={e=>setNewForbidden({...newForbidden,name:e.target.value})} className="border rounded-full px-3 py-2 text-sm" />
              <input placeholder="Raison" value={newForbidden.reason} onChange={e=>setNewForbidden({...newForbidden,reason:e.target.value})} className="border rounded-full px-3 py-2 text-sm" />
              <button onClick={async()=>{ if(!newForbidden.name||!newForbidden.reason) return; await fetch("/api/admin/forbidden",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(newForbidden)}); const d=await fetch("/api/admin/forbidden").then(r=>r.json()); setForbidden(d.rules); setNewForbidden({name:"",reason:""}); setShowForbiddenForm(false);}} className="bg-[#0A1931] text-white px-4 py-2 rounded-full text-sm font-black">Sauver</button>
            </div>
          )}
          <div className="mt-4 grid gap-2">
            {forbidden.map((f:any)=>(
              <div key={f.id} className="flex items-center gap-3 p-3 border rounded-xl">
                <AlertTriangle size={16} className="text-amber-500 shrink-0" />
                <div className="flex-1 min-w-0"><div className="font-bold text-sm">{f.name}</div><div className="text-xs text-black/50 truncate">{f.reason}</div></div>
                <button onClick={async()=>{ await fetch(`/api/admin/forbidden?id=${f.id}`,{method:"DELETE"}); setForbidden(prev=>prev.filter(x=>x.id!==f.id));}} className="w-8 h-8 grid place-items-center rounded-full hover:bg-red-50 text-red-500"><Trash2 size={14}/></button>
              </div>
            ))}
            {!forbidden.length && <div className="text-sm text-black/30 text-center py-6">Aucune règle</div>}
          </div>
          <div className="mt-3 text-xs text-black/30">Affiché en warning doux sur /client/commande — le client peut quand même envoyer, vous validez.</div>
        </div>
      )}

      {/* Scanner Modal */}
      {showScanner && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4" onClick={closeScanner}>
          <div onClick={e=>e.stopPropagation()} className="bg-white rounded-[24px] w-full max-w-[420px] p-4">
            <div className="flex items-center justify-between"><h3 className="font-black flex items-center gap-2"><Camera size={16}/> Scanner QR Client</h3><button onClick={closeScanner} className="w-8 h-8 rounded-full bg-black text-white grid place-items-center"><X size={14}/></button></div>
            <div className="mt-3">
              <div id="hk-qr-reader" className="w-full rounded-2xl overflow-hidden bg-black aspect-square" />
              <div className="mt-3 text-xs text-black/50 text-center">Placez le QR du client (code8) devant la caméra. Fonctionne aussi avec n° tél, id, nom via recherche.</div>
              {scanError && <div className="mt-2 bg-amber-50 border border-amber-200 text-amber-800 text-xs p-2 rounded-xl">{scanError}</div>}
              <div className="mt-3 flex gap-2"><input placeholder="Ou saisir code8 / tel / nom..." value={search} onChange={e=>setSearch(e.target.value)} className="flex-1 border rounded-full px-4 py-2 text-sm" /><button onClick={()=>{ const f=orders.find(o=> `${o.code8} ${o.phone} ${o.nom} ${o.prenom} ${o.id}`.toLowerCase().includes(search.toLowerCase())); if(f){closeScanner(); setSelected(f); setTab("orders");} else setScanError("Aucun résultat pour: "+search);}} className="bg-[#E63946] text-white px-4 py-2 rounded-full text-sm font-black">Chercher</button></div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {selected && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm grid place-items-center p-4" onClick={()=>setSelected(null)}>
          <div onClick={e=>e.stopPropagation()} className="bg-white rounded-[24px] max-w-[560px] w-full p-6 max-h-[90vh] overflow-auto">
            <div className="flex items-start justify-between gap-3"><h3 className="font-black text-lg">Détails {selected.code8}</h3><button onClick={()=>setSelected(null)} className="w-8 h-8 rounded-full bg-black text-white grid place-items-center"><X size={14}/></button></div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#FFF8F0] border rounded-2xl p-3"><div className="text-[10px] font-bold tracking-widest text-black/40">CLIENT</div><div className="font-bold">{selected.prenom} {selected.nom}</div><div className="text-xs text-black/50">{selected.phone} • {selected.wilaya}</div><div className="text-xs text-black/50">{selected.address}</div></div>
                <div className="bg-[#0A1931] text-white rounded-2xl p-3"><div className="text-[10px] font-bold tracking-widest opacity-60">PRODUIT</div><div className="font-bold">{selected.name}</div><div className="text-xs opacity-70">{selected.qty} × {selected.unitPrice} DA • {selected.length}x{selected.width}x{selected.height}cm</div><div className="text-xs opacity-70">Qté {selected.qty} • Poids {selected.weight}kg {selected.isLarge? `• ${selected.grossisteCount} grossistes`:""}</div></div>
              </div>
              <div className="flex gap-2">
                <a href={`https://hkshipping.vercel.app/track/${selected.code8}`} target="_blank" className="flex-1 bg-[#E63946] text-white py-3 rounded-full font-black text-sm text-center">Voir QR + Suivi →</a>
                <a href={`https://wa.me/${String(selected.phone).replace(/\s/g,"")}`} target="_blank" className="flex-1 bg-[#0A1931] text-white py-3 rounded-full font-bold text-sm text-center">WhatsApp</a>
              </div>
              <div className="text-xs text-black/30">Même stepper vert/jaune/rouge que le client voit. Domicile: {selected.wantsHome? selected.deliveryAddress : "Retrait dépôt"}.</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
