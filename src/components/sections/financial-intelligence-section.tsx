'use client';

import { useMemo, useState } from "react";
import type { SupportedLanguage } from "../landing-shell";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { cn } from "@/lib/utils";

type CashFlowPoint = {
  month: string;
  revenue: number;
  expenses: number;
  cash: number;
};

const months = [
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
];

const sectorBenchmarks = {
  en: [
    {
      metric: "DSCR",
      value: "1.65x",
      benchmark: "≥ 1.25x (Food Processing, SIDBI FY25)",
    },
    {
      metric: "Gross Margin",
      value: "34%",
      benchmark: "30% - 38% (Cluster Diagnostics, AP Food Valley)",
    },
    {
      metric: "Working Capital Cycle",
      value: "62 days",
      benchmark: "45 - 70 days (RBI MSME Pulse Q4 FY24)",
    },
  ],
  te: [
    {
      metric: "DSCR",
      value: "1.65x",
      benchmark: "≥ 1.25x (ఫుడ్ ప్రాసెసింగ్, SIDBI FY25)",
    },
    {
      metric: "గ్రాస్ మార్జిన్",
      value: "34%",
      benchmark: "30% - 38% (క్లస్టర్ డయాగ్నస్టిక్స్, AP ఫుడ్ వాలీ)",
    },
    {
      metric: "వర్కింగ్ క్యాపిటల్ చక్రం",
      value: "62 రోజులు",
      benchmark: "45 - 70 రోజులు (RBI MSME పల్స్ Q4 FY24)",
    },
  ],
};

