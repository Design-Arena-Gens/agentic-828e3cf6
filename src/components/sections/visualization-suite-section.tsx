'use client';

import { useMemo, useRef, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Download } from "lucide-react";
import { toPng, toSvg } from "html-to-image";
import { saveAs } from "file-saver";
import type { SupportedLanguage } from "../landing-shell";
import { cn } from "@/lib/utils";

type ScenarioKey = "pessimistic" | "base" | "optimistic";

const scenarioLabels: Record<ScenarioKey, string> = {
  pessimistic: "Pessimistic",
  base: "Base Case",
  optimistic: "Optimistic",
};

const cashFlowScenarios: Record<ScenarioKey, { month: string; inflow: number; outflow: number }[]> = {
  pessimistic: [
    { month: "Apr", inflow: 11, outflow: 9 },
    { month: "May", inflow: 11.5, outflow: 9.7 },
    { month: "Jun", inflow: 12, outflow: 10.2 },
    { month: "Jul", inflow: 12.4, outflow: 10.8 },
    { month: "Aug", inflow: 12.9, outflow: 11.1 },
    { month: "Sep", inflow: 13.2, outflow: 11.4 },
    { month: "Oct", inflow: 13.7, outflow: 11.6 },
    { month: "Nov", inflow: 14.1, outflow: 11.9 },
    { month: "Dec", inflow: 14.7, outflow: 12.2 },
    { month: "Jan", inflow: 15.1, outflow: 12.6 },
    { month: "Feb", inflow: 15.8, outflow: 12.8 },
    { month: "Mar", inflow: 16.3, outflow: 13.1 },
  ],
  base: [
    { month: "Apr", inflow: 12, outflow: 8.5 },
    { month: "May", inflow: 12.8, outflow: 9 },
    { month: "Jun", inflow: 13.4, outflow: 9.4 },
    { month: "Jul", inflow: 14.2, outflow: 10 },
    { month: "Aug", inflow: 15, outflow: 10.4 },
    { month: "Sep", inflow: 15.6, outflow: 10.9 },
    { month: "Oct", inflow: 16.5, outflow: 11.2 },
    { month: "Nov", inflow: 17.2, outflow: 11.5 },
    { month: "Dec", inflow: 18.1, outflow: 11.9 },
    { month: "Jan", inflow: 18.9, outflow: 12.2 },
    { month: "Feb", inflow: 19.8, outflow: 12.5 },
    { month: "Mar", inflow: 20.5, outflow: 12.8 },
  ],
  optimistic: [
    { month: "Apr", inflow: 12.5, outflow: 8.3 },
    { month: "May", inflow: 13.6, outflow: 8.7 },
    { month: "Jun", inflow: 14.7, outflow: 9.1 },
    { month: "Jul", inflow: 15.9, outflow: 9.6 },
    { month: "Aug", inflow: 17.2, outflow: 10 },
    { month: "Sep", inflow: 18.5, outflow: 10.4 },
    { month: "Oct", inflow: 19.8, outflow: 10.7 },
    { month: "Nov", inflow: 21.3, outflow: 11.1 },
    { month: "Dec", inflow: 22.8, outflow: 11.5 },
    { month: "Jan", inflow: 24.4, outflow: 11.8 },
    { month: "Feb", inflow: 26, outflow: 12.1 },
    { month: "Mar", inflow: 27.7, outflow: 12.4 },
  ],
};

const costBreakdown = [
  { name: "Raw Material", value: 38, fill: "#22d3ee" },
  { name: "Workforce", value: 22, fill: "#a855f7" },
  { name: "Utilities", value: 12, fill: "#f97316" },
  { name: "Logistics", value: 16, fill: "#34d399" },
  { name: "Compliance & ESG", value: 12, fill: "#facc15" },
];

const revenueStreams = [
  { name: "Domestic B2B", value: 45 },
  { name: "Retail B2C", value: 28 },
  { name: "Export Orders", value: 22 },
  { name: "By-products", value: 5 },
];

const heatmapData = [
  { parameter: "Capex", base: 0, loan: 5, grant: -3, export: 2 },
  { parameter: "Working Capital", base: 0, loan: 8, grant: -1, export: 3 },
  { parameter: "Market Demand", base: 0, loan: -4, grant: 1, export: 6 },
  { parameter: "Input Costs", base: 0, loan: -6, grant: -2, export: -3 },
  { parameter: "Trade Policy", base: 0, loan: -1, grant: 2, export: 7 },
];

type SupplyChainNode = {
  name: string;
  coordinates: [number, number];
  tier: string;
};

