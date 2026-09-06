"use client";
import Link from "next/link";
import { MessageCircle, FileText, Search, Home } from "lucide-react";

export default function MobileBar() {
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 px-3 pb-[max(8px,env(safe-area-inset-bottom))] pt-2">
      <div className="mx-auto max-w-[480px] bg-[#0A1931] rounded-[22px] border border-white/10 shadow-[0_16px_40px_rgba(0,0,0,0.35)] flex items-center justify-between px-2 py-2">
        <Link href="/" className="flex flex-col items-center gap-1 px-3 py-1 text-white/60 hover:text-white">
          <Home size={18} /><span className="text-[10px] font-bold tracking-wide">ACCUEIL</span>
        </Link>
        <Link href="/tracking" className="flex flex-col items-center gap-1 px-3 py-1 text-white/60 hover:text-white">
          <Search size={18} /><span className="text-[10px] font-bold">SUIVI</span>
        </Link>
        <Link href="/quote" className="bg-[#E63946] text-white rounded-full px-5 py-3 flex items-center gap-2 font-black text-sm shadow-lg active:scale-95 transition">
          <FileText size={16} /> Devis
        </Link>
        <a href="https://wa.me/213550000000" target="_blank" className="flex flex-col items-center gap-1 px-3 py-1 text-white bg-white/10 rounded-full">
          <MessageCircle size={18} /><span className="text-[10px] font-bold">WHATSAPP</span>
        </a>
      </div>
    </div>
  );
}
