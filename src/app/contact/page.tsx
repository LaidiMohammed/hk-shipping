"use client";
import { useState } from "react";
import BureauxMap from "@/components/bureaux-map";
import { Phone, Mail, MapPin, Send } from "lucide-react";

export default function ContactPage(){
  const [form,setForm]=useState({name:"",phone:"",city:"Alger",type:"Air Express",weight:"",message:""});
  const [sent,setSent]=useState(false);

  const handleSubmit=(e:React.FormEvent)=>{
    e.preventDefault();
    const waText=`Bonjour HK Shipping%0A%0A Nom: ${form.name}%0A Téléphone: ${form.phone}%0A Wilaya: ${form.city}%0A Type: ${form.type}%0A Poids: ${form.weight}kg%0A Message: ${form.message}`;
    window.open(`https://wa.me/213550000000?text=${waText}`,"_blank");
    fetch("/api/quote",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(form)});
    setSent(true);
  };

  return (
    <div className="mx-auto max-w-[1280px] px-6 py-12">
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
        <div>
          <h1 className="font-black text-4xl tracking-tighter">Parlons de votre colis</h1>
          <p className="text-black/60 mt-2">Réponse en 15 min sur WhatsApp • 7j/7</p>
          <form onSubmit={handleSubmit} className="mt-6 bg-white border border-black/10 rounded-[24px] p-6 grid gap-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input placeholder="Nom complet" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border border-black/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-[#E63946]" required />
              <input placeholder="Téléphone / WhatsApp" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="border border-black/10 rounded-full px-4 py-3 text-sm focus:outline-none focus:border-[#E63946]" required />
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <select value={form.city} onChange={e=>setForm({...form,city:e.target.value})} className="border border-black/10 rounded-full px-4 py-3 text-sm">
                <option>Alger</option><option>Oran</option><option>Sétif</option><option>Constantine</option><option>Annaba</option>
              </select>
              <select value={form.type} onChange={e=>setForm({...form,type:e.target.value})} className="border border-black/10 rounded-full px-4 py-3 text-sm">
                <option>Air Express</option><option>Mer Éco</option><option>Door-to-Door</option><option>Sourcing</option>
              </select>
              <input placeholder="Poids kg" type="number" value={form.weight} onChange={e=>setForm({...form,weight:e.target.value})} className="border border-black/10 rounded-full px-4 py-3 text-sm" />
            </div>
            <textarea placeholder="Décrivez votre marchandise..." value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={4} className="border border-black/10 rounded-2xl px-4 py-3 text-sm" />
            <button className="bg-[#E63946] text-white py-4 rounded-full font-black flex items-center justify-center gap-2 hover:bg-[#c9303c] transition"><Send size={16}/> Envoyer via WhatsApp & Email</button>
            {sent && <div className="bg-green-50 text-green-700 p-3 rounded-xl text-sm text-center">✓ Envoyé ! WhatsApp ouvert + email en cours.</div>}
          </form>

          <div className="grid md:grid-cols-3 gap-3 mt-6">
            <div className="bg-[#0A1931] text-white rounded-2xl p-4"><Phone size={16} className="mb-2"/><div className="font-bold text-sm">WhatsApp</div><div className="text-xs text-white/60">+213 550 00 00 00</div></div>
            <div className="bg-white border border-black/10 rounded-2xl p-4"><Mail size={16} className="mb-2"/><div className="font-bold text-sm">Email</div><div className="text-xs text-black/60">contact@hkshipping.dz</div></div>
            <div className="bg-white border border-black/10 rounded-2xl p-4"><MapPin size={16} className="mb-2"/><div className="font-bold text-sm">Bureaux</div><div className="text-xs text-black/60">Alger • Guangzhou</div></div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white border border-black/10 rounded-[20px] p-4">
            <h3 className="font-bold">Nos bureaux sur carte</h3>
            <div className="mt-3 h-[380px] rounded-xl overflow-hidden"><BureauxMap /></div>
          </div>
          <div className="bg-[#0A1931] text-white rounded-[20px] p-6">
            <div className="font-black">Horaires</div>
            <div className="text-sm text-white/60 mt-2 space-y-1">
              <div>Algérie: Lun-Sam 08:00-18:00</div>
              <div>Chine: Lun-Sam 09:00-18:00 CST</div>
              <div className="text-[#E63946] font-bold">Support WhatsApp 24/7</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
