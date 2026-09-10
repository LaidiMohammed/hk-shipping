"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Package } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { locales, localeNames } from "@/lib/translations";

export default function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const clicks = useRef(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  const handleBadgeClick = () => {
    clicks.current += 1;
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => { clicks.current = 0; }, 3000);
    if (clicks.current >= 5) {
      clicks.current = 0;
      router.push("/admin/login?easter=1");
    }
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/how-it-works", label: t.nav.how },
    { href: "/contact", label: t.nav.contact },
  ];

  return (
    <>
      <motion.div className="fixed top-0 left-0 h-[3px] bg-[#E63946] z-[100] origin-left" style={{ scaleX: progress }} />
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "py-2 md:py-3" : "py-3 md:py-6"}`}
      >
        <div className="mx-auto max-w-[1280px] px-4">
          <div
            className={`flex items-center justify-between gap-4 rounded-full border px-2 py-2 md:px-3 transition-all duration-500 ${
              scrolled
                ? "bg-white/90 backdrop-blur-xl border-black/10 shadow-[0_8px_32px_rgba(10,25,49,0.12)]"
                : "bg-white border-black/5 shadow-sm"
            }`}
          >
            {/* Logo - 5 clicks = hidden admin */}
            <div className="flex items-center gap-3 pl-2">
              <button onClick={handleBadgeClick} aria-label="HK badge" className="w-10 h-10 rounded-full overflow-hidden border border-black/10 shadow-sm active:scale-95 transition">
                <img src="/hk.jpg" alt="HK Shipping" className="w-full h-full object-cover" draggable={false} />
              </button>
              <Link href="/" className="hidden sm:block leading-none">
                <div className="font-black text-[14px] tracking-tight text-[#0A1931]">HK SHIPPING</div>
                <div className="text-[10px] tracking-[0.2em] text-[#E63946] font-bold">EXPRESS</div>
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-1 bg-[#0A1931] rounded-full p-1">
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="px-4 py-2 rounded-full text-[13px] font-medium text-white/70 hover:text-white hover:bg-white/10 transition"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              {/* Language Coin */}
              <div className="hidden md:flex items-center bg-[#FFF8F0] border border-black/10 rounded-full p-1">
                {locales.map((l) => (
                  <button
                    key={l}
                    onClick={() => setLocale(l)}
                    className={`px-3 py-1.5 rounded-full text-xs font-black transition-all ${
                      locale === l ? "bg-[#0A1931] text-white shadow" : "text-black/50 hover:text-black"
                    }`}
                  >
                    {localeNames[l]}
                  </button>
                ))}
              </div>

              <Link
                href="/quote"
                className="hidden md:inline-flex items-center gap-2 bg-[#E63946] text-white px-5 py-[10px] rounded-full text-sm font-bold hover:bg-[#cc2f3a] transition"
              >
                {t.nav.quote} <ArrowUpRight size={16} />
              </Link>

              <Link
                href="/tracking"
                className="hidden md:flex w-10 h-10 items-center justify-center rounded-full bg-[#0A1931] text-white hover:scale-105 transition"
              >
                <Package size={16} />
              </Link>

              <button onClick={() => setOpen(!open)} className="lg:hidden w-10 h-10 rounded-full bg-[#0A1931] text-white grid place-items-center active:scale-95 transition">
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-[#0A1931] pt-20 px-5 overflow-y-auto">
            <motion.div initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="flex flex-col gap-1 pb-28">
              {links.map((l, i) => (
                <motion.div key={l.href} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.04 }}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="flex items-center justify-between py-3 border-b border-white/10 text-[28px] font-black text-white tracking-tighter active:text-[#E63946] transition">
                    {l.label} <span className="text-white/20 text-lg">→</span>
                  </Link>
                </motion.div>
              ))}
              <div className="grid grid-cols-2 gap-3 mt-6">
                <a href="https://wa.me/213550000000" className="bg-white text-[#0A1931] py-3 rounded-full font-black text-center text-sm">WhatsApp</a>
                <Link href="/tracking" onClick={()=>setOpen(false)} className="bg-white/10 border border-white/20 text-white py-3 rounded-full font-bold text-center text-sm">Suivi Colis</Link>
              </div>
              <div className="h-px bg-white/10 my-5" />
              <div className="text-white/50 text-xs font-bold tracking-widest mb-2">LANGUE</div>
              <div className="flex gap-2">
                {locales.map((l) => (
                  <button key={l} onClick={() => setLocale(l)} className={`flex-1 py-3.5 rounded-full font-black text-sm active:scale-95 transition ${locale===l?"bg-[#E63946] text-white":"bg-white text-black"}`}>
                    {localeNames[l]}
                  </button>
                ))}
              </div>
              <Link href="/quote" onClick={()=>setOpen(false)} className="mt-5 bg-[#E63946] text-white text-center py-4 rounded-full font-black text-[17px] shadow-lg active:scale-[0.98] transition">
                {t.nav.quote} →
              </Link>
              <div className="mt-4 text-center text-white/40 text-xs">Alger • Oran • Guangzhou • Yiwu</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
