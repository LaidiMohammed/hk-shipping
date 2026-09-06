import type { Metadata } from "next";
import { Geist, Instrument_Serif, Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import SmoothScroll from "@/components/smooth-scroll";
import MobileBar from "@/components/mobile-bar";
import { I18nProvider } from "@/lib/i18n-context";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const serif = Instrument_Serif({ variable: "--font-serif", subsets: ["latin"], weight: "400" });
const arabic = Noto_Kufi_Arabic({ variable: "--font-arabic", subsets: ["arabic"], weight: ["400","700"] });

export const metadata: Metadata = {
  title: "HK Shipping Express • Chine → Algérie | Express Door-to-Door",
  description: "HK Shipping Express vous livre de Chine, Turquie et Dubaï vers l'Algérie en 10-15 jours. Fret maritime & aérien, dédouanement inclus, porte à porte 48 wilayas. Devis gratuit.",
  keywords: ["shipping chine algerie","hk shipping","fret chine","import algerie","yiwu","guangzhou"],
  openGraph: { title: "HK Shipping Express", description: "Votre pont Chine → Algérie", type: "website" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${serif.variable} ${arabic.variable} h-full antialiased overflow-x-hidden`}>
      <body className="min-h-full flex flex-col bg-[#FFF8F0] text-[#0A1931]">
        <I18nProvider>
          <SmoothScroll>
            <Navbar />
            <main className="flex-1 flex flex-col pt-[72px] md:pt-[88px] pb-[88px] lg:pb-0">{children}</main>
            <Footer />
            <MobileBar />
          </SmoothScroll>
        </I18nProvider>
      </body>
    </html>
  );
}
