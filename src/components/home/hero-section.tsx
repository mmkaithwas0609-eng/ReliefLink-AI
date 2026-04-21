"use client";

import { ArrowRight, ShieldCheck, Sparkles, Users } from "lucide-react";

import { dashboardHighlights } from "@/lib/constants/dashboard";
import { useI18n } from "@/providers/i18n-provider";

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section
      id="overview"
      className="panel overflow-hidden px-6 py-8 sm:px-8 sm:py-10"
    >
      <div className="grid gap-8 lg:grid-cols-[1.25fr_0.9fr] lg:items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-medium text-brand-800">
            <Sparkles className="h-4 w-4" />
            {t("hero", "badge")}
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">
            {t("hero", "title")}
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
            {t("hero", "description")}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <div className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white">
              {t("hero", "primaryCta")}
              <ArrowRight className="h-4 w-4" />
            </div>
            <div className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700">
              <ShieldCheck className="h-4 w-4 text-brand-700" />
              {t("hero", "secondaryCta")}
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 scale-110 rounded-[2rem] bg-hero-grid bg-[size:28px_28px] opacity-40" />
          <div className="panel-muted relative grid gap-4 p-5">
            {dashboardHighlights.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white bg-white p-4 shadow-sm"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-slate-500">{item.title}</p>
                    <p className="mt-1 text-2xl font-semibold text-ink">
                      {item.value}
                    </p>
                  </div>
                  <div className="rounded-2xl bg-brand-50 p-3 text-brand-700">
                    <Users className="h-5 w-5" />
                  </div>
                </div>
                <p className="mt-3 text-sm text-slate-600">{item.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
