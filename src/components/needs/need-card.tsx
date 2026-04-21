import { MapPin, Phone, Siren, UserRound } from "lucide-react";

import type { NeedRecord } from "@/types/firestore";

const priorityBadgeStyles = {
  low: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200",
  medium: "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
  high: "bg-orange-100 text-orange-800 dark:bg-orange-500/15 dark:text-orange-300",
  critical: "bg-red-100 text-red-800 dark:bg-red-500/15 dark:text-red-300"
};

type NeedCardProps = {
  need: NeedRecord;
};

export function NeedCard({ need }: NeedCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900/90">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-ink">{need.title}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {need.category} | {need.status.replace("_", " ")}
          </p>
        </div>
        <div
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            priorityBadgeStyles[need.priority]
          }`}
        >
          {need.priority.toUpperCase()}
        </div>
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
        {need.description}
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {need.requiredSkills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800 dark:bg-brand-500/15 dark:text-brand-200"
          >
            {skill}
          </span>
        ))}
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <UserRound className="h-4 w-4 text-brand-700" />
          {need.requesterName}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-brand-700" />
          {need.requesterPhone}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-brand-700" />
          {need.address}
        </div>
        <div className="flex items-center gap-2">
          <Siren className="h-4 w-4 text-brand-700" />
          Score {need.urgencyScore}/100
        </div>
      </div>

      <div className="mt-3">
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">
          Scored by {need.scoringSource === "gemini" ? "Gemini AI" : "fallback rules"}
        </span>
      </div>

      <div className="mt-4 rounded-2xl bg-surface px-4 py-3 text-sm text-slate-700 dark:bg-slate-800/80 dark:text-slate-200">
        <span className="font-semibold text-slate-900 dark:text-slate-100">Urgency reason:</span>{" "}
        {need.urgencyReason}
      </div>
    </article>
  );
}
