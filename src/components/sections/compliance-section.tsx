import type { SupportedLanguage } from "../landing-shell";

const compliancePoints = [
  {
    title: {
      en: "DPDP-aligned consent ledger",
      te: "DPDP అనుకూల అనుమతి లెడ్జర్",
    },
    detail: {
      en: "Granular consent receipts stored within AP State Data Centre, mapped to citizen ID vaults with auto-expiry workflows.",
      te: "AP స్టేట్ డేటా సెంటర్‌లో నిల్వ చేయబడిన సూక్ష్మ అనుమతి రసీదులు, పౌర ID వాల్ట్‌లకు మ్యాప్ చేసి ఆటో ఎక్స్‌పైరీ వర్క్‌ఫ్లోలతో.",
    },
  },
  {
    title: {
      en: "Security and observability",
      te: "భద్రత మరియు పరిశీలన",
    },
    detail: {
      en: "Zero-trust network mesh, RBI SOC SIEM feeds, runtime vulnerability scanning, and tamper-proof audit trails for DPR edits.",
      te: "జీరో-ట్రస్ట్ నెట్‌వర్క్ మెష్, RBI SOC SIEM ఫీడ్‌లు, రัน్‌టైమ్ అసురక్షత స్కానింగ్ మరియు DPR సవరణలకు టాంపర్-ప్రూఫ్ ఆడిట్ ట్రైల్‌లు.",
    },
  },
  {
    title: {
      en: "Integration accelerators",
      te: "ఇంటిగ్రేషన్ వేగవంతాలు",
    },
    detail: {
      en: "Native connectors for AP MSME ONE APIs, GSTN, Udyam, e-Shram, CGTMSE, TReDS, and banking LOS systems.",
      te: "AP MSME ONE APIలు, GSTN, ఉధ్యమ్, ఈ-శ్రమ, CGTMSE, TReDS, బ్యాంకింగ్ LOS సిస్టమ్‌ల కోసం స్వదేశీ కనెక్టర్లను కలిగి ఉంది.",
    },
  },
  {
    title: {
      en: "AI governance",
      te: "ఏఐ పరిపాలన",
    },
    detail: {
      en: "Model cards, bias monitoring, explainability dashboards, and human override controls in every automated recommendation.",
      te: "మోడల్ కార్డులు, పక్షపాత మానిటరింగ్, వివరణాత్మక డ్యాష్‌బోర్డులు మరియు ప్రతి ఆటో సిఫార్సులో హ్యూమన్ ఓవర్‌రైడ్ నియంత్రణలు.",
    },
  },
];

export function ComplianceSection({
  language,
}: {
  language: SupportedLanguage;
}) {
  return (
    <section className="space-y-6 rounded-3xl border border-slate-700/50 bg-slate-900/70 p-8">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
          {language === "en"
            ? "Compliance, governance & deployment readiness"
            : "అనుసరణలు, పరిపాలన & డిప్లాయ్‌మెంట్ సిద్ధత"}
        </h2>
        <p className="max-w-3xl text-sm text-slate-300 md:text-base">
          {language === "en"
            ? "Designed for rapid adoption across AP government stack with robust privacy and security guardrails, ensuring trust with banks, investors, and citizens."
            : "AP ప్రభుత్వ స్టాక్‌లో వేగవంతమైన దత్తత కోసం గోప్యత మరియు భద్రతా పరిరక్షణలతో రూపొందించబడింది, బ్యాంకులు, పెట్టుబడిదారులు మరియు పౌరుల విశ్వాసం కోసం."}
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {compliancePoints.map((item) => (
          <article
            key={item.title.en}
            className="rounded-3xl border border-slate-700/50 bg-slate-950/70 p-6 shadow-lg shadow-slate-950/40"
          >
            <h3 className="text-lg font-semibold text-slate-100">
              {item.title[language]}
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              {item.detail[language]}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
