"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkForbidden } from "@/lib/forbidden";
import { ArrowRight, Package, AlertTriangle, Upload, Ruler } from "lucide-react";

export default function CommandePage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [large, setLarge] = useState(false);
  const [form1, setForm1] = useState({ nom: "", prenom: "", phone: "", wilaya: "Alger", address: "", extra: "", wantsHome: false, deliveryAddress: "" });
  const [form2, setForm2] = useState({ name: "", qty: 1, unitPrice: 0, length: "", width: "", height: "", weight: "", dismantlable: false, grossisteCount: "", image: null as File | null, preview: "" });
  const [forbiddenWarn, setForbiddenWarn] = useState<string | null>(null);

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setForm2({ ...form2, image: f, preview: URL.createObjectURL(f) });
  };

  const validateStep1 = () => {
    if (!form1.nom || !form1.prenom || !form1.phone || !form1.address) { alert("Remplissez nom, prénom, téléphone, adresse"); return; }
    if (form1.wantsHome && !form1.deliveryAddress) { alert("Adresse livraison requise"); return; }
    setStep(2);
  };

  const submit = async () => {
    const check = checkForbidden(form2.name);
    if (check.forbidden) {
      const ok = confirm(`⚠️ ${check.rule?.name}: ${check.rule?.reason}. Voulez-vous quand même envoyer ? L'admin examinera.`);
      if (!ok) return;
    }
    // For millions scale: use phone as id, create order pending
    // For now mock via localStorage + API
    const payload = { ...form1, ...form2, isLarge: large, code8: Math.random().toString(36).substring(2, 10).toUpperCase(), status: "PENDING" };
    try {
      await fetch("/api/orders", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    } catch {}
    localStorage.setItem("hk_last_order", JSON.stringify(payload));
    alert(`Demande envoyée ! Code suivi provisoire: ${payload.code8} — En attente validation Admin DZ.`);
    router.push(`/track/${payload.code8}`);
  };

  return (
    <div className="mx-auto max-w-[640px] px-4 md:px-6 py-6 md:py-10">
      <div className="flex items-center gap-2 mb-6">
        <div className={`w-8 h-8 rounded-full grid place-items-center font-black text-sm ${step === 1 ? "bg-[#0A1931] text-white" : "bg-[#E63946] text-white"}`}>1</div>
        <div className="h-1 flex-1 bg-black/10 rounded-full overflow-hidden"><div className={`h-full bg-[#E63946] transition-all ${step === 1 ? "w-1/2" : "w-full"}`} /></div>
        <div className={`w-8 h-8 rounded-full grid place-items-center font-black text-sm ${step === 2 ? "bg-[#0A1931] text-white" : "bg-black/10 text-black/40"}`}>2</div>
      </div>

      {step === 1 && (
        <div className="bg-white border border-black/10 rounded-[24px] p-5 md:p-7">
          <h1 className="font-black text-xl md:text-2xl tracking-tighter">Étape 1 — Vos infos</h1>
          <p className="text-sm text-black/50 mt-1">Pour création de votre dossier client. Téléphone = identifiant.</p>

          <div className="grid md:grid-cols-2 gap-3 mt-6">
            <input placeholder="Nom" value={form1.nom} onChange={e => setForm1({ ...form1, nom: e.target.value })} className="border border-black/10 rounded-full px-4 py-3.5 text-sm focus:border-[#E63946] outline-none" />
            <input placeholder="Prénom" value={form1.prenom} onChange={e => setForm1({ ...form1, prenom: e.target.value })} className="border border-black/10 rounded-full px-4 py-3.5 text-sm focus:border-[#E63946] outline-none" />
            <input placeholder="Téléphone / WhatsApp" value={form1.phone} onChange={e => setForm1({ ...form1, phone: e.target.value })} className="border border-black/10 rounded-full px-4 py-3.5 text-sm focus:border-[#E63946] outline-none" />
            <select value={form1.wilaya} onChange={e => setForm1({ ...form1, wilaya: e.target.value })} className="border border-black/10 rounded-full px-4 py-3.5 text-sm">
              <option>Alger</option><option>Oran</option><option>Sétif</option><option>Constantine</option><option>Annaba</option><option>Autre</option>
            </select>
            <input placeholder="Adresse (rue, cité)" value={form1.address} onChange={e => setForm1({ ...form1, address: e.target.value })} className="md:col-span-2 border border-black/10 rounded-full px-4 py-3.5 text-sm focus:border-[#E63946] outline-none" />
            <input placeholder="Infos extra (numéro, étage...)" value={form1.extra} onChange={e => setForm1({ ...form1, extra: e.target.value })} className="md:col-span-2 border border-black/10 rounded-full px-4 py-3.5 text-sm" />
          </div>

          <label className="mt-5 flex items-center gap-3 p-4 rounded-2xl border-2 cursor-pointer has-[:checked]:border-[#E63946] has-[:checked]:bg-[#FFF8F0]">
            <input type="checkbox" checked={form1.wantsHome} onChange={e => setForm1({ ...form1, wantsHome: e.target.checked })} className="w-5 h-5 accent-[#E63946]" />
            <div><div className="font-bold text-sm">Livraison à domicile ?</div><div className="text-xs text-black/50">Cochée = livraison, sinon retrait dépôt DZ</div></div>
          </label>
          {form1.wantsHome && (
            <input placeholder="Adresse livraison complète" value={form1.deliveryAddress} onChange={e => setForm1({ ...form1, deliveryAddress: e.target.value })} className="mt-3 w-full border border-black/10 rounded-full px-4 py-3.5 text-sm focus:border-[#E63946] outline-none" />
          )}

          <button onClick={validateStep1} className="mt-6 w-full bg-[#0A1931] text-white py-4 rounded-full font-black flex items-center justify-center gap-2 active:scale-[0.98]">Suivant → <ArrowRight size={16} /></button>
          <div className="text-xs text-center text-black/30 mt-2">Téléphone = votre code client. Pas de mot de passe requis pour l’instant.</div>
        </div>
      )}

      {step === 2 && (
        <div className="bg-white border border-black/10 rounded-[24px] p-5 md:p-7">
          <div className="flex items-center gap-2">
            <h2 className="font-black text-xl tracking-tighter">Étape 2 — Produit</h2>
            <div className="ml-auto flex gap-2 p-1 bg-black/5 rounded-full">
              <button onClick={() => setLarge(false)} className={`px-4 py-1.5 rounded-full text-xs font-black ${!large ? "bg-[#0A1931] text-white" : "text-black/50"}`}>Petit colis</button>
              <button onClick={() => setLarge(true)} className={`px-4 py-1.5 rounded-full text-xs font-black ${large ? "bg-[#E63946] text-white" : "text-black/50"}`}>Grosse machine</button>
            </div>
          </div>

          <div className="mt-5 grid gap-3">
            <input placeholder="Nom du produit (ex: shoes, machine démontable...)" value={form2.name} onChange={e => { setForm2({ ...form2, name: e.target.value }); const c = checkForbidden(e.target.value); setForbiddenWarn(c.forbidden ? c.rule!.name : null); }} className="border border-black/10 rounded-full px-4 py-3.5 text-sm focus:border-[#E63946] outline-none" />
            {forbiddenWarn && <div className="bg-amber-50 border border-amber-200 text-amber-800 text-xs p-3 rounded-xl flex gap-2"><AlertTriangle size={14} /> {forbiddenWarn} — démontable par pièce requis, sinon refusé. Vous pouvez envoyer, admin examinera.</div>}
            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Qté" value={form2.qty} onChange={e => setForm2({ ...form2, qty: Number(e.target.value) })} className="border border-black/10 rounded-full px-4 py-3.5 text-sm" />
              <input type="number" placeholder="Prix/pièce (DA)" value={form2.unitPrice || ""} onChange={e => setForm2({ ...form2, unitPrice: Number(e.target.value) })} className="border border-black/10 rounded-full px-4 py-3.5 text-sm" />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="relative"><Ruler size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-black/30" /><input placeholder="L (cm)" value={form2.length} onChange={e => setForm2({ ...form2, length: e.target.value })} className="w-full border border-black/10 rounded-full pl-8 pr-3 py-3 text-sm" /></div>
              <input placeholder="l (cm)" value={form2.width} onChange={e => setForm2({ ...form2, width: e.target.value })} className="border border-black/10 rounded-full px-4 py-3 text-sm" />
              <input placeholder="H (cm)" value={form2.height} onChange={e => setForm2({ ...form2, height: e.target.value })} className="border border-black/10 rounded-full px-4 py-3 text-sm" />
            </div>
            <input placeholder="Poids estimé (kg)" value={form2.weight} onChange={e => setForm2({ ...form2, weight: e.target.value })} className="border border-black/10 rounded-full px-4 py-3.5 text-sm" />

            {large && (
              <div className="bg-[#FFF8F0] border border-black/10 rounded-2xl p-4 space-y-3">
                <div className="font-bold text-sm">Grosse machine — infos supplémentaires</div>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={form2.dismantlable} onChange={e => setForm2({ ...form2, dismantlable: e.target.checked })} className="accent-[#E63946]" /> Démontable par pièce ? (obligatoire)</label>
                <input placeholder="Nombre de grossistes DZ" value={form2.grossisteCount} onChange={e => setForm2({ ...form2, grossisteCount: e.target.value })} className="w-full border border-black/10 rounded-full px-4 py-3 text-sm" />
                <a href="https://wa.me/213550000000" target="_blank" className="inline-flex text-xs font-bold text-[#E63946]">Discuter via WhatsApp pour grosse machine →</a>
              </div>
            )}

            <label className="border-2 border-dashed border-black/10 rounded-2xl p-6 grid place-items-center gap-2 cursor-pointer hover:border-[#E63946]/30 bg-[#FFF8F0]">
              <input type="file" accept="image/*" onChange={handleImage} className="hidden" />
              {form2.preview ? <img src={form2.preview} alt="preview" className="w-full h-40 object-cover rounded-xl" /> : <><Upload className="text-black/30" /><span className="text-sm font-bold">Image du produit</span><span className="text-xs text-black/40">Max 5MB, JPG/PNG</span></>}
            </label>
          </div>

          <div className="mt-6 flex gap-3">
            <button onClick={() => setStep(1)} className="flex-1 border border-black/10 py-4 rounded-full font-bold text-sm">Retour</button>
            <button onClick={submit} className="flex-[2] bg-[#E63946] text-white py-4 rounded-full font-black flex items-center justify-center gap-2 active:scale-[0.98]"><Package size={16} /> Envoyer demande</button>
          </div>
          <div className="text-xs text-center text-black/30 mt-2">Après envoi, en attente (jaune) jusqu’à validation DZ.</div>
        </div>
      )}
    </div>
  );
}
