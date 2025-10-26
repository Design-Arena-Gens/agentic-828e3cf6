'use client';

import { ToggleLeft, ToggleRight } from "lucide-react";
import type { SupportedLanguage } from "../landing-shell";
import { cn } from "@/lib/utils";
import { createContext, useContext } from "react";

type ContextValue = {
  language: SupportedLanguage;
  setLanguage: (val: SupportedLanguage) => void;
};

const LanguageContext = createContext<ContextValue | null>(null);

export function LanguageToggle({
  contextValue,
}: {
  contextValue: ContextValue;
}) {
  return (
    <LanguageContext.Provider value={contextValue}>
      <LanguageSwitch />
    </LanguageContext.Provider>
  );
}

function LanguageSwitch() {
  const context = useContext(LanguageContext);

  if (!context) {
    return null;
  }

  const { language, setLanguage } = context;

  return (
    <div className="flex items-center gap-2 rounded-full border border-slate-600/70 bg-slate-900/80 px-3 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-slate-200 shadow-lg shadow-cyan-500/10">
      <button
        type="button"
        className={cn(
          "flex items-center gap-1 rounded-full px-2 py-1 transition",
          language === "en"
            ? "bg-cyan-500/20 text-cyan-200"
            : "text-slate-300 hover:text-cyan-100",
        )}
        onClick={() => setLanguage("en")}
      >
        <ToggleLeft size={16} />
        EN
      </button>
      <button
        type="button"
        className={cn(
          "flex items-center gap-1 rounded-full px-2 py-1 transition",
          language === "te"
            ? "bg-emerald-500/20 text-emerald-200"
            : "text-slate-300 hover:text-emerald-100",
        )}
        onClick={() => setLanguage("te")}
      >
        <ToggleRight size={16} />
        TE
      </button>
    </div>
  );
}
