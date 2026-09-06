"use client";
import { useI18n } from "@/lib/i18n-context";

export default function Marquee() {
  const { t } = useI18n();
  const items = [...t.marquee, ...t.marquee, ...t.marquee];
  return (
    <div className="bg-[#E63946] text-white py-3 overflow-hidden relative">
      <div className="flex animate-[marquee_18s_linear_infinite] whitespace-nowrap">
        {items.map((txt, i) => (
          <span key={i} className="mx-6 font-black tracking-[0.15em] text-sm">
            {txt}
          </span>
        ))}
      </div>
    </div>
  );
}
