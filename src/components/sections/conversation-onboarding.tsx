'use client';

import { useEffect, useMemo, useRef, useState } from "react";
import { Mic, MicOff, Sparkles, Send } from "lucide-react";
import type { SupportedLanguage } from "../landing-shell";
import { cn } from "@/lib/utils";

type Message = {
  id: string;
  role: "system" | "assistant" | "user";
  translations: Record<SupportedLanguage, string>;
  timestamp: string;
};

type RecognitionEvent = {
  results: ArrayLike<{ 0: { transcript: string } }>;
};

type SpeechRecognition = {
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: RecognitionEvent) => void) | null;
  onerror: ((event: Event) => void) | null;
  onend: (() => void) | null;
  interimResults: boolean;
  maxAlternatives: number;
};

type SpeechRecognitionConstructor = new () => SpeechRecognition;

const seedMessages: Message[] = [
  {
    id: "m1",
    role: "system",
    timestamp: "09:01",
    translations: {
      en: "Welcome to the AP MSME DPR co-pilot. I will capture your enterprise details, match the right schemes, and generate a tailor-made DPR.",
      te: "AP MSME DPR కో-పైలట్‌కు స్వాగతం. మీ సంస్థ వివరాలు సేకరించి, సరైన పథకాలను మ్యాచ్ చేసి, కస్టమ్ DPR సృష్టిస్తాను.",
    },
  },
  {
    id: "m2",
    role: "assistant",
    timestamp: "09:02",
    translations: {
      en: "Let us start with your business location and sector focus. Are you setting up in a rural or urban cluster?",
      te: "మీ వ్యాపార స్థలం మరియు మీ రంగం ఫోకస్‌తో ప్రారంభిద్దాం. మీరు గ్రామీణ క్లస్టర్‌లో లేదా పట్టణ క్లస్టర్‌లో ఏర్పాటు చేస్తున్నారు?",
    },
  },
  {
    id: "m3",
    role: "user",
    timestamp: "09:02",
    translations: {
      en: "We are a women-led food processing unit expanding from Guntur rural cluster.",
      te: "మేము గుంటూరు గ్రామీణ క్లస్టర్ నుండి విస్తరిస్తున్న మహిళల ఆధ్వర్యంలోని ఆహార ప్రాసెసింగ్ యూనిట్.",
    },
  },
];

const languageLabels: Record<SupportedLanguage, string> = {
  en: "English",
  te: "తెలుగు",
};

