import { Activity, Globe2, MessageSquareText, Siren, Target } from "lucide-react";

const stats = [
  {
    label: "Need intake channels",
    value: "Web + SMS",
    icon: MessageSquareText
  },
  {
    label: "AI urgency scoring",
    value: "Gemini",
    icon: Siren
  },
  {
    label: "Volunteer matching",
    value: "Geo-skill fit",
    icon: Target
  },
  {
    label: "Live coordination",
    value: "Maps + alerts",
    icon: Globe2
  },
  {
    label: "Impact analytics",
    value: "Realtime insights",
    icon: Activity
  }
];

export function PlatformStats() {
  return (
    <section
      id="analytics"
      className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5"
    >
      {stats.map(({ label, value, icon: Icon }) => (
        <div key={label} className="panel px-5 py-5">
          <div className="flex items-center justify-between">
            <div className="rounded-2xl bg-accent-100 p-3 text-accent-700 dark:bg-accent-500/15 dark:text-accent-300">
              <Icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 dark:text-slate-500">
              MVP
            </span>
          </div>
          <p className="mt-4 text-lg font-semibold text-ink">{value}</p>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{label}</p>
        </div>
      ))}
    </section>
  );
}
