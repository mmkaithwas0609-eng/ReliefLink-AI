"use client";

import { useEffect, useState } from "react";
import { MapPinned, Route, Users } from "lucide-react";

import { ReliefMap } from "@/components/maps/relief-map";
import { getMapDataset } from "@/features/maps/map-service";
import type { MapDataset } from "@/features/maps/map-types";
import { hasGoogleMapsClientConfig } from "@/lib/config/env";

export function MapPanel() {
  const [dataset, setDataset] = useState<MapDataset | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDataset() {
      try {
        setError(null);
        setIsLoading(true);
        const data = await getMapDataset();
        setDataset(data);
      } catch (nextError) {
        setError(
          nextError instanceof Error
            ? nextError.message
            : "Unable to load map data."
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadDataset();
  }, []);

  return (
    <section className="panel px-6 py-8 sm:px-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
            Live coordination map
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">
            Visualize needs, volunteers, and best-response routes
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
            The map overlays urgent needs, volunteer locations, and the top
            recommendation line for each need to help coordinators make faster dispatch decisions.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-surface px-4 py-3 text-sm text-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
            <div className="inline-flex items-center gap-2 font-semibold text-ink">
              <MapPinned className="h-4 w-4 text-brand-700" />
              Needs
            </div>
            <p className="mt-1">{dataset?.needs.length ?? 0} mapped</p>
          </div>
          <div className="rounded-2xl bg-surface px-4 py-3 text-sm text-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
            <div className="inline-flex items-center gap-2 font-semibold text-ink">
              <Users className="h-4 w-4 text-brand-700" />
              Volunteers
            </div>
            <p className="mt-1">{dataset?.volunteers.length ?? 0} mapped</p>
          </div>
          <div className="rounded-2xl bg-surface px-4 py-3 text-sm text-slate-700 dark:bg-slate-900/80 dark:text-slate-200">
            <div className="inline-flex items-center gap-2 font-semibold text-ink">
              <Route className="h-4 w-4 text-brand-700" />
              Maps status
            </div>
            <p className="mt-1">
              {hasGoogleMapsClientConfig() ? "Configured" : "Pending"}
            </p>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-10 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          Loading map data...
        </div>
      ) : error ? (
        <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-5 text-sm text-red-700 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
          {error}
        </div>
      ) : dataset ? (
        <ReliefMap dataset={dataset} />
      ) : (
        <div className="rounded-3xl border border-slate-200 bg-white px-5 py-10 text-center text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          No map data available yet.
        </div>
      )}
    </section>
  );
}
