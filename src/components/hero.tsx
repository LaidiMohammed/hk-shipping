"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, MapPin, ShoppingCart } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const { t } = useI18n();

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0A1931] rounded-b-[28px] md:rounded-b-[48px]">
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80" alt="Container ship" className="w-full h-full object-cover opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1931]/30 via-[#0A1931]/55 to-[#0A1931]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(230,57,70,0.28),transparent_62%)]" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative mx-auto max-w-[1280px] px-4 md:px-6 pt-6 md:pt-16 pb-6 md:pb-14">
        <motion.div initial={{ y: 12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.15, duration: 0.6 }} className="inline-flex items-center gap-2 bg-white text-[#0A1931] px-3 py-1.5 rounded-full text-[11px] md:text-xs font-black tracking-wide">
          <span className="w-2 h-2 bg-[#E63946] rounded-full animate-pulse" />
          {t.hero.badge}
          <span className="hidden sm:inline-flex items-center gap-1 text-black/40">• <Clock size={12} /> 10-15 jours</span>
        </motion.div>

        <motion.div style={{ scale: textScale }} className="mt-5 md:mt-8">
          <h1 className="font-black leading-[0.84] tracking-tighter">
            <span className="block text-white text-[16vw] sm:text-[15vw] md:text-[11vw] lg:text-[140px] leading-none">{t.hero.title1}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/45 text-[13vw] sm:text-[12vw] md:text-[9vw] lg:text-[110px] -mt-1.5 md:-mt-4 leading-none" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.12)" }}>
              {t.hero.title2}
            </span>
          </h1>

          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-5 md:gap-8 mt-5 md:mt-6 items-end">
            <p className="text-white/75 text-[15px] md:text-xl leading-relaxed max-w-xl pr-2">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-3">
                <Link href="/client/commande" className="inline-flex items-center justify-center gap-2 bg-[#E63946] text-white px-6 py-[14px] md:py-4 rounded-full font-black text-[15px] active:scale-[0.98] hover:bg-[#d6323f] transition shadow-[0_8px_24px_rgba(230,57,70,0.4)] w-full sm:w-auto">
                  Commander Maintenant <ArrowRight size={18} />
                </Link>
                <div className="flex gap-2">
                  <Link href="/tracking" className="flex-1 inline-flex items-center justify-center gap-2 bg-white text-[#0A1931] px-4 py-[14px] md:py-4 rounded-full font-black text-[13px] md:text-[15px] active:scale-[0.98] transition">
                    <MapPin size={16} /> {t.hero.ctaSecondary}
                  </Link>
                  <Link href="/quote" className="flex-1 inline-flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white px-4 py-[14px] md:py-4 rounded-full font-bold text-[13px] md:text-sm active:scale-[0.98] transition">
                    Devis
                  </Link>
                </div>
              </div>
              <div className=" hidden md:flex items-center gap-2 text-white/50 text-xs">
                <ShieldCheck size={14} className="text-green-400" /> Paiement à la livraison • Aucune avance
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 md:mt-10 grid grid-cols-3 gap-2 md:gap-3 max-w-2xl">
          {t.hero.stats.map((s, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-2 md:px-4 py-3 text-center">
              <div className="text-white font-black text-[13px] md:text-base leading-none">{s.split(" ")[0]}</div>
              <div className="text-white/60 text-[10px] md:text-[11px] tracking-wide uppercase leading-tight mt-1">{s.split(" ").slice(1).join(" ")}</div>
            </div>
          ))}
        </div>

        {/* Mobile transit card - visible only on phone, thumb friendly */}
        <div className="lg:hidden mt-5 flex gap-3 overflow-x-auto scrollbar-hide snap-x -mx-4 px-4 pb-1">
          <div className="snap-center shrink-0 bg-white rounded-[18px] p-3 w-[280px] flex items-center gap-3 shadow-xl">
            <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&q=80" className="w-10 h-10 rounded-full object-cover" alt="" />
            <div className="flex-1 min-w-0">
              <div className="font-black text-[13px] leading-none">HK-784291 • En vol</div>
              <div className="text-xs text-black/50 truncate">Guangzhou → Alger • 68%</div>
              <div className="mt-1 h-1.5 bg-black/10 rounded-full overflow-hidden"><div className="h-full bg-[#E63946] w-[68%]" /></div>
            </div>
          </div>
          <div className="snap-center shrink-0 bg-[#FFF8F0] rounded-full px-4 py-3 flex items-center gap-3 shadow-xl">
            <div className="w-8 h-8 rounded-full bg-green-500 grid place-items-center text-white"><ShieldCheck size={14} /></div>
            <div className="leading-none">
              <div className="font-black text-xs">Paiement à livraison</div>
              <div className="text-[11px] text-black/50">Zéro avance</div>
            </div>
          </div>
        </div>

        {/* Desktop floating cards */}
        <div className="hidden lg:block">
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.9, duration: 0.8 }} className="absolute right-6 top-[38%] bg-white rounded-[20px] p-4 w-[280px] shadow-2xl rotate-1">
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&q=80" className="w-12 h-12 rounded-full object-cover" alt="" />
              <div>
                <div className="font-bold text-sm leading-none">Colis en transit</div>
                <div className="text-xs text-black/50">HK-784291 • Guangzhou → Alger</div>
              </div>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="mt-3 h-2 bg-black/10 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: "68%" }} transition={{ delay: 1.2, duration: 1 }} className="h-full bg-[#E63946]" /></div>
            <div className="flex justify-between text-[11px] mt-1 font-medium"><span>Expédié</span><span>68%</span><span>Livré</span></div>
          </motion.div>
          <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 1, duration: 0.8 }} className="absolute right-10 bottom-12 bg-[#FFF8F0] rounded-full px-4 py-3 flex items-center gap-3 shadow-xl -rotate-1">
            <div className="w-9 h-9 rounded-full bg-green-500 grid place-items-center text-white"><ShieldCheck size={16} /></div>
            <div className="leading-none"><div className="font-black text-sm">Paiement à la livraison</div><div className="text-xs text-black/50">Zéro risque • Zéro avance</div></div>
            <div className="text-[11px] font-bold bg-green-500 text-white px-2 py-1 rounded-full">✓ GARANTI</div>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-[1280px] px-4 md:px-6 pb-4 md:pb-6 flex items-center gap-2 md:gap-3 text-white/60 text-[11px] md:text-xs">
        <div className="flex -space-x-2">
          {[1,2,3,4].map(i=> <img key={i} src={`https://i.pravatar.cc/100?img=${10+i}`} alt="" className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover border-2 border-[#0A1931]" />)}
        </div>
        <span className="ml-1 leading-tight">{t.hero.trust}</span>
        <span className="ml-auto hidden md:inline text-white/30">Scroll pour explorer ↓</span>
      </div>
    </section>
  );
}
