import { Languages, MapPin, MoveRight, Phone, UserRound } from "lucide-react";

import type { VolunteerRecord } from "@/types/firestore";

const statusStyles: Record<VolunteerRecord["status"], string> = {
  available: "bg-brand-100 text-brand-800",
  assigned: "bg-amber-100 text-amber-800",
  offline: "bg-slate-200 text-slate-700"
};

type VolunteerCardProps = {
  volunteer: VolunteerRecord;
};

export function VolunteerCard({ volunteer }: VolunteerCardProps) {
  return (
    <article className="rounded-3xl border border-slate-200 bg-white p-5 dark:bg-slate-900 dark:border-slate-700">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{volunteer.fullName}</h3>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{volunteer.availabilityNote}</p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            statusStyles[volunteer.status]
          }`}
        >
          {volunteer.status.toUpperCase()}
        </span>
      </div>

      <div className="mt-5 grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <UserRound className="h-4 w-4 text-brand-700" />
          {volunteer.fullName}
        </div>
        <div className="flex items-center gap-2">
          <Phone className="h-4 w-4 text-brand-700" />
          {volunteer.phoneNumber}
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-brand-700" />
          {volunteer.address}
        </div>
        <div className="flex items-center gap-2">
          <MoveRight className="h-4 w-4 text-brand-700" />
          Radius {volunteer.maxTravelDistanceKm} km
        </div>
      </div>

      <div className="mt-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          Skills
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {volunteer.skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full bg-brand-50 px-3 py-1 text-xs font-medium text-brand-800"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
          <Languages className="h-4 w-4" />
          Languages
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {volunteer.languages.map((language) => (
            <span
              key={language}
              className="rounded-full bg-accent-50 px-3 py-1 text-xs font-medium text-accent-800"
            >
              {language}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
