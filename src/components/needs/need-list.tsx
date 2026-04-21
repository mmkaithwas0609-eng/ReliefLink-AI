"use client";

import { useEffect, useState } from "react";

import { NeedCard } from "@/components/needs/need-card";
import { listNeeds } from "@/features/needs/need-service";
import type { NeedRecord } from "@/types/firestore";

export function NeedList() {
  const [needs, setNeeds] = useState<NeedRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function refreshNeeds() {
    try {
      setError(null);
      setIsLoading(true);
      const items = await listNeeds();
      setNeeds(items);
    } catch (nextError) {
      setError(
        nextError instanceof Error
          ? nextError.message
          : "Unable to load needs."
      );
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    void refreshNeeds();
  }, []);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white px-5 py-10 text-center text-sm text-slate-600">
        Loading submitted needs...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (needs.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white px-5 py-10 text-center">
        <h3 className="text-lg font-semibold text-ink">No needs submitted yet</h3>
        <p className="mt-2 text-sm text-slate-600">
          The first community request submitted from this module will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {needs.map((need) => (
        <NeedCard key={need.id} need={need} />
      ))}
    </div>
  );
}