export function ConversationOnboarding({
  language,
}: {
  language: SupportedLanguage;
}) {
  const [messages, setMessages] = useState<Message[]>(seedMessages);
  const [input, setInput] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const SpeechRecognitionConstructor =
      typeof window !== "undefined"
        ? ((window as unknown as { SpeechRecognition?: SpeechRecognitionConstructor; webkitSpeechRecognition?: SpeechRecognitionConstructor })
            .SpeechRecognition ||
          (window as unknown as { webkitSpeechRecognition?: SpeechRecognitionConstructor })
            .webkitSpeechRecognition)
        : null;

    if (!SpeechRecognitionConstructor) {
      recognitionRef.current = null;
      return;
    }

    const recognition = new SpeechRecognitionConstructor();
    recognition.lang = language === "en" ? "en-IN" : "te-IN";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: RecognitionEvent) => {
      const transcript = event.results?.[0]?.[0]?.transcript?.trim();
      if (!transcript) {
        return;
      }
      handleNewMessage(transcript, language, true);
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognitionRef.current = recognition as SpeechRecognition;

    return () => {
      recognitionRef.current?.stop();
    };
    // intentionally regenerate when language changes to support bilingual ASR
  }, [language]);

  useEffect(() => {
    const node = containerRef.current;
    if (node) {
      node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
    }
  }, [messages, language]);

  const handleNewMessage = (text: string, lang: SupportedLanguage, isVoice = false) => {
    const timestamp = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }).format(new Date());

    const newMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      timestamp,
      translations: {
        en: lang === "en" ? text : text,
        te: lang === "te" ? text : text,
      },
    };

    const assistantMessage: Message = {
      id: `assistant-${Date.now() + 1}`,
      role: "assistant",
      timestamp,
      translations: {
        en: isVoice
          ? "Voice input captured. Generating financial inputs and scheme shortlist…"
          : "Thank you. I am aligning your financial ratios and scheme eligibility next.",
        te: isVoice
          ? "వాయిస్ ఇన్‌పుట్ అందుకుంది. ఆర్థిక గణాంకాలు మరియు పథకాల షార్ట్‌లిస్ట్ సిద్ధం చేస్తోంది…"
          : "ధన్యవాదాలు. మీ ఆర్థిక నిష్పత్తులు మరియు పథక అర్హతలను ప్రస్తుతం సరిపోలుస్తున్నాను.",
      },
    };

    setMessages((prev) => [...prev, newMessage, assistantMessage]);
    setInput("");
  };

  const handleSubmit = () => {
    if (!input.trim()) return;
    handleNewMessage(input.trim(), language);
  };

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) {
      return;
    }
    if (listening) {
      recognition.stop();
      setListening(false);
    } else {
      recognition.lang = language === "en" ? "en-IN" : "te-IN";
      recognition.start();
      setListening(true);
    }
  };

  const onboardingSteps = useMemo(
    () =>
      language === "en"
        ? [
            "Business identity & promoter profiling",
            "Production capacity, workforce, and resource inputs",
            "Financial history, credit score, GST/compliance status",
            "Asset, collateral, and sustainability disclosures",
            "Scheme alignment and DPR narrative customization",
          ]
        : [
            "వ్యాపార గుర్తింపు & ప్రమోటర్ ప్రొఫైలింగ్",
            "ఉత్పత్తి సామర్థ్యం, కార్మిక శక్తి మరియు వనరుల ఇన్‌పుట్‌లు",
            "ఆర్థిక చరిత్ర, క్రెడిట్ స్కోర్, GST/కంప్లయెన్స్ స్థితి",
            "ఆస్తి, కాలేటరల్ మరియు సస్టైనబిలిటీ ప్రకటనలు",
            "పథక సరిపోలిక మరియు DPR కథనం అనుకూలీకరణ",
          ],
    [language],
  );

  return (
    <section className="grid gap-6 rounded-3xl border border-slate-700/50 bg-slate-900/70 p-8 shadow-2xl shadow-slate-950/50 md:grid-cols-[3fr_2fr] md:gap-10">
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between text-slate-300">
          <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
            {language === "en"
              ? "Conversational Onboarding Studio"
              : "సంభాషణాత్మక ఆన్‌బోర్డింగ్ స్టూడియో"}
          </h2>
          <span className="rounded-full border border-slate-600/50 px-3 py-1 text-xs uppercase tracking-[0.35em]">
            {languageLabels[language]}
          </span>
        </div>
        <div
          ref={containerRef}
          className="glass-surface flex max-h-80 flex-col gap-4 overflow-y-auto rounded-2xl border border-slate-700/60 p-5"
        >
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex flex-col gap-1 rounded-2xl border border-slate-700/40 px-4 py-3 text-sm leading-relaxed text-slate-100 shadow-sm shadow-cyan-500/10",
                message.role === "assistant" && "bg-slate-950/70",
                message.role === "user" && "bg-sky-500/10 border-sky-500/40",
              )}
            >
              <span className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {message.role.toUpperCase()} · {message.timestamp}
              </span>
              <p>{message.translations[language]}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-3 rounded-2xl border border-slate-700/50 bg-slate-950/70 p-4">
          <div className="flex flex-col gap-2 md:flex-row">
            <input
              className="flex-1 rounded-full border border-slate-600/50 bg-slate-900/70 px-4 py-3 text-sm text-slate-100 outline-none placeholder:text-slate-500"
              placeholder={
                language === "en"
                  ? "Share business milestones or upcoming capital needs…"
                  : "మీ వ్యాపార పురోగతి లేదా కొత్త పెట్టుబడి అవసరం వివరించండి…"
              }
              value={input}
              onChange={(event) => setInput(event.target.value)}
            />
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={toggleListening}
                className={cn(
                  "inline-flex items-center justify-center gap-2 rounded-full border border-slate-600/70 px-4 py-3 text-sm font-semibold text-slate-100 transition",
                  listening
                    ? "border-rose-400/70 bg-rose-500/20 text-rose-200"
                    : "hover:border-cyan-400/60 hover:text-cyan-100",
                )}
              >
                {listening ? <MicOff size={16} /> : <Mic size={16} />}
                {listening
                  ? language === "en"
                    ? "Listening…"
                    : "వింటోంది…"
                  : language === "en"
                    ? "Voice to DPR"
                    : "వాయిస్ టు DPR"}
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-sky-500/90 to-cyan-400/90 px-4 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-sky-500/30 hover:from-sky-400 hover:to-cyan-300"
              >
                <Send size={16} />
                {language === "en" ? "Submit" : "సబ్మిట్"}
              </button>
            </div>
          </div>
          <p className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
            <Sparkles size={14} className="text-cyan-300" />
            {language === "en"
              ? "AI recommends minimal data entry by pre-filling from GST, Udyam and bank consented feeds."
              : "GST, ఉద్యోగ్ & బ్యాంక్ అనుమతుల ఫీడ్‌ల నుంచి ప్రీ-ఫిల్ చేసి కేవలం అవసరమైన ఇన్‌పుట్‌లను మాత్రమే అడుగుతుంది."}
          </p>
        </div>
      </div>
      <aside className="flex flex-col gap-4 rounded-3xl border border-slate-700/40 bg-slate-950/70 p-6">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            {language === "en"
              ? "Journey Blueprint"
              : "జర్నీ బ్లూప్రింట్"}
          </p>
          <h3 className="text-lg font-semibold text-cyan-200">
            {language === "en"
              ? "5-step alignment with bank expectations"
              : "బ్యాంక్ అంచనాలకు 5-దశల సరిపోలిక"}
          </h3>
        </header>
        <ol className="flex flex-col gap-3 text-sm leading-relaxed text-slate-200">
          {onboardingSteps.map((step, index) => (
            <li
              key={step}
              className="rounded-2xl border border-slate-700/60 bg-slate-900/70 px-4 py-3"
            >
              <span className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-300">
                {language === "en" ? "Stage" : "దశ"} {index + 1}
              </span>
              <p>{step}</p>
            </li>
          ))}
        </ol>
        <footer className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 px-4 py-3 text-xs text-emerald-100">
          {language === "en"
            ? "Offline-first progressive web app ensures last-mile coverage for rural entrepreneurs. Data sync complies with DPDP consent ledger."
            : "ఆఫ్‌లైన్-ఫస్ట్ ప్రోగ్రెసివ్ వెబ్ యాప్ ద్వారా గ్రామీణ పారిశ్రామికవేత్తలకు చివరి మైలు సేవ. డేటా సింక్ DPDP అనుమతి రిజిస్టర్‌ను అనుసరిస్తుంది."}
        </footer>
      </aside>
    </section>
  );
}
