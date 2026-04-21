"use client";

import { useEffect, useState } from "react";

import { MatchCard } from "@/components/matching/match-card";
import { getMatchRecommendations } from "@/features/matching/matching-service";
import type { VolunteerMatch } from "@/features/matching/score";
import type { NeedRecord } from "@/types/firestore";

type MatchRecommendation = {
  need: NeedRecord;
  matches: VolunteerMatch[];
};

export function MatchingPanel() {
  const [recommendations, setRecommendations] = useState<MatchRecommendation[]>(
    []
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadRecommendations() {
      try {
        setIsLoading(true);
        setError(null);
        const items = await getMatchRecommendations();
        setRecommendations(items);
      } catch (nextError) {
        setError(
          nextError instanceof Error
            ? nextError.message
            : "Unable to load volunteer matches."
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadRecommendations();
  }, []);

  if (isLoading) {
    return (
      <section className="panel px-6 py-8 sm:px-8">
        <p className="text-sm text-slate-600">Loading volunteer matches...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="panel px-6 py-8 sm:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      </section>
    );
  }

  return (
    <section className="panel px-6 py-8 sm:px-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
          Matching algorithm
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-ink">
          Ranked volunteer recommendations
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Each need is matched against the current volunteer roster using skill overlap,
          distance, language fit, status, and travel radius.
        </p>
      </div>

      <div className="space-y-5">
        {recommendations.length === 0 ? (
          <div className="rounded-2xl bg-surface px-4 py-4 text-sm text-slate-600">
            Add needs and volunteer profiles to generate match recommendations.
          </div>
        ) : (
          recommendations.map((recommendation) => (
            <MatchCard
              key={recommendation.need.id}
              need={recommendation.need}
              matches={recommendation.matches}
            />
          ))
        )}
      </div>
    </section>
  );
}
