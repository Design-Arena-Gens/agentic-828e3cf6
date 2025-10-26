'use client';

import { useMemo, useState } from "react";
import { LanguageToggle } from "./sections/language-toggle";
import { HeroSection } from "./sections/hero-section";
import { ArchitectureSection } from "./sections/architecture-section";
import { ConversationOnboarding } from "./sections/conversation-onboarding";
import { FinancialIntelligenceSection } from "./sections/financial-intelligence-section";
import { SchemeMatcherSection } from "./sections/scheme-matcher-section";
import { VisualizationSuiteSection } from "./sections/visualization-suite-section";
import { EnhancementsSection } from "./sections/enhancements-section";
import { ComplianceSection } from "./sections/compliance-section";
import { CallToActionSection } from "./sections/cta-section";

export type SupportedLanguage = "en" | "te";

export const copyDictionary: Record<
  SupportedLanguage,
  {
    hero: {
      headline: string;
      subheadline: string;
      primaryCta: string;
      secondaryCta: string;
      stats: { label: string; value: string }[];
    };
    architectureIntro: string;
  }
> = {
  en: {
    hero: {
      headline:
        "AI Blueprint for Bankable DPRs Across Andhra Pradesh MSME Ecosystems",
      subheadline:
        "Fuse conversational onboarding, policy-grade analytics, and multilingual intelligence to deliver investor-ready, subsidy-compliant Detailed Project Reports within minutes.",
      primaryCta: "Launch Pilot Sandbox",
      secondaryCta: "Download Solution Stack",
      stats: [
        { label: "MSMEs Targeted", value: "2.1M+" },
        { label: "Schemes Indexed", value: "175+" },
        { label: "Delivery SLA", value: "< 15 min" },
      ],
    },
    architectureIntro:
      "Composable architecture orchestrating conversational intake, data intelligence, and policy compliance for AP MSME ONE platform.",
  },
  te: {
    hero: {
      headline:
        "ఆంధ్రప్రదేశ్ MSME ఆవాసాల్లో బ్యాంకబుల్ డిపిఆర్‌ల కోసం ఏఐ బ్లూప్రింట్",
      subheadline:
        "బహుభాషా సంభాషణాత్మక ఆన్‌బోర్డింగ్, విధానపరమైన విశ్లేషణలు, మద్దతు పథకాల మ్యాపింగ్‌తో నిమిషాల్లో పెట్టుబడిదారులకు సిద్ధమైన DPRలను స్వయంచాలకంగా రూపొందించండి.",
      primaryCta: "పైలట్ శాండ్‌బాక్స్ ప్రారంభించండి",
      secondaryCta: "సొల్యూషన్ స్టాక్ డౌన్‌లోడ్",
      stats: [
        { label: "MSME లక్ష్యం", value: "21 లక్షల+" },
        { label: "పథకాలు సూచీ", value: "175+" },
        { label: "డెలివరీ SLA", value: "< 15 నిమి" },
      ],
    },
    architectureIntro:
      "AP MSME ONE ప్లాట్‌ఫారమ్ కోసం సంభాషణాత్మక ఇంటేక్, డేటా ఇంటెలిజెన్స్, పాలసీ అనుసరణను సమన్వయం చేసే మాడ్యులర్ నిర్మాణం.",
  },
};

export function LandingShell() {
  const [language, setLanguage] = useState<SupportedLanguage>("en");

  const contextValue = useMemo(
    () => ({
      language,
      setLanguage,
    }),
    [language],
  );

  return (
    <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col gap-20 px-6 pb-24 pt-16 md:px-10 lg:px-12">
      <div className="glass-surface sticky top-6 z-40 flex flex-col items-start gap-4 rounded-3xl border border-slate-500/40 bg-slate-900/70 px-5 py-4 shadow-xl shadow-cyan-500/10 backdrop-blur-xl md:flex-row md:items-center md:justify-between md:px-8 md:py-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cyan-300">
            AP MSME ONE | AI DPR ENGINE
          </p>
          <p className="text-sm text-slate-200">
            {language === "en"
              ? "Bilingual digital public infrastructure for inclusive finance."
              : "సమగ్ర ఆర్థిక చేరికల కోసం ద్విభాషా డిజిటల్ ప్రజా మౌలిక వసతి."}
          </p>
        </div>
        <LanguageToggle contextValue={contextValue} />
      </div>

      <HeroSection dictionary={copyDictionary[language]} />
      <ArchitectureSection
        language={language}
        intro={copyDictionary[language].architectureIntro}
      />
      <ConversationOnboarding language={language} />
      <FinancialIntelligenceSection language={language} />
      <SchemeMatcherSection language={language} />
      <VisualizationSuiteSection language={language} />
      <EnhancementsSection language={language} />
      <ComplianceSection language={language} />
      <CallToActionSection language={language} />
    </div>
  );
}
