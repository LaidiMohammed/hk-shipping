"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight, Package } from "lucide-react";
import { useI18n } from "@/lib/i18n-context";
import { locales, localeNames } from "@/lib/translations";

export default function Navbar() {
  const { locale, setLocale, t } = useI18n();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);

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
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? "py-3" : "py-6"}`}
      >
        <div className="mx-auto max-w-[1280px] px-4">
          <div
            className={`flex items-center justify-between gap-4 rounded-full border px-2 py-2 md:px-3 transition-all duration-500 ${
              scrolled
                ? "bg-white/90 backdrop-blur-xl border-black/10 shadow-[0_8px_32px_rgba(10,25,49,0.12)]"
                : "bg-white border-black/5 shadow-sm"
            }`}
          >
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 pl-2">
              <img src="/hk.jpg" alt="HK Shipping" className="w-10 h-10 rounded-full object-cover border border-black/10 shadow-sm" />
              <div className="hidden sm:block leading-none">
                <div className="font-black text-[14px] tracking-tight text-[#0A1931]">HK SHIPPING</div>
                <div className="text-[10px] tracking-[0.2em] text-[#E63946] font-bold">EXPRESS</div>
              </div>
            </Link>

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

              <button onClick={() => setOpen(!open)} className="lg:hidden w-10 h-10 rounded-full bg-[#0A1931] text-white grid place-items-center">
                {open ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-[#0A1931] pt-24 px-6"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="flex flex-col gap-2"
            >
              {links.map((l, i) => (
                <motion.div key={l.href} initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.05 }}>
                  <Link href={l.href} onClick={() => setOpen(false)} className="text-3xl font-black text-white tracking-tight hover:text-[#E63946] transition">
                    {l.label}
                  </Link>
                </motion.div>
              ))}
              <div className="h-px bg-white/10 my-6" />
              <div className="flex gap-2">
                {locales.map((l) => (
                  <button key={l} onClick={() => setLocale(l)} className={`flex-1 py-3 rounded-full font-bold ${locale===l?"bg-[#E63946] text-white":"bg-white text-black"}`}>
                    {localeNames[l]}
                  </button>
                ))}
              </div>
              <Link href="/quote" onClick={()=>setOpen(false)} className="mt-4 bg-[#E63946] text-white text-center py-4 rounded-full font-black text-lg">
                {t.nav.quote}
              </Link>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