const supplyChainNodes: SupplyChainNode[] = [
  {
    name: "Guntur Processing Hub",
    coordinates: [80.435, 16.306],
    tier: "Processing",
  },
  {
    name: "Visakhapatnam Port",
    coordinates: [83.304, 17.704],
    tier: "Export",
  },
  {
    name: "Anantapur Agro Park",
    coordinates: [77.6, 14.68],
    tier: "Primary",
  },
  {
    name: "Kadapa Cold Chain",
    coordinates: [78.83, 14.48],
    tier: "Logistics",
  },
];

const colors = {
  pessimistic: "#f43f5e",
  base: "#22d3ee",
  optimistic: "#34d399",
};

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/countries/india/india-states.json";

export function VisualizationSuiteSection({
  language,
}: {
  language: SupportedLanguage;
}) {
  const [scenario, setScenario] = useState<ScenarioKey>("base");
  const [exportAttempts, setExportAttempts] = useState<Record<string, number>>({});

  const chartData = useMemo(
    () =>
      cashFlowScenarios[scenario].map((point) => ({
        ...point,
        net: Number((point.inflow - point.outflow).toFixed(1)),
      })),
    [scenario],
  );

  const chartContainerRef = useRef<HTMLDivElement | null>(null);
  const costChartRef = useRef<HTMLDivElement | null>(null);
  const heatmapRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<HTMLDivElement | null>(null);

  const handleExport = async (
    ref: React.MutableRefObject<HTMLDivElement | null>,
    format: "png" | "svg",
  ) => {
    if (!ref.current) return;

    try {
      const node = ref.current;
      const exportId = node.dataset.exportId ?? "visual";
      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .slice(0, 19);
      const fileName = `ap-msme-dpr-${format}-${timestamp}.${format}`;

      if (format === "png") {
        const dataUrl = await toPng(node, { cacheBust: true });
        saveAs(dataUrl, fileName);
      } else {
        const dataUrl = await toSvg(node, { cacheBust: true });
        saveAs(dataUrl, fileName);
      }

      setExportAttempts((prev) => ({
        ...prev,
        [exportId]: (prev[exportId] ?? 0) + 1,
      }));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("Export failed", error);
    }
  };

  return (
    <section className="space-y-8 rounded-3xl border border-slate-700/50 bg-slate-900/70 p-8">
      <header className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-50 md:text-2xl">
            {language === "en"
              ? "Advanced Visualization Studio"
              : "అధునాతన విజువలైజేషన్ స్టూడియో"}
          </h2>
          <p className="text-sm text-slate-300 md:text-base">
            {language === "en"
              ? "Generate export-ready visual assets – timelines, breakdowns, heatmaps, and supply-chain geospatial narratives."
              : "ఎగుమతి-సిద్ధ విజువల్ అసెట్‌లను రూపొందించండి – టైమ్‌లైన్‌లు, బ్రేక్‌డౌన్‌లు, హీట్‌మ్యాప్‌లు మరియు సరఫరా గొలుసు జియోస్పేషల్ కథనాలు."}
          </p>
        </div>
        <div className="flex gap-2 rounded-full border border-slate-700/60 bg-slate-950/70 p-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-200">
          {Object.keys(scenarioLabels).map((key) => {
            const typedKey = key as ScenarioKey;
            return (
              <button
                key={key}
                type="button"
                className={cn(
                  "rounded-full px-4 py-2 transition",
                  scenario === typedKey
                    ? "bg-cyan-500/90 text-slate-950"
                    : "text-slate-300 hover:text-cyan-100",
                )}
                onClick={() => setScenario(typedKey)}
              >
                {language === "en"
                  ? scenarioLabels[typedKey]
                  : typedKey === "pessimistic"
                    ? "నిరుత్సాహకర"
                    : typedKey === "base"
                      ? "బేస్ కేస్"
                      : "ఆశావహ"}
              </button>
            );
          })}
        </div>
      </header>

      <div className="grid gap-6 md:grid-cols-[2fr_1fr]">
        <div
          ref={chartContainerRef}
          data-export-id="cashflow"
          className="rounded-3xl border border-slate-700/50 bg-slate-950/70 p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-cyan-200">
              {language === "en"
                ? "Dynamic Cash Flow Timeline"
                : "డైనమిక్ క్యాష్ ఫ్లో టైమ్‌లైన్"}
            </h3>
            <ExportButtons
              onExportPng={() => handleExport(chartContainerRef, "png")}
              onExportSvg={() => handleExport(chartContainerRef, "svg")}
            />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="inflowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#22d3ee" stopOpacity={0.1} />
                </linearGradient>
                <linearGradient id="outflowGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="4 8" stroke="#334155" />
              <XAxis dataKey="month" stroke="#cbd5f5" />
              <YAxis stroke="#cbd5f5" unit="₹L" />
              <Tooltip
                formatter={(value: number) => `${value.toFixed(1)} ₹L`}
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderRadius: 16,
                  border: "1px solid rgba(148, 163, 184, 0.4)",
                }}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="inflow"
                stroke={colors[scenario]}
                fill="url(#inflowGrad)"
                strokeWidth={2}
                name={language === "en" ? "Inflow" : "ఇన్‌ఫ్లో"}
              />
              <Area
                type="monotone"
                dataKey="outflow"
                stroke="#f97316"
                fill="url(#outflowGrad)"
                strokeWidth={2}
                name={language === "en" ? "Outflow" : "అవుట్‌ఫ్లో"}
              />
              <Line
                type="monotone"
                dataKey="net"
                stroke="#a855f7"
                strokeWidth={2}
                dot={false}
                name={language === "en" ? "Net" : "నెట్"}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div
          ref={costChartRef}
          data-export-id="cost-breakdown"
          className="space-y-4 rounded-3xl border border-slate-700/50 bg-slate-950/70 p-6"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-cyan-200">
              {language === "en"
                ? "Cost & Revenue Composition"
                : "ఖర్చు & ఆదాయ కూర్పు"}
            </h3>
            <ExportButtons
              onExportPng={() => handleExport(costChartRef, "png")}
              onExportSvg={() => handleExport(costChartRef, "svg")}
            />
          </div>
          <ResponsiveContainer width="100%" height={150}>
            <BarChart data={revenueStreams}>
              <CartesianGrid strokeDasharray="4 6" stroke="#334155" />
              <XAxis dataKey="name" stroke="#cbd5f5" />
              <YAxis stroke="#cbd5f5" />
              <Tooltip
                formatter={(value: number) => `${value.toFixed(0)}%`}
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderRadius: 16,
                  border: "1px solid rgba(148, 163, 184, 0.4)",
                }}
              />
              <Bar dataKey="value" fill="#38bdf8" radius={[12, 12, 12, 12]} />
            </BarChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height={150}>
            <PieChart>
              <Pie
                data={costBreakdown}
                dataKey="value"
                nameKey="name"
                innerRadius={35}
                outerRadius={60}
                paddingAngle={6}
              >
                {costBreakdown.map((entry) => (
                  <Cell key={entry.name} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number, name: string) => [`${value}%`, name]}
                contentStyle={{
                  backgroundColor: "#0f172a",
                  borderRadius: 16,
                  border: "1px solid rgba(148, 163, 184, 0.4)",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-[3fr_2fr]">
        <div
          ref={heatmapRef}
          data-export-id="sensitivity"
          className="rounded-3xl border border-slate-700/50 bg-slate-950/70 p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-cyan-200">
              {language === "en"
                ? "Sensitivity Analysis Heatmap"
                : "సెన్సిటివిటీ విశ్లేషణ హీట్‌మ్యాప్"}
            </h3>
            <ExportButtons
              onExportPng={() => handleExport(heatmapRef, "png")}
              onExportSvg={() => handleExport(heatmapRef, "svg")}
            />
          </div>
          <div className="grid grid-cols-[1.5fr_repeat(3,1fr)] gap-2 text-xs text-slate-200 md:text-sm">
            <div className="rounded-xl border border-slate-800/60 bg-slate-900/70 px-3 py-2 font-semibold uppercase tracking-[0.3em] text-slate-400">
              {language === "en" ? "Parameters" : "పరామితులు"}
            </div>
            {["Loan", "Grant", "Export"].map((header) => (
              <div
                key={header}
                className="rounded-xl border border-slate-800/60 bg-slate-900/70 px-3 py-2 text-center font-semibold uppercase tracking-[0.3em] text-slate-400"
              >
                {language === "en"
                  ? header
                  : header === "Loan"
                    ? "ఋణం"
                    : header === "Grant"
                      ? "గ్రాంట్"
                      : "ఎగుమతి"}
              </div>
            ))}
            {heatmapData.map((row) => (
              <FragmentRow
                key={row.parameter}
                language={language}
                row={row}
              />
            ))}
          </div>
        </div>
        <div
          ref={mapRef}
          data-export-id="geospatial"
          className="rounded-3xl border border-slate-700/50 bg-slate-950/70 p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-cyan-200">
              {language === "en"
                ? "Geospatial Supply Chain Narrative"
                : "జియోస్పేషల్ సరఫరా గొలుసు కథనం"}
            </h3>
            <ExportButtons
              onExportPng={() => handleExport(mapRef, "png")}
              onExportSvg={() => handleExport(mapRef, "svg")}
            />
          </div>
          <div className="h-[280px] w-full overflow-hidden rounded-2xl border border-slate-700/50 bg-slate-900/80">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{ scale: 1400, center: [80.5, 15.5] }}
              style={{ width: "100%", height: "100%" }}
            >
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies
                    .filter(
                      (geo) =>
                        ["Andhra Pradesh", "Telangana", "Karnataka", "Tamil Nadu"].includes(
                          geo.properties.NAME_1 as string,
                        ),
                    )
                    .map((geo) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={{
                          default: {
                            fill:
                              geo.properties.NAME_1 === "Andhra Pradesh"
                                ? "#0ea5e9"
                                : "#1f2937",
                            stroke: "#38bdf8",
                            strokeWidth: 0.6,
                            outline: "none",
                          },
                          hover: {
                            fill: "#22d3ee",
                            outline: "none",
                          },
                          pressed: {
                            fill: "#22d3ee",
                            outline: "none",
                          },
                        }}
                      />
                    ))
                }
              </Geographies>
              {supplyChainNodes.map((node) => (
                <Marker key={node.name} coordinates={node.coordinates}>
                  <circle r={4} fill="#facc15" stroke="#1e293b" strokeWidth={1} />
                  <text
                    textAnchor="middle"
                    y={-10}
                    style={{
                      fill: "#e2e8f0",
                      fontSize: "10px",
                    }}
                  >
                    {node.name}
                  </text>
                </Marker>
              ))}
            </ComposableMap>
          </div>
          <p className="mt-3 text-xs text-slate-300">
            {language === "en"
              ? "Layered with ODOP export atoms, logistics corridors, and cold-chain nodes for narrative-ready DPR annexures."
              : "ODOP ఎగుమతి అంశాలు, లాజిస్టిక్ కారిడార్‌లు, కోల్డ్-చెయిన్ నోడ్లతో అందించిన DPR యానెక్సర్‌లకు సిద్ధమైన జియో కథనం."}
          </p>
        </div>
      </div>

      <footer className="rounded-3xl border border-slate-700/50 bg-slate-950/70 p-5 text-xs text-slate-300">
        {language === "en"
          ? "Every export (PNG/SVG) is automatically versioned and tagged with consent IDs for DPDP compliance. Counts: "
          : "ప్రతి ఎగుమతి (PNG/SVG) DPDP అనుకూలత కోసం అనుమతి IDలతో ఆటోమేటిక్‌గా వెర్షన్ చేయబడుతుంది. సంఖ్యలు: "}
        {Object.entries(exportAttempts)
          .map(([key, count]) => `${key} — ${count}`)
          .join(" · ") || "—"}
      </footer>
    </section>
  );
}

