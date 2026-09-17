"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Calculator, MessageCircle } from "lucide-react";
import { SITE_CONFIG, getWhatsAppUrl } from "@/data/siteConfig";
import { useQuoteModal } from "@/components/quote/QuoteModalContext";
import { useLanguage } from "@/context/LanguageContext";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useCountUp } from "@/hooks/useCountUp";
import { GlobalRouteNetwork } from "@/components/home/GlobalRouteNetwork";
import { LiveFreightDeskBar } from "@/components/home/LiveFreightDeskBar";

// 3D scene is client/WebGL-only and fairly heavy — load it after the critical hero
// text/CTAs (which drive LCP) rather than blocking on it.
const HeroContainers3D = dynamic(() => import("@/components/home/HeroContainers3D"), {
  ssr: false,
  loading: () => null,
});

function parseLeadingInt(value: string): number {
  return parseInt(value.replace(/[^0-9]/g, ""), 10);
}

export function Hero() {
  const { openQuoteModal } = useQuoteModal();
  const { t, locale } = useLanguage();
  const reducedMotion = useReducedMotion();

  const shipments = useCountUp(parseLeadingInt(SITE_CONFIG.metrics.completedShipments), {
    disabled: reducedMotion,
  });
  const importers = useCountUp(parseLeadingInt(SITE_CONFIG.metrics.importersServed), {
    disabled: reducedMotion,
  });
  const rating = useCountUp(SITE_CONFIG.metrics.alibabaRating, {
    disabled: reducedMotion,
    decimals: 1,
    duration: 1.1,
  });
  // Mirrors SITE_CONFIG.contact.slaResponseTime ("≤ 2-Hour Average Response Time"), shortened for the metric tile.
  const sla = useCountUp(2, { disabled: reducedMotion, duration: 1 });

  const fadeUp = reducedMotion
    ? {}
    : { initial: { opacity: 0, y: 16 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

  return (
    <section className="relative isolate overflow-hidden bg-slate-950 text-white pt-16 pb-14 lg:pt-24 lg:pb-20 border-b border-slate-800">
      {/* Cinematic backdrop: navy base, cyan network glow, warm accent light */}
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-950 to-slate-950" />
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(234,88,12,0.12),transparent_60%)]" />
      <GlobalRouteNetwork
        className="absolute inset-y-0 right-0 -z-10 h-full w-full max-w-4xl opacity-70 [mask-image:linear-gradient(to_left,white_40%,transparent_85%)]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:items-center gap-2 lg:gap-8">
        <motion.div className="lg:col-span-7 max-w-3xl space-y-6" {...fadeUp} transition={{ duration: 0.5 }}>
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 px-3 py-1 text-xs font-semibold text-blue-300">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              <span>{t("hero.nvoccBadge")}</span>
            </div>

            <a
              href={SITE_CONFIG.socials.alibabaTrustPass}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 px-3 py-1 text-xs font-semibold text-amber-300"
            >
              <Award className="h-3.5 w-3.5 text-amber-400" />
              <span>
                {locale === "zh"
                  ? `阿里巴巴 ${SITE_CONFIG.metrics.alibabaRating}/5 (${SITE_CONFIG.metrics.alibabaReviewCount}条真实好评)`
                  : `Alibaba ${SITE_CONFIG.metrics.alibabaRating}/5 (${SITE_CONFIG.metrics.alibabaReviewCount} Verified Reviews)`}
              </span>
            </a>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white">
            {t("hero.titlePart1")} <br />
            <span className="text-sky-400">{t("hero.titlePart2")}</span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
            {t("hero.description")}
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={() => openQuoteModal()}
              className="flex items-center gap-2 rounded-xl bg-orange-600 hover:bg-orange-700 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-orange-600/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
            >
              <Calculator className="h-4 w-4" />
              <span>{t("hero.launchQuote")}</span>
            </button>

            <a
              href={getWhatsAppUrl("Hello JCD Forwarder, I need an immediate DDP freight quote from China.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 px-6 py-4 text-sm font-bold text-white shadow-xl shadow-emerald-600/30 transition-all hover:scale-[1.02]"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{t("hero.whatsappDispatch")}</span>
            </a>
          </div>

          {/* Trust Metric Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800/80">
            <div>
              <div className="text-2xl sm:text-3xl font-black text-white">{shipments.toLocaleString()}+</div>
              <div className="text-xs text-slate-400 mt-0.5">{t("hero.completedShipments")}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-blue-400">{importers.toLocaleString()}+</div>
              <div className="text-xs text-slate-400 mt-0.5">{t("hero.importersServed")}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-amber-400">{rating.toFixed(1)} / 5.0</div>
              <div className="text-xs text-slate-400 mt-0.5">{t("hero.alibabaRating")}</div>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">≤ {sla} {t("hero.hours")}</div>
              <div className="text-xs text-slate-400 mt-0.5">{t("hero.slaResponseTime")}</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="lg:col-span-5 relative h-72 sm:h-[400px] lg:h-[560px] -mt-4 lg:-mt-10 lg:mr-[-3rem] overflow-visible"
          {...fadeUp}
          transition={{ duration: 0.7, delay: reducedMotion ? 0 : 0.12 }}
        >
          {/* Multi-layer glow aura behind the containers */}
          <div className="pointer-events-none absolute inset-0 -z-10">
            {/* Outer sky-blue bloom */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[90%] rounded-full bg-sky-500/8 blur-[64px]" />
            {/* Inner tighter sky glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[55%] w-[70%] h-[65%] rounded-full bg-sky-400/10 blur-3xl" />
            {/* Orange brand warmth — lower-center */}
            <div className="absolute bottom-[15%] left-1/2 -translate-x-1/2 w-[55%] h-[30%] rounded-full bg-orange-500/12 blur-2xl" />
          </div>

          {/* Canvas fills entire panel — transparent bg blends with slate-950 */}
          <div className="absolute inset-0">
            <HeroContainers3D />
          </div>
        </motion.div>
        </div>

        <motion.div
          className="mt-8 lg:mt-16"
          {...fadeUp}
          transition={{ duration: 0.5, delay: reducedMotion ? 0 : 0.15 }}
        >
          <LiveFreightDeskBar />
        </motion.div>
      </div>
    </section>
  );
}