export function FinancialIntelligenceSection({
  language,
}: {
  language: SupportedLanguage;
}) {
  const [growthRate, setGrowthRate] = useState(14);
  const [loanTenure, setLoanTenure] = useState(5);
  const [workingCapitalMonths, setWorkingCapitalMonths] = useState(3);

  const data = useMemo<CashFlowPoint[]>(() => {
    const baseRevenue = 12_00_000;
    const baseExpenseRatio = 0.66;
    let cumulativeCash = 0;

    return months.map((month, index) => {
      const seasonalFactor = index % 6 === 0 ? 1.12 : index % 3 === 0 ? 1.08 : 1;
      const revenue =
        baseRevenue *
        Math.pow(1 + growthRate / 100, index / 12) *
        seasonalFactor;
      const expenses =
        revenue * baseExpenseRatio +
        (workingCapitalMonths > 2 ? 25_000 : 15_000) +
        (index === 0 ? 40_000 : 0);
      cumulativeCash += revenue - expenses;
      return {
        month,
        revenue: Math.round(revenue),
        expenses: Math.round(expenses),
        cash: Math.round(cumulativeCash),
      };
    });
  }, [growthRate, workingCapitalMonths]);

  const dscr = useMemo(() => {
    const ebitda = data.reduce((acc, point) => acc + (point.revenue - point.expenses), 0);
    const annualDebtService = 9_60_000 / loanTenure;
    return (ebitda / annualDebtService).toFixed(2);
  }, [data, loanTenure]);

  return (
    <section className="grid gap-8 rounded-3xl border border-slate-700/55 bg-slate-900/70 p-8 md:grid-cols-[3fr_2fr] md:gap-12">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
          {language === "en"
            ? "Intelligent Financial Engine"
            : "తెలివైన ఆర్థిక ఇంజిన్"}
        </h2>
        <p className="max-w-2xl text-sm text-slate-200 md:text-base">
          {language === "en"
            ? "Adaptive financial modelling layer seeded with cluster benchmarks, RBI/MSME indices, and AP district credit plans. Configure growth, tenure, and working capital assumptions to auto-tune DPR financial schedules."
            : "క్లస్టర్ బెంచ్‌మార్క్‌లు, RBI/MSME సూచీలు మరియు AP జిల్లా క్రెడిట్ ప్రణాళికల ఆధారంగా రూపకల్పన చేసిన అడాప్టివ్ ఫైనాన్షియల్ మోడలింగ్. వృద్ధి, కాలపరిమితి, వర్కింగ్ క్యాపిటల్ అంచనాలను సర్దుబాటు చేసి DPR ఆర్థిక షెడ్యూల్‌లను ఆటో-ట్యూన్ చేయండి."}
        </p>
        <div className="rounded-3xl border border-slate-700/50 bg-slate-950/70 p-6">
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.7} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 8" stroke="#334155" />
              <XAxis dataKey="month" stroke="#94a3b8" />
              <YAxis tickFormatter={(value) => `₹${(value / 100000).toFixed(1)}L`} stroke="#94a3b8" />
              <Tooltip
                formatter={(value: number) => `₹${value.toLocaleString("en-IN")}`}
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderRadius: 16,
                  border: "1px solid rgba(148, 163, 184, 0.4)",
                }}
              />
              <ReferenceLine y={0} stroke="#64748b" strokeDasharray="3 3" />
              <Area
                type="monotone"
                dataKey="revenue"
                stackId="1"
                stroke="#22d3ee"
                fill="url(#revenueGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="expenses"
                stackId="1"
                stroke="#f97316"
                fill="url(#expenseGradient)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="cash"
                stroke="#a855f7"
                fill="rgba(168,85,247,0.2)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
      <aside className="flex flex-col gap-5 rounded-3xl border border-slate-700/50 bg-slate-950/70 p-6">
        <h3 className="text-lg font-semibold text-cyan-200">
          {language === "en"
            ? "Policy-grade analytics"
            : "పాలసీ స్థాయి విశ్లేషణలు"}
        </h3>
        <div className="grid gap-4">
          <SliderControl
            label={language === "en" ? "Revenue growth (YoY)" : "ఆదాయ వృద్ధి (YoY)"}
            value={growthRate}
            onChange={setGrowthRate}
            min={5}
            max={24}
            suffix="%"
          />
          <SliderControl
            label={language === "en" ? "Loan tenure (years)" : "ఋణ కాలపరిమితి (సంవత్సరాలు)"}
            value={loanTenure}
            onChange={setLoanTenure}
            min={2}
            max={10}
            suffix="y"
          />
          <SliderControl
            label={
              language === "en"
                ? "Working capital coverage (months)"
                : "వర్కింగ్ క్యాపిటల్ కవరేజ్ (నెలలు)"
            }
            value={workingCapitalMonths}
            onChange={setWorkingCapitalMonths}
            min={1}
            max={6}
            suffix="m"
          />
        </div>
        <div className="grid gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-emerald-200">
            {language === "en" ? "Bankability Snapshot" : "బ్యాంకబిలిటీ స్నాప్‌షాట్"}
          </p>
          <ul className="space-y-2 text-sm text-emerald-100">
            <li>
              <strong>DSCR:</strong> {dscr} ·{" "}
              {language === "en"
                ? "Comfortably above mandated 1.25x threshold."
                : "నిర్దేశిత 1.25x యొక్క గరిష్టాన్ని మించి సురక్షిత స్థాయి."}
            </li>
            <li>
              <strong>{language === "en" ? "Projected break-even:" : "అంచనా బ్రేక్-ఈవెన్:"}</strong>{" "}
              {language === "en" ? "Month 11" : "11వ నెల"}
            </li>
            <li>
              <strong>{language === "en" ? "Collateral coverage:" : "కాలేటరల్ కవరేజ్:"}</strong>{" "}
              135%
            </li>
          </ul>
        </div>
        <div className="space-y-3 rounded-2xl border border-slate-700/60 bg-slate-900/70 p-4 text-sm text-slate-200">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
            {language === "en" ? "Benchmark Intelligence" : "బెంచ్‌మార్క్ మెళకువలు"}
          </p>
          <ul className="space-y-3">
            {sectorBenchmarks[language].map((item) => (
              <li key={item.metric} className="space-y-1">
                <p className="font-semibold">{item.metric}</p>
                <p className="text-cyan-200">{item.value}</p>
                <p className="text-xs text-slate-400">{item.benchmark}</p>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </section>
  );
}

function SliderControl({
  label,
  value,
  onChange,
  min,
  max,
  suffix,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  suffix?: string;
}) {
  return (
    <label className="flex flex-col gap-2 text-sm text-slate-200">
      <span className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
        {label}
        <span className="text-cyan-200">
          {value}
          {suffix}
        </span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className={cn(
          "h-1 cursor-pointer appearance-none rounded-full bg-slate-700 accent-cyan-400",
        )}
      />
    </label>
  );
}
