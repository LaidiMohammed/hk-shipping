"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import QRCode from "qrcode";

const steps = [
  { key: "PENDING", label: "En attente", color: "jaune" },
  { key: "VALIDATED", label: "Validé DZ", color: "vert" },
  { key: "IN_CHINA", label: "En Chine", color: "jaune" },
  { key: "IN_AIR", label: "En Vol ✈️", color: "jaune" },
  { key: "AT_DZ_DEPOT", label: "Reçu DZ 100% vérifié", color: "vert" },
  { key: "DELIVERED", label: "Livré domicile / Retrait", color: "vert" },
];

export default function TrackPage() {
  const { code8 } = useParams<{ code8: string }>();
  const [order, setOrder] = useState<any>(null);
  const [qr, setQr] = useState("");

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("hk_last_order") || "null");
    if (local && local.code8 === code8) setOrder(local);
    fetch("/api/orders").then(r=>r.json()).then(d=>{
      const found = (d.orders||[]).find((o:any)=>o.code8===code8);
      if(found) setOrder(found);
    }).catch(()=>{});
  }, [code8]);

  useEffect(() => {
    if (!order) return;
    const payload = `HK:${order.code8}|${order.prenom} ${order.nom}|${order.name} x${order.qty} ${order.length||""}x${order.width||""}x${order.height||""} ${order.unitPrice}DA → ${order.negotiationPrice||order.unitPrice}DA`;
    QRCode.toDataURL(payload, { width: 180, margin: 1 }).then(setQr).catch(()=>{});
  }, [order]);

  const idx = steps.findIndex(s=> s.key === (order?.status || "PENDING"));

  if (!order) return <div className="mx-auto max-w-[600px] px-4 py-12 text-center"><div className="font-black text-xl">Code {code8} non trouvé</div><div className="text-sm text-black/50 mt-2">Vérifiez le code 8 caractères.</div></div>;

  return (
    <div className="mx-auto max-w-[640px] px-4 md:px-6 py-6">
      <div className="bg-white border border-black/10 rounded-[24px] p-6">
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="font-mono font-black text-lg">{order.code8}</div>
            <div className="text-sm font-bold">{order.prenom} {order.nom} • {order.phone}</div>
            <div className="text-xs text-black/50">{order.wilaya} • {order.address} {order.wantsHome? `• Livraison: ${order.deliveryAddress}` : "• Retrait dépôt"}</div>
            <div className="mt-2 text-sm"><b>{order.name}</b> • {order.qty} × {order.unitPrice} DA {order.negotiationPrice? `→ ${order.negotiationPrice} DA (négocié)`:""} {order.isLarge? "• GROSSE MACHINE":""}</div>
            <div className="text-xs text-black/40">{order.length? `${order.length}x${order.width}x${order.height}cm • ${order.weight}kg` : ""}</div>
          </div>
          {qr && <img src={qr} alt="QR" className="w-[120px] h-[120px] border rounded-xl p-1 bg-white" />}
        </div>

        <div className="mt-6 relative">
          <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-black/10" />
          <div className="space-y-3">
            {steps.map((s,i)=>{
              const done = i <= idx;
              const isError = order.status==="REJECTED" && i===0;
              return (
                <div key={s.key} className="flex gap-3 items-center">
                  <div className={`w-8 h-8 rounded-full grid place-items-center text-xs font-black shrink-0 z-10 border-2 ${isError?"bg-red-500 border-red-500 text-white": done ? "bg-green-500 border-green-500 text-white" : idx+1===i ? "bg-amber-400 border-amber-400 text-black" : "bg-white border-black/10 text-black/30"}`}>{done?"✓":i+1}</div>
                  <div className={`flex-1 rounded-2xl p-3 border text-sm ${done?"bg-green-50 border-green-200 font-bold": idx+1===i?"bg-amber-50 border-amber-200":"bg-[#FFF8F0] border-black/10 opacity-60"}`}>
                    <div className="flex justify-between"><span>{s.label}</span><span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${s.color==="vert"?"bg-green-500 text-white": s.color==="jaune"?"bg-amber-400 text-black":"bg-red-500 text-white"}`}>{s.color}</span></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 text-xs text-center text-black/30">Même fenêtre que les admins • Vert validé / Jaune attente / Rouge erreur</div>
      </div>
    </div>
  );
}
