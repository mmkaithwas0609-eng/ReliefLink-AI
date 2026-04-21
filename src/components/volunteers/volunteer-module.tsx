"use client";

import { useState } from "react";

import { VolunteerProfileForm } from "@/components/volunteers/volunteer-profile-form";
import { VolunteerList } from "@/components/volunteers/volunteer-list";

export function VolunteerModule() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <section className="panel px-6 py-8 sm:px-8">
        <VolunteerProfileForm
          onSaved={() => setRefreshKey((current) => current + 1)}
        />
      </section>

      <section className="panel px-6 py-8 sm:px-8">
        <div className="mb-6">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
            Volunteer roster
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">
            Available responders
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Profiles saved here will power geo-intelligent volunteer matching in
            the next module.
          </p>
        </div>

        <VolunteerList refreshKey={refreshKey} />
      </section>
    </div>
  );
}
