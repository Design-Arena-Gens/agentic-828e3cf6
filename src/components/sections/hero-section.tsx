import { ArrowRight, Download } from "lucide-react";

type HeroDictionary = {
  headline: string;
  subheadline: string;
  primaryCta: string;
  secondaryCta: string;
  stats: { label: string; value: string }[];
};

export function HeroSection({ dictionary }: { dictionary: { hero: HeroDictionary } }) {
  const { hero } = dictionary;

  return (
    <section className="mt-6 grid gap-10 rounded-3xl border border-slate-700/40 bg-gradient-to-br from-slate-900/85 via-slate-950/70 to-slate-900/55 p-8 shadow-[0_40px_80px_-20px_rgba(14,116,144,0.45)] md:grid-cols-[3fr_2fr] md:gap-14 md:p-16">
      <div className="flex flex-col gap-8">
        <div className="space-y-5">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-500/60 bg-slate-900/70 px-4 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">
            Future-Ready DPR Automation
          </span>
          <h1 className="text-3xl font-semibold leading-tight text-slate-50 md:text-5xl">
            {hero.headline}
          </h1>
          <p className="text-base leading-relaxed text-slate-200 md:text-lg">
            {hero.subheadline}
          </p>
        </div>
        <div className="flex flex-col gap-4 text-slate-200 sm:flex-row">
          <button className="inline-flex items-center justify-center gap-2 rounded-full bg-cyan-500/90 px-6 py-3 text-sm font-semibold tracking-wide text-slate-950 shadow-lg shadow-cyan-500/40 transition hover:bg-cyan-400">
            {hero.primaryCta}
            <ArrowRight size={18} />
          </button>
          <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-600/70 px-6 py-3 text-sm font-semibold tracking-wide text-slate-100 transition hover:border-cyan-400/70 hover:text-cyan-200">
            <Download size={18} />
            {hero.secondaryCta}
          </button>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="glass-surface flex flex-col gap-1 rounded-2xl border border-slate-600/60 px-4 py-5 text-slate-100"
            >
              <span className="text-xs uppercase tracking-[0.26em] text-slate-300">
                {stat.label}
              </span>
              <span className="text-2xl font-semibold text-cyan-300">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col justify-between gap-8 rounded-2xl border border-slate-700/60 bg-slate-900/60 p-6">
        <div className="space-y-3 text-sm leading-relaxed text-slate-200">
          <p className="font-semibold text-cyan-300">Strategic North Star</p>
          <p>
            Public-sector ready AI fabric interconnecting MSME entrepreneurs,
            mentors, government nodal agencies, and financial institutions
            through a single DPR intelligence layer.
          </p>
        </div>
        <div className="space-y-3 rounded-2xl border border-slate-600/50 bg-slate-950/70 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-slate-300">
            Systems-of-Record
          </p>
          <ul className="space-y-2 text-sm text-slate-200">
            <li>
              • AP MSME ONE Portal datasets (sector primers, cluster missions,
              credit gap reports)
            </li>
            <li>• SIDBI / RBI MSME benchmark dashboards</li>
            <li>• District Industries Centre approvals & compliance APIs</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
