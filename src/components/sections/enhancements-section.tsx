import type { SupportedLanguage } from "../landing-shell";
import { BrainCircuit, CloudLightning, Share2, Shield, LineChart } from "lucide-react";

const enhancements = [
  {
    icon: BrainCircuit,
    title: {
      en: "Voice-to-DPR orchestration",
      te: "వాయిస్ టు డిపిఆర్ సమన్వయం",
    },
    description: {
      en: "Telugu speech recognition + neural translation fine-tuned on AP MSME corpus, generating text, tables, and visuals without manual typing.",
      te: "AP MSME కార్పస్‌పై ట్యూన్ చేసిన తెలుగు స్పీచ్ రికగ్నిషన్ + న్యూరల్ అనువాదం, మాన్యువల్ టైపింగ్ లేకుండానే పాఠ్యాలు, పట్టికలు, విజువల్స్ సృష్టిస్తుంది.",
    },
  },
  {
    icon: CloudLightning,
    title: {
      en: "Offline-first mobile companion",
      te: "ఆఫ్‌లైన్-ఫస్ట్ మొబైల్ సహాయకుడు",
    },
    description: {
      en: "PWA with encrypted local persistence, auto-sync to AP State Data Centre, and low-bandwidth media compression for rural usage.",
      te: "ఎన్‌క్రిప్ట్ చేసిన లోకల్ పెర్సిస్టెన్స్‌తో PWA, AP స్టేట్ డేటా సెంటర్‌కు ఆటో సింక్, గ్రామీణ వినియోగానికి తక్కువ బ్యాండ్విడ్ మీడియా కంప్రెషన్.",
    },
  },
  {
    icon: LineChart,
    title: {
      en: "AI Bankability Score",
      te: "ఏఐ బ్యాంకబిలిటీ స్కోర్",
    },
    description: {
      en: "Explainable scoring engine referencing RBI, SIDBI, NABARD rule books. Shares risk flags with improvement playbooks for entrepreneurs.",
      te: "RBI, SIDBI, NABARD నియమావళిని సూచించే వివరణాత్మక స్కోరింగ్ ఇంజిన్. ఆంత్రప్రెన్యూర్‌లకు మెరుగుదల ప్లేబుక్‌లతో రిస్క్ ఫ్లాగ్‌లను పంచుతుంది.",
    },
  },
  {
    icon: Share2,
    title: {
      en: "Collaborative mentor/banker review",
      te: "మెంటర్/బ్యాంకర్ కలపుల సమీక్ష",
    },
    description: {
      en: "Role-based workspaces with granular consent, comment timelines, and digital signing integrated with AP Single Sign-On.",
      te: "సూక్ష్మ అనుమతులతో రోల్-బేస్డ్ వర్క్‌స్పేస్‌లు, వ్యాఖ్యల టైమ్‌లైన్‌లు మరియు AP సింగిల్ సైన్-ఆన్‌తో ఇంటిగ్రేటెడ్ డిజిటల్ సైనింగ్.",
    },
  },
  {
    icon: Shield,
    title: {
      en: "Predictive funding advisor",
      te: "అనుమానాత్మక ఫండింగ్ సలహాదారు",
    },
    description: {
      en: "Matches DPR outputs with bank products, NBFC lines, blended finance pools, and CSR credit guarantee programs in near-real time.",
      te: "DPR అవుట్‌పుట్‌లను బ్యాంక్ ఉత్పత్తులు, NBFC లైన్లు, మిశ్రమ ఫైనాన్స్ పూల్‌లు, CSR క్రెడిట్ గ్యారంటీ ప్రోగ్రామ్‌లతో తత్వరలో మ్యాచ్ చేస్తుంది.",
    },
  },
];

export function EnhancementsSection({
  language,
}: {
  language: SupportedLanguage;
}) {
  return (
    <section className="space-y-6 rounded-3xl border border-slate-700/55 bg-slate-900/70 p-8">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
          {language === "en"
            ? "High-impact enhancements"
            : "అధిక ప్రభావం కలిగించే మెరుగుదలలు"}
        </h2>
        <p className="max-w-3xl text-sm text-slate-300 md:text-base">
          {language === "en"
            ? "Feature roadmap engineered to maximise efficiency, inclusivity, and policy value for public-sector deployment."
            : "ప్రభుత్వ రంగ అమలుకు సామర్థ్యం, శామూహిక భాగస్వామ్యం మరియు పాలసీ విలువను గరిష్టం చేయడానికి రూపొందించిన ఫీచర్ రోడ్‌మ్యాప్."}
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {enhancements.map((item) => {
          const Icon = item.icon;
          return (
            <article
              key={item.title.en}
              className="rounded-3xl border border-slate-700/50 bg-slate-950/70 p-6 shadow-lg shadow-slate-950/40"
            >
              <div className="flex items-start gap-3">
                <span className="rounded-2xl bg-slate-900/80 p-3 text-cyan-300">
                  <Icon className="size-6" />
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-slate-100">
                    {item.title[language]}
                  </h3>
                  <p className="text-sm text-slate-300">
                    {item.description[language]}
                  </p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
