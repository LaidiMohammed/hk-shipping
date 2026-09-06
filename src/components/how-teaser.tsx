"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useI18n } from "@/lib/i18n-context";

export default function HowTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-12%"]);
  const { t } = useI18n();

  return (
    <section ref={ref} className="bg-[#0A1931] text-white rounded-[32px] mx-3 md:mx-6 overflow-hidden">
      <div className="mx-auto max-w-[1280px] px-6 py-14 md:py-20">
        <div className="flex flex-col md:flex-row justify-between gap-6 mb-10">
          <div>
            <div className="text-[#E63946] font-black tracking-[0.2em] text-xs mb-3">PROCESSUS</div>
            <h2 className="font-black text-4xl md:text-6xl tracking-tighter leading-none">
              {t.how.title.split(" ")[0]} <span className="text-white/30">{t.how.title.split(" ").slice(1).join(" ")}</span>
            </h2>
            <p className="text-white/60 mt-3">{t.how.subtitle}</p>
          </div>
          <div className="text-6xl md:text-8xl font-black text-white/[0.06] leading-none">04 ÉTAPES</div>
        </div>

        <motion.div style={{ x }} className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
          {t.how.steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ y: 20, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[300px] md:min-w-[360px] bg-white text-[#0A1931] rounded-[24px] p-6 relative overflow-hidden group"
            >
              <div className="text-[64px] font-black leading-none text-black/[0.06] group-hover:text-[#E63946]/10 transition">{s.n}</div>
              <div className="w-10 h-10 rounded-full bg-[#0A1931] text-white grid place-items-center font-black text-sm -mt-6 relative z-10">{s.n}</div>
              <h3 className="font-black text-xl mt-4 tracking-tight">{s.t}</h3>
              <p className="text-sm text-black/60 leading-relaxed mt-2">{s.d}</p>
              <img src={`https://images.unsplash.com/photo-${["1586528116311-ad8dd3c8310d","1494412574643-ff11b0a5c1c3","1536599018102-9f803c140fc1","1449824913935-59a10b8d2000"][i]}?w=400&q=80`} alt="" className="mt-4 rounded-2xl h-36 w-full object-cover" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
