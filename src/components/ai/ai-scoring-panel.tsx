import { BrainCircuit, Sparkles, TriangleAlert } from "lucide-react";

import { hasGeminiConfig } from "@/lib/config/env";

export function AiScoringPanel() {
  return (
    <section className="panel px-6 py-6 sm:px-8">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
            AI urgency scoring
          </p>
          <h2 className="section-title mt-2">
            Needs are now triaged through Gemini on the server
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600 dark:text-slate-300">
            Each submitted need is analyzed for severity, time sensitivity,
            vulnerable groups, and response complexity. If Gemini is not configured,
            the app falls back to deterministic scoring rules so intake never breaks.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="rounded-3xl border border-slate-200 bg-white dark:bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <BrainCircuit className="h-5 w-5 text-brand-700" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Server-side AI</h3>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Gemini API keys stay private inside the Next.js API route.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white dark:bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-accent-700" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Explainable output</h3>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Every score includes a priority and a concise urgency explanation.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white dark:bg-slate-900 p-5">
            <div className="flex items-center gap-3">
              <TriangleAlert className="h-5 w-5 text-brand-700" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                {hasGeminiConfig() ? "Gemini configured" : "Fallback active"}
              </h3>
            </div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              {hasGeminiConfig()
                ? "Live AI scoring is enabled through the Gemini API."
                : "Add GEMINI_API_KEY to enable live AI scoring."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
