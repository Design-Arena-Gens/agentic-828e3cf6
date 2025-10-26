'use client';

import { useMemo, useState } from "react";
import { Search, Filter, ExternalLink, BadgeCheck } from "lucide-react";
import type { SupportedLanguage } from "../landing-shell";
import { cn } from "@/lib/utils";

type Scheme = {
  id: string;
  name: string;
  description: Record<SupportedLanguage, string>;
  sector: string[];
  stage: "idea" | "growth" | "export";
  ticketSize: string;
  coverage: string;
  sources: string[];
  languageLinks: Record<SupportedLanguage, string>;
  impact: Record<SupportedLanguage, string>;
};

const schemes: Scheme[] = [
  {
    id: "pmfme",
    name: "PMFME + AP Food Processing Grant",
    description: {
      en: "Capital subsidy up to 35% for micro food enterprises, bundled with AP cluster infrastructure grants and common facility access.",
      te: "మైక్రో ఫుడ్ యూనిట్లకు 35% వరకు మూలధన సబ్సిడి, AP క్లస్టర్ మౌలిక వసతుల గ్రాంట్లు మరియు సాధారణ సదుపాయాల ప్రాప్యతతో సహా.",
    },
    sector: ["food processing", "agri value chain"],
    stage: "growth",
    ticketSize: "₹10L - ₹50L",
    coverage: "Capex subsidy · Working capital margin",
    sources: [
      "AP MSME ONE Portal > DPR Preparation Tool dataset",
      "MoFPI PMFME dashboard (Oct 2025 refresh)",
    ],
    languageLinks: {
      en: "https://apmsmeone.in/schemes/pmfme",
      te: "https://apmsmeone.in/te/schemes/pmfme",
    },
    impact: {
      en: "Matches women-led and FPO-linked units to cold-chain upgrades & quality certification grants.",
      te: "మహిళల ఆధ్వర్యంలో ఉన్న మరియు FPO అనుబంధ యూనిట్‌లకు కోల్డ్-చెయిన్ అప్‌గ్రేడ్‌లు & నాణ్యత సర్టిఫికేషన్ గ్రాంట్లను మ్యాచ్ చేస్తుంది.",
    },
  },
  {
    id: "cgtmse",
    name: "CGTMSE 3.0 + AP Credit Guarantee Top-up",
    description: {
      en: "Collateral-free term loans with guarantee cover up to ₹5 crore for greenfield and brownfield units.",
      te: "గ్రీన్‌ఫీల్డ్ మరియు బ్రౌన్‌ఫీల్డ్ యూనిట్‌లకు ₹5 కోట్లు వరకు గ్యారంటీ కవరుతో కాలేటరల్-ఫ్రీ టర్మ్ లోన్లు.",
    },
    sector: ["manufacturing", "services", "renewables"],
    stage: "growth",
    ticketSize: "₹50L - ₹5Cr",
    coverage: "Term loan guarantee · interest subvention",
    sources: [
      "CGTMSE 3.0 operational guidelines (Aug 2025)",
      "AP Industries Dept. Credit Guarantee corpus note",
    ],
    languageLinks: {
      en: "https://cgtmse.in/product-portfolio",
      te: "https://apindustries.gov.in/te/cgtmse",
    },
    impact: {
      en: "Auto-computes guarantee fee slab and DSCR expectations for AP bankers.",
      te: "AP బ్యాంకర్ల కోసం గ్యారంటీ ఫీజు స్లాబ్ మరియు DSCR అంచనాలను ఆటో కంఫ్యూట్ చేస్తుంది.",
    },
  },
  {
    id: "odop",
    name: "One District One Product Export Readiness",
    description: {
      en: "Mentorship, branding, and export market access for ODOP-identified MSMEs with AP Trade Promotion Council alignment.",
      te: "ODOP గుర్తించిన MSMEలకు మెంటర్‌షిప్, బ్రాండింగ్ మరియు ఎగుమతి మార్కెట్ ప్రాప్యత AP ట్రేడ్ ప్రమోషన్ కౌన్సిల్ సమన్వయంతో.",
    },
    sector: ["exports", "handicraft", "textiles"],
    stage: "export",
    ticketSize: "₹5L - ₹35L (grant + services)",
    coverage: "Branding · QA/QC · Export logistics",
    sources: [
      "Cross Border Console - Exports dataset",
      "AP Trade Promotion Mission briefs (2025)",
    ],
    languageLinks: {
      en: "https://odop.ap.gov.in/export-readiness",
      te: "https://odop.ap.gov.in/te/export-readiness",
    },
    impact: {
      en: "Generates supply-chain narratives and HS code intelligence inside final DPR.",
      te: "చివరి DPRలో సరఫరా గొలుసు కథనాలు మరియు HS కోడ్ ఇంటెలిజెన్స్ ఉత్పత్తి చేస్తుంది.",
    },
  },
  {
    id: "women",
    name: "AP Women Entrepreneurs ReSTART Catalyst",
    description: {
      en: "Bridge financing + performance grants for women-led units modernising post-pandemic.",
      te: "పోస్ట్-పాండమిక్ ఆధునికీకరణకు మహిళల ఆధ్వర్యంలోని యూనిట్‌లకు బ్రిడ్జ్ ఫైనాన్సింగ్ + పనితీరు గ్రాంట్లు.",
    },
    sector: ["services", "tourism", "creative economy"],
    stage: "idea",
    ticketSize: "₹2L - ₹25L",
    coverage: "Bridge finance · digital upgradation",
    sources: [
      "AI-Powered Chatbot dataset > Women MSME stack",
      "AP ReSTART policy addendum 2025",
    ],
    languageLinks: {
      en: "https://apmsmeone.in/restart-catalyst",
      te: "https://apmsmeone.in/te/restart-catalyst",
    },
    impact: {
      en: "Connects to mentorship pods and community review boards for faster sanction.",
      te: "త్వరిత ఆమోదం కోసం మెంటర్‌షిప్ పాడ్‌లు మరియు కమ్యూనిటీ రివ్యూ బోర్డులతో లింక్ చేస్తుంది.",
    },
  },
];

