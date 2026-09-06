"use client";
import { motion } from "framer-motion";
import { useI18n } from "@/lib/i18n-context";

export default function HowTeaser() {
  const { t } = useI18n();
  return (
    <section className="bg-[#0A1931] text-white rounded-[24px] md:rounded-[32px] mx-3 md:mx-6 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6 py-8 md:py-20">
        <div className="flex flex-col md:flex-row justify-between gap-4 md:gap-6 mb-6 md:mb-10">
          <div>
            <div className="text-[#E63946] font-black tracking-[0.2em] text-[11px] md:text-xs mb-2 md:mb-3">PROCESSUS</div>
            <h2 className="font-black text-[28px] md:text-6xl tracking-tighter leading-none">
              {t.how.title.split(" ")[0]} <span className="text-white/30">{t.how.title.split(" ").slice(1).join(" ")}</span>
            </h2>
            <p className="text-white/60 mt-2 md:mt-3 text-sm">{t.how.subtitle}</p>
          </div>
          <div className="hidden md:block text-8xl font-black text-white/[0.06] leading-none">04 ÉTAPES</div>
          <div className="md:hidden text-sm font-black text-white/30 flex items-center gap-2">Glissez → <span className="animate-pulse">›››</span></div>
        </div>

        <div className="flex gap-3 overflow-x-auto scrollbar-hide snap-x -mx-4 px-4 md:mx-0 md:px-0 pb-2">
          {t.how.steps.map((s, i) => (
            <motion.div key={s.n} initial={{ y: 12, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} className="snap-center shrink-0 w-[84vw] max-w-[320px] md:min-w-[360px] bg-white text-[#0A1931] rounded-[20px] md:rounded-[24px] p-5 md:p-6 relative overflow-hidden">
              <div className="text-[48px] md:text-[64px] font-black leading-none text-black/[0.06]">{s.n}</div>
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-[#0A1931] text-white grid place-items-center font-black text-sm -mt-5 md:-mt-6 relative z-10">{s.n}</div>
              <h3 className="font-black text-[17px] md:text-xl mt-3 md:mt-4 tracking-tight">{s.t}</h3>
              <p className="text-[13px] md:text-sm text-black/60 leading-relaxed mt-1.5 md:mt-2">{s.d}</p>
              <img src={`https://images.unsplash.com/photo-${["1586528116311-ad8dd3c8310d","1494412574643-ff11b0a5c1c3","1536599018102-9f803c140fc1","1449824913935-59a10b8d2000"][i]}?w=400&q=80`} alt="" className="mt-4 rounded-xl md:rounded-2xl h-32 md:h-36 w-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
