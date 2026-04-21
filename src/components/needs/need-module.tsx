"use client";

import { useState } from "react";

import { NeedForm } from "@/components/needs/need-form";
import { NeedList } from "@/components/needs/need-list";

export function NeedModule() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="panel px-6 py-8 sm:px-8">
        <NeedForm onCreated={() => setRefreshKey((value) => value + 1)} />
      </section>

      <section className="panel px-6 py-8 sm:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
            Incoming requests
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">
            Community needs queue
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Needs are ordered by urgency score so coordinators can triage faster.
          </p>
        </div>

        <NeedList key={refreshKey} />
      </section>
    </div>
  );
}
