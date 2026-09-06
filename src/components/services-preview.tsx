"use client";
import { motion } from "framer-motion";
import { Ship, Plane, Home, FileCheck, ShoppingCart, Warehouse, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";

const icons = [Ship, Plane, Home, FileCheck, ShoppingCart, Warehouse];

export default function ServicesPreview() {
  const { t } = useI18n();
  return (
    <section className="mx-auto max-w-[1280px] px-4 md:px-6 py-10 md:py-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-6 md:mb-10">
        <div>
          <div className="text-[#E63946] font-black tracking-[0.2em] text-[11px] md:text-xs mb-2 md:mb-3">{t.services.subtitle}</div>
          <h2 className="font-black text-[28px] md:text-5xl tracking-tighter leading-[0.9] max-w-xl">
            Tout ce dont vous avez besoin <span className="text-[#E63946]">pour importer</span> sans stress.
          </h2>
        </div>
        <p className="text-black/60 max-w-sm text-[13px] md:text-sm leading-relaxed">{t.services.title}</p>
      </div>

      {/* Mobile: horizontal snap peek | Desktop: grid */}
      <div className="md:hidden flex gap-3 overflow-x-auto scrollbar-hide snap-x -mx-4 px-4 pb-2">
        {t.services.items.map((item, i) => {
          const Icon = icons[i];
          const isFeatured = i === 0;
          return (
            <div key={item.title} className={`snap-center shrink-0 w-[84vw] max-w-[320px] relative rounded-[22px] p-5 flex flex-col min-h-[260px] overflow-hidden border ${isFeatured ? "bg-[#0A1931] text-white border-transparent" : "bg-white border-black/10"}`}>
              {isFeatured && <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=600&q=80" alt="" className="absolute inset-0 object-cover opacity-20" />}
              <div className="relative">
                <div className={`w-11 h-11 rounded-full grid place-items-center ${isFeatured ? "bg-[#E63946] text-white" : "bg-[#FFF8F0] border border-black/10"}`}><Icon size={18} /></div>
                <div className={`mt-3 inline-flex text-[11px] font-black px-3 py-1 rounded-full ${isFeatured ? "bg-white text-[#0A1931]" : "bg-[#0A1931] text-white"}`}>{item.price}</div>
                <h3 className={`mt-3 font-black text-[18px] tracking-tight ${isFeatured ? "text-white" : "text-[#0A1931]"}`}>{item.title}</h3>
                <p className={`mt-1.5 text-[13px] leading-relaxed ${isFeatured ? "text-white/70" : "text-black/60"}`}>{item.desc}</p>
                <Link href="/services" className={`mt-4 inline-flex items-center gap-2 text-sm font-black ${isFeatured ? "text-white" : "text-[#0A1931]"}`}>Découvrir <span className={`w-7 h-7 rounded-full grid place-items-center ${isFeatured ? "bg-white text-[#0A1931]" : "bg-[#0A1931] text-white"}`}><ArrowUpRight size={14} /></span></Link>
              </div>
            </div>
          );
        })}
      </div>

      <div className="hidden md:grid md:grid-cols-3 gap-4">
        {t.services.items.map((item, i) => {
          const Icon = icons[i];
          const isFeatured = i === 0;
          return (
            <motion.div key={item.title} initial={{ y: 16, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: i * 0.06, duration: 0.5 }} whileHover={{ y: -4 }} className={`group relative rounded-[24px] p-6 flex flex-col min-h-[280px] overflow-hidden border ${isFeatured ? "bg-[#0A1931] text-white border-transparent md:col-span-2" : "bg-white border-black/10 hover:shadow-xl"}`}>
              {isFeatured && <img src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=800&q=80" alt="" className="absolute inset-0 object-cover opacity-20" />}
              <div className="relative">
                <div className={`w-12 h-12 rounded-full grid place-items-center ${isFeatured ? "bg-[#E63946] text-white" : "bg-[#FFF8F0] border border-black/10"}`}><Icon size={20} /></div>
                <div className={`mt-4 inline-flex text-xs font-black px-3 py-1 rounded-full ${isFeatured ? "bg-white text-[#0A1931]" : "bg-[#0A1931] text-white"}`}>{item.price}</div>
                <h3 className={`mt-4 font-black text-xl tracking-tight ${isFeatured ? "text-white" : "text-[#0A1931]"}`}>{item.title}</h3>
                <p className={`mt-2 text-sm leading-relaxed ${isFeatured ? "text-white/70" : "text-black/60"}`}>{item.desc}</p>
                <Link href="/services" className={`mt-6 inline-flex items-center gap-2 text-sm font-bold ${isFeatured ? "text-white" : "text-[#0A1931]"}`}>Découvrir <span className={`w-7 h-7 rounded-full grid place-items-center transition group-hover:translate-x-1 ${isFeatured ? "bg-white text-[#0A1931]" : "bg-[#0A1931] text-white"}`}><ArrowUpRight size={14} /></span></Link>
              </div>
            </motion.div>
          );
        })}
      </div>
      <div className="md:hidden mt-3 flex justify-center gap-1.5"><span className="w-6 h-1.5 bg-[#0A1931] rounded-full" /><span className="w-1.5 h-1.5 bg-black/20 rounded-full" /><span className="w-1.5 h-1.5 bg-black/20 rounded-full" /></div>
    </section>
  );
}
