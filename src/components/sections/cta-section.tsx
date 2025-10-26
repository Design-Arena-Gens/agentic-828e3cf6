import type { SupportedLanguage } from "../landing-shell";
import { ArrowUpRight } from "lucide-react";

export function CallToActionSection({
  language,
}: {
  language: SupportedLanguage;
}) {
  return (
    <section className="rounded-3xl border border-slate-700/50 bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-emerald-500/10 p-8 backdrop-blur-xl md:p-12">
      <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
            {language === "en"
              ? "Scale AP MSME prosperity with AI-native DPRs"
              : "ఏఐ ఆధారిత DPRలతో AP MSME అభివృద్ధిని విస్తరించండి"}
          </h2>
          <p className="max-w-2xl text-sm text-slate-200 md:text-base">
            {language === "en"
              ? "Deploy this stack in partnership with AP Industries Department, SIDBI, and district administration to accelerate credit delivery, formalisation, and export growth."
              : "క్రెడిట్ డెలివరీ, ఫార్మలైజేషన్ మరియు ఎగుమతి వృద్ధిని వేగవంతం చేయడానికి AP పరిశ్రమల శాఖ, SIDBI మరియు జిల్లాల పరిపాలనతో భాగస్వామ్యంగా ఈ స్టాక్‌ను అమలు చేయండి."}
          </p>
        </div>
        <a
          href="https://vercel.com"
          className="inline-flex items-center gap-2 rounded-full bg-cyan-500/90 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400"
        >
          {language === "en" ? "Request implementation sprint" : "అమలు స్ప్రింట్ అభ్యర్థించండి"}
          <ArrowUpRight size={18} />
        </a>
      </div>
    </section>
  );
}
