"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Clock, MapPin } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const textScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.85]);
  const { t } = useI18n();

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#0A1931] rounded-b-[32px] md:rounded-b-[48px]">
      {/* Background image with parallax */}
      <motion.div style={{ scale, y }} className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=1920&q=80"
          alt="Container ship"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0A1931]/40 via-[#0A1931]/60 to-[#0A1931]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(230,57,70,0.25),transparent_60%)]" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative mx-auto max-w-[1280px] px-6 pt-12 pb-10 md:pt-20 md:pb-16">
        {/* Badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 bg-white text-[#0A1931] px-4 py-2 rounded-full text-xs font-bold tracking-wide"
        >
          <span className="w-2 h-2 bg-[#E63946] rounded-full animate-pulse" />
          {t.hero.badge}
          <span className="hidden sm:inline-flex items-center gap-1 text-black/40">• <Clock size={12} /> 10-15 jours</span>
        </motion.div>

        {/* Big Typography with zoom on scroll */}
        <motion.div style={{ scale: textScale }} className="mt-8">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="font-black leading-[0.85] tracking-tighter"
          >
            <span className="block text-white text-[18vw] md:text-[11vw] lg:text-[140px]">{t.hero.title1}</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40 text-[14vw] md:text-[9vw] lg:text-[110px] -mt-2 md:-mt-4" style={{ WebkitTextStroke: "1px rgba(255,255,255,0.15)" }}>
              {t.hero.title2}
            </span>
          </motion.h1>

          <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-8 mt-6 items-end">
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.7 }}
              className="text-white/70 text-lg md:text-xl leading-relaxed max-w-xl"
            >
              {t.hero.subtitle}
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <Link href="/quote" className="inline-flex items-center justify-center gap-2 bg-[#E63946] text-white px-8 py-4 rounded-full font-bold text-[15px] hover:bg-[#d6323f] transition shadow-[0_8px_24px_rgba(230,57,70,0.4)]">
                {t.hero.ctaPrimary} <ArrowRight size={18} />
              </Link>
              <Link href="/tracking" className="inline-flex items-center justify-center gap-2 bg-white text-[#0A1931] px-8 py-4 rounded-full font-bold text-[15px] hover:bg-white/90 transition">
                <MapPin size={18} /> {t.hero.ctaSecondary}
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          className="mt-10 grid grid-cols-3 gap-3 max-w-2xl"
        >
          {t.hero.stats.map((s, i) => (
            <div key={i} className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl px-4 py-3 text-center">
              <div className="text-white font-black text-sm md:text-base leading-none">{s.split(" ")[0]}</div>
              <div className="text-white/60 text-[11px] tracking-wide uppercase">{s.split(" ").slice(1).join(" ")}</div>
            </div>
          ))}
        </motion.div>

        {/* Floating cards */}
        <div className="hidden lg:block">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="absolute right-6 top-[38%] bg-white rounded-[20px] p-4 w-[280px] shadow-2xl rotate-1"
          >
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=100&q=80" className="w-12 h-12 rounded-full object-cover" alt="" />
              <div>
                <div className="font-bold text-sm leading-none">Colis en transit</div>
                <div className="text-xs text-black/50">HK-784291 • Guangzhou → Alger</div>
              </div>
              <div className="ml-auto w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="mt-3 h-2 bg-black/10 rounded-full overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: "68%" }} transition={{ delay: 1.2, duration: 1.2 }} className="h-full bg-[#E63946]" />
            </div>
            <div className="flex justify-between text-[11px] mt-1 font-medium"><span>Expédié</span><span>68%</span><span>Livré</span></div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="absolute right-10 bottom-12 bg-[#FFF8F0] rounded-full px-4 py-3 flex items-center gap-3 shadow-xl -rotate-1"
          >
            <div className="w-9 h-9 rounded-full bg-green-500 grid place-items-center text-white"><ShieldCheck size={16} /></div>
            <div className="leading-none">
              <div className="font-black text-sm">Paiement à la livraison</div>
              <div className="text-xs text-black/50">Zéro risque • Zéro avance</div>
            </div>
            <div className="text-[11px] font-bold bg-green-500 text-white px-2 py-1 rounded-full">✓ GARANTI</div>
          </motion.div>
        </div>
      </motion.div>

      <div className="relative mx-auto max-w-[1280px] px-6 pb-6 flex items-center gap-3 text-white/60 text-xs">
        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80" alt="" className="w-8 h-8 rounded-full object-cover border-2 border-white/20" />
        <div className="flex gap-1">
          {[1,2,3,4].map(i=> <img key={i} src={`https://i.pravatar.cc/100?img=${10+i}`} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-[#0A1931] -ml-2 first:ml-0" />)}
        </div>
        <span className="ml-1">{t.hero.trust}</span>
        <span className="ml-auto hidden md:inline text-white/30">Scroll pour explorer ↓</span>
      </div>
    </section>
  );
}