export function SchemeMatcherSection({
  language,
}: {
  language: SupportedLanguage;
}) {
  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState<"all" | Scheme["stage"]>("all");
  const [sectorFilter, setSectorFilter] = useState<string>("all");

  const uniqueSectors = useMemo(() => {
    const all = new Set<string>();
    schemes.forEach((scheme) => scheme.sector.forEach((item) => all.add(item)));
    return Array.from(all);
  }, []);

  const filteredSchemes = useMemo(() => {
    return schemes.filter((scheme) => {
      const matchesStage = stageFilter === "all" || scheme.stage === stageFilter;
      const matchesSector =
        sectorFilter === "all" || scheme.sector.includes(sectorFilter);
      const matchesSearch =
        search.trim().length === 0 ||
        scheme.name.toLowerCase().includes(search.toLowerCase()) ||
        scheme.description.en.toLowerCase().includes(search.toLowerCase());
      return matchesStage && matchesSector && matchesSearch;
    });
  }, [search, stageFilter, sectorFilter]);

  return (
    <section className="space-y-6 rounded-3xl border border-slate-700/55 bg-slate-900/70 p-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
            {language === "en"
              ? "Real-time Scheme & Incentive Matcher"
              : "రియల్-టైమ్ పథక & ప్రోత్సాహ మ్యాచర్"}
          </h2>
          <p className="text-sm text-slate-300 md:text-base">
            {language === "en"
              ? "Continuously synced with AP MSME ONE policy graph and central incentives to maximise viability gap funding."
              : "AP MSME ONE పాలసీ గ్రాఫ్ మరియు కేంద్ర ప్రోత్సాహాలతో నిరంతరం సింక్ అయ్యి, వియబిలిటీ గ్యాప్ ఫండింగ్‌ను గరిష్టం చేస్తుంది."}
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-950/70 px-3 py-2 text-xs uppercase tracking-[0.32em] text-slate-400">
          <BadgeCheck size={16} className="text-emerald-300" />
          {language === "en"
            ? "Eligibility traceable · bilingual outputs"
            : "ట్రేసబుల్ అర్హత · ద్విభాషా అవుట్‌పుట్‌లు"}
        </div>
      </header>
      <div className="grid gap-4 rounded-3xl border border-slate-700/50 bg-slate-950/70 p-5 md:grid-cols-[2fr_1fr_1fr]">
        <label className="flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
          <Search size={16} className="text-cyan-300" />
          <input
            className="flex-1 bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
            placeholder={
              language === "en"
                ? "Search schemes, incentives, loan products…"
                : "పథకాలు, ప్రోత్సాహాలు, లోన్ ఉత్పత్తులు శోధించండి…"
            }
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </label>
        <label className="flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
          <Filter size={16} className="text-cyan-300" />
          <select
            className="flex-1 bg-transparent text-sm text-slate-100 outline-none"
            value={stageFilter}
            onChange={(event) => setStageFilter(event.target.value as typeof stageFilter)}
          >
            <option value="all">
              {language === "en" ? "All stages" : "అన్ని దశలు"}
            </option>
            <option value="idea">{language === "en" ? "Idea / restart" : "ఐడియా / రీస్టార్ట్"}</option>
            <option value="growth">
              {language === "en" ? "Growth / scale" : "వృద్ధి / విస్తరణ"}
            </option>
            <option value="export">
              {language === "en" ? "Export ready" : "ఎగుమతికి సిద్ధం"}
            </option>
          </select>
        </label>
        <label className="flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-900/70 px-4 py-3 text-sm text-slate-200">
          <Filter size={16} className="text-cyan-300" />
          <select
            className="flex-1 bg-transparent text-sm text-slate-100 outline-none"
            value={sectorFilter}
            onChange={(event) => setSectorFilter(event.target.value)}
          >
            <option value="all">
              {language === "en" ? "All sectors" : "అన్ని రంగాలు"}
            </option>
            {uniqueSectors.map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {filteredSchemes.map((scheme) => (
          <article
            key={scheme.id}
            className="relative flex flex-col gap-4 overflow-hidden rounded-3xl border border-slate-700/55 bg-slate-950/70 p-6 shadow-lg shadow-slate-950/40 transition hover:border-cyan-400/50"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-semibold text-cyan-200">
                  {scheme.name}
                </h3>
                <p className="mt-1 text-sm text-slate-300">
                  {scheme.description[language]}
                </p>
              </div>
              <span className="rounded-full border border-cyan-500/50 bg-cyan-500/10 px-3 py-1 text-xs uppercase tracking-[0.32em] text-cyan-200">
                {scheme.stage.toUpperCase()}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
              {scheme.sector.map((sector) => (
                <span
                  key={sector}
                  className="rounded-full border border-slate-700/60 px-3 py-1"
                >
                  {sector}
                </span>
              ))}
            </div>
            <div className="grid gap-2 rounded-2xl border border-slate-700/50 bg-slate-900/70 p-4 text-sm text-slate-200">
              <p>
                <strong className="text-slate-100">
                  {language === "en" ? "Ticket size:" : "టికెట్ పరిమితి:"}
                </strong>{" "}
                {scheme.ticketSize}
              </p>
              <p>
                <strong className="text-slate-100">
                  {language === "en" ? "Coverage:" : "కవరేజ్:"}
                </strong>{" "}
                {scheme.coverage}
              </p>
              <p className="text-xs text-slate-400">
                {language === "en" ? "Impact:" : "ప్రభావం:"}{" "}
                {scheme.impact[language]}
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {language === "en" ? "Source intelligence" : "మూల ఇంటెలిజెన్స్"}
              </p>
              <ul className="space-y-1 text-xs text-slate-300">
                {scheme.sources.map((source) => (
                  <li key={source}>• {source}</li>
                ))}
              </ul>
            </div>
            <a
              href={scheme.languageLinks[language]}
              className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300"
              target="_blank"
              rel="noopener noreferrer"
            >
              {language === "en" ? "Open policy brief" : "పాలసీ బ్రీఫ్ ఓపెన్ చేయండి"}
              <ExternalLink size={16} />
            </a>
          </article>
        ))}
      </div>
      {filteredSchemes.length === 0 && (
        <p className="rounded-2xl border border-slate-700/50 bg-slate-950/70 p-6 text-center text-sm text-slate-400">
          {language === "en"
            ? "No schemes match the current filters. Adjust search terms or broaden sector focus."
            : "ప్రస్తుత ఫిల్టర్లు సరిపోలిన పథకాలు లేవు. శోధన పదాన్ని మార్చండి లేదా రంగాల ఎంపికను విస్తరించండి."}
        </p>
      )}
    </section>
  );
}
