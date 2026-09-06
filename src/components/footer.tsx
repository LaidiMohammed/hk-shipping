"use client";
import Link from "next/link";
import { Phone, Mail, MapPin, ArrowUpRight, Camera } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export default function Footer() {
  const { t } = useI18n();
  return (
    <footer className="bg-[#0A1931] text-white pt-16 pb-8 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6">
        <div className="grid md:grid-cols-[1.2fr_0.8fr_0.8fr_1fr] gap-10 pb-12 border-b border-white/10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E63946] grid place-items-center font-black">HK</div>
              <div>
                <div className="font-black leading-none">HK SHIPPING</div>
                <div className="text-[11px] tracking-[0.2em] text-[#E63946] font-bold">EXPRESS</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-sm">{t.footer.desc}</p>
            <div className="flex gap-3 mt-6">
              <a href="https://www.instagram.com/hkshippingexpres" target="_blank" className="w-10 h-10 rounded-full bg-white/10 grid place-items-center hover:bg-[#E63946] transition"><Camera size={18} /></a>
              <a href="https://www.tiktok.com/@hk.shipping" target="_blank" className="w-10 h-10 rounded-full bg-white/10 grid place-items-center hover:bg-[#E63946] transition"><span className="font-black text-xs">Tik</span></a>
              <a href="https://wa.me/213550000000" className="w-10 h-10 rounded-full bg-white/10 grid place-items-center hover:bg-[#E63946] transition"><Phone size={18} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm tracking-widest">NAVIGATION</h4>
            <div className="flex flex-col gap-2 text-white/60 text-sm">
              <Link href="/" className="hover:text-white">Accueil</Link>
              <Link href="/about" className="hover:text-white">À Propos</Link>
              <Link href="/services" className="hover:text-white">Services</Link>
              <Link href="/how-it-works" className="hover:text-white">Comment ça marche</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-sm tracking-widest">SERVICES</h4>
            <div className="flex flex-col gap-2 text-white/60 text-sm">
              <span>Fret Maritime</span><span>Fret Aérien</span><span>Express Door-to-Door</span><span>Dédouanement</span>
            </div>
          </div>

          <div className="bg-white text-[#0A1931] rounded-[20px] p-6">
            <div className="text-xs font-bold tracking-widest text-black/40">BESOIN D&apos;AIDE ?</div>
            <div className="font-black text-xl mt-2">Parlons de votre colis</div>
            <p className="text-sm text-black/60 mt-1">Réponse en 15 min sur WhatsApp.</p>
            <a href="https://wa.me/213550000000" className="mt-4 inline-flex items-center gap-2 bg-[#E63946] text-white px-5 py-3 rounded-full font-bold text-sm w-full justify-center">WhatsApp Direct <ArrowUpRight size={16} /></a>
            <div className="mt-3 flex items-center gap-2 text-xs text-black/50"><Mail size={14} /> contact@hkshipping.dz</div>
            <div className="flex items-center gap-2 text-xs text-black/50"><MapPin size={14} /> Alger • Guangzhou • Yiwu</div>
          </div>
        </div>

        <div className="pt-6 flex flex-col md:flex-row justify-between gap-3 text-xs text-white/40">
          <span>{t.footer.rights}</span>
          <span className="flex gap-4"><Link href="#">Confidentialité</Link><Link href="#">Mentions Légales</Link></span>
        </div>

        <div className="mt-8 select-none leading-none font-black text-[14vw] tracking-tighter text-white/[0.04] whitespace-nowrap text-center">HK SHIPPING</div>
      </div>
    </footer>
  );
}