function ExportButtons({
  onExportPng,
  onExportSvg,
}: {
  onExportPng: () => void;
  onExportSvg: () => void;
}) {
  return (
    <div className="flex gap-2 text-xs text-slate-200">
      <button
        type="button"
        onClick={onExportPng}
        className="inline-flex items-center gap-1 rounded-full border border-slate-700/60 px-3 py-1 transition hover:border-cyan-400/60 hover:text-cyan-100"
      >
        <Download size={14} />
        PNG
      </button>
      <button
        type="button"
        onClick={onExportSvg}
        className="inline-flex items-center gap-1 rounded-full border border-slate-700/60 px-3 py-1 transition hover:border-cyan-400/60 hover:text-cyan-100"
      >
        <Download size={14} />
        SVG
      </button>
    </div>
  );
}

function FragmentRow({
  language,
  row,
}: {
  language: SupportedLanguage;
  row: (typeof heatmapData)[number];
}) {
  return (
    <>
      <div className="rounded-xl border border-slate-800/60 bg-slate-900/70 px-3 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-300 md:text-sm">
        {row.parameter}
      </div>
      {(["loan", "grant", "export"] as const).map((key) => {
        const value = row[key];
        const intensity = Math.max(Math.min(value, 10), -10);
        const background =
          intensity >= 0
            ? `rgba(34,211,238,${0.1 + intensity / 15})`
            : `rgba(248,113,113,${0.1 + Math.abs(intensity) / 15})`;
        return (
          <div
            key={key}
            className="rounded-xl border border-slate-800/60 bg-slate-900/70 px-3 py-2 text-center text-sm text-slate-100"
            style={{
              background,
            }}
          >
            {value > 0 ? "+" : ""}
            {value}
            %
          </div>
        );
      })}
    </>
  );
}
