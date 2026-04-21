import { MapPin, ShieldCheck, Sparkles, UserRound } from "lucide-react";

import { MatchBadge } from "@/components/matching/match-badge";
import type { VolunteerMatch } from "@/features/matching/score";
import type { NeedRecord } from "@/types/firestore";

type MatchCardProps = {
  need: NeedRecord;
  matches: VolunteerMatch[];
};

export function MatchCard({ need, matches }: MatchCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900/90">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
            Need match suggestions
          </p>
          <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-slate-100">
            {need.title}
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            {need.category} | {need.priority.toUpperCase()} | {need.language}
          </p>
        </div>
        <MatchBadge tone={need.priority === "critical" ? "warn" : "good"}>
          Score {need.urgencyScore}/100
        </MatchBadge>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {need.requiredSkills.map((skill) => (
          <MatchBadge key={skill}>{skill}</MatchBadge>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {matches.length === 0 ? (
          <div className="rounded-2xl bg-surface px-4 py-4 text-sm text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
            No volunteer recommendations yet. Add volunteer profiles to see ranked matches.
          </div>
        ) : (
          matches.map((match, index) => (
            <div
              key={`${need.id}-${match.volunteer.id}`}
              className="rounded-2xl border border-slate-200 bg-surface p-4 dark:border-slate-700 dark:bg-slate-800/80"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
                    Recommendation {index + 1}
                  </p>
                  <h4 className="mt-1 inline-flex items-center gap-2 text-lg font-semibold text-slate-900 dark:text-slate-100">
                    <UserRound className="h-4 w-4 text-brand-700" />
                    {match.volunteer.fullName}
                  </h4>
                </div>
                <MatchBadge tone={match.score >= 70 ? "good" : "warn"}>
                  Match {match.score}/100
                </MatchBadge>
              </div>

              <div className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-3">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-brand-700" />
                  {match.distanceKm.toFixed(1)} km away
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-brand-700" />
                  {match.volunteer.status}
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-brand-700" />
                  {match.skillOverlap.length} skill match
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {match.reasons.map((reason) => (
                  <MatchBadge
                    key={reason}
                    tone={
                      reason.includes("mismatch") || reason.includes("outside")
                        ? "warn"
                        : "neutral"
                    }
                  >
                    {reason}
                  </MatchBadge>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </article>
  );
}
