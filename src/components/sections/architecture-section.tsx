import type { SupportedLanguage } from "../landing-shell";
import { ShieldCheck, Cpu, Workflow, FileText, LineChart } from "lucide-react";

const cards = [
  {
    id: "conversational",
    icon: Workflow,
    title: {
      en: "Conversational Onboarding Fabric",
      te: "సంభాషణాత్మక ఆన్‌బోర్డింగ్ ఫాబ్రిక్",
    },
    bullets: {
      en: [
        "Bi-directional Telugu↔English ASR, TTS, and scripted onboarding flows tuned for rural founders.",
        "Persona-based journey builder (first-time entrepreneur, women-led SHG, export-ready unit).",
        "Offline progressive capture with auto-sync to AP MSME ONE CRM.",
      ],
      te: [
        "గ్రామీణ వ్యవస్థాపకుల కోసం తెలుగు↔ఇంగ్లీష్ ASR, TTS ద్విముఖ ఆన్‌బోర్డింగ్ ప్రవాహాలు.",
        "పర్సోనాకు అనుగుణంగా ప్రయాణ నిర్మాణం (మొదటిసారి పరిశ్రమ, మహిళల SHG, ఎగుమతి యూనిట్).",
        "ఆఫ్‌లైన్ ప్రోగ్రెసివ్ క్యాప్చర్ మరియు AP MSME ONE CRMకి ఆటో-సింక్.",
      ],
    },
    gradient: "from-sky-500/20 via-cyan-400/10 to-transparent",
  },
  {
    id: "financial",
    icon: LineChart,
    title: {
      en: "Intelligent Financial Engine",
      te: "తెలివైన ఆర్థిక ఇంజిన్",
    },
    bullets: {
      en: [
        "Sector-specific financial models seeded with SIDBI, RBI, NABARD benchmarks.",
        "Dynamic scenario builder for DSCR, IRR, break-even, collateral coverage.",
        "Bank/Investor ready statements: CMA data packs, stress-testing dashboards.",
      ],
      te: [
        "SIDBI, RBI, NABARD బెంచ్‌మార్క్‌ల ఆధారంగా రంగానుసార ఫైనాన్షియల్ మోడళ్లు.",
        "DSCR, IRR, బ్రేక్-ఈవెన్, కాలేటరల్ కవరేజ్ కోసం డైనమిక్ సన్నరి నిర్మాణం.",
        "బ్యాంకులు/పెట్టుబడిదారులకు సిద్ధంగా ఉండే CMA డేటా ప్యాక్స్, స్ట్రెస్-టెస్ట్ డ్యాష్‌బోర్డ్‌లు.",
      ],
    },
    gradient: "from-emerald-500/20 via-emerald-400/10 to-transparent",
  },
  {
    id: "schemes",
    icon: Cpu,
    title: {
      en: "Real-time Scheme & Incentive Matcher",
      te: "రియల్-టైమ్ పథక & ప్రోత్సాహ మ్యాచర్",
    },
    bullets: {
      en: [
        "AP MSME ONE policy graph fused with central/state subsidies, credit guarantee programs.",
        "Geo-tag aware recommendations based on district industry focus & cluster missions.",
        "Eligibility reasoning trace with documentary checklist auto-generated per scheme.",
      ],
      te: [
        "AP MSME ONE పాలసీ గ్రాఫ్, కేంద్ర/రాష్ట్ర ఉత్సాహకాలు మరియు క్రెడిట్ గ్యారంటీ ప్రోగ్రామ్‌ల సమ్మేళనం.",
        "జిల్లా పరిశ్రమ ఫోకస్ & క్లస్టర్ మిషన్‌ల ఆధారంగా జియో-ట్యాగ్ సిఫార్సులు.",
        "ప్రతి పథకానికి మూడోరకమైన అర్హత వివరణతో, అవసరమైన పత్రాల చెక్‌లిస్టు ఆటో జనరేషన్.",
      ],
    },
    gradient: "from-fuchsia-500/20 via-purple-400/10 to-transparent",
  },
  {
    id: "nlg",
    icon: FileText,
    title: {
      en: "Narrative Generation & Compliance Layer",
      te: "నారేటివ్ జనరేషన్ & కంప్లయన్స్ లేయర్",
    },
    bullets: {
      en: [
        "NLG pipelines tuned on DPR corpus with Telugu/English executive summaries.",
        "Automated policy references mapped to RBI circulars, MSME Act provisions.",
        "Human-in-the-loop workflow for bankers, mentors, incubators with audit trails.",
      ],
      te: [
        "టెలుగు/ఇంగ్లీష్ ఎగ్జిక్యూటివ్ సమ్మరీలతో DPR కార్పస్‌పై ట్యూన్ చేసిన NLG పైప్‌లైన్లు.",
        "RBI సర్క్యులర్లు, MSME చట్టం క్లాజ్‌లకు ఆటోమేటెడ్ పాలసీ సూచనలు.",
        "బ్యాంకులు, మెంటర్లు, ఇంక్యుబేటర్ల కోసం ఆడిట్ ట్రైల్స్‌తో హ్యూమన్-ఇన్-ద-లూప్ వర్క్‌ఫ్లో.",
      ],
    },
    gradient: "from-amber-500/20 via-amber-400/10 to-transparent",
  },
  {
    id: "security",
    icon: ShieldCheck,
    title: {
      en: "Secure Cloud-native Deployment",
      te: "సురక్షిత క్లౌడ్-నేటివ్ డిప్లాయ్‌మెంట్",
    },
    bullets: {
      en: [
        "Modular micro-frontends on AP State Data Centre with auto-scaling edge network.",
        "Granular consent, data residency, and DPDP-compliant encryption controls.",
        "Observability stack with RBI SOC integration & proactive anomaly detection.",
      ],
      te: [
        "ఆటో-స్కేలింగ్ ఎడ్జ్ నెట్‌వర్క్‌తో AP స్టేట్ డేటా సెంటర్‌పై మాడ్యులర్ మైక్రో-ఫ్రంట్‌ఎండ్‌లు.",
        "సూక్ష్మ అనుమతి, డేటా రెసిడెన్సీ, DPDP అనుకూల సంకేతీకరణ నియంత్రణలు.",
        "RBI SOC ఇంటిగ్రేషన్ & ముందస్తు అసాధారణ గుర్తింపుతో పరిశీలనా స్టాక్.",
      ],
    },
    gradient: "from-blue-500/20 via-blue-400/10 to-transparent",
  },
];

export function ArchitectureSection({
  intro,
  language,
}: {
  intro: string;
  language: SupportedLanguage;
}) {
  return (
    <section className="space-y-12">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-50 md:text-3xl">
          {language === "en"
            ? "Reference Architecture"
            : "సూచన నిర్మాణ రూపకల్పన"}
        </h2>
        <p className="max-w-3xl text-base leading-relaxed text-slate-200 md:text-lg">
          {intro}
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <article
              key={card.id}
              className="group relative overflow-hidden rounded-3xl border border-slate-700/50 bg-slate-900/60 p-7 shadow-xl shadow-slate-950/40 transition"
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 transition-opacity duration-700 group-hover:opacity-100`}
              />
              <div className="relative flex items-start gap-4">
                <span className="rounded-2xl bg-slate-950/70 p-3 text-cyan-300">
                  <Icon className="size-6" />
                </span>
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-slate-50">
                    {card.title[language]}
                  </h3>
                  <ul className="space-y-2 text-sm leading-relaxed text-slate-200">
                    {card.bullets[language].map((bullet) => (
                      <li key={bullet}>• {bullet}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
