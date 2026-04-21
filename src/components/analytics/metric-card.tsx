import { cn } from "@/lib/utils/cn";

type MetricCardProps = {
  label: string;
  value: string | number;
  description: string;
  tone?: "brand" | "accent" | "neutral";
};

export function MetricCard({
  label,
  value,
  description,
  tone = "neutral"
}: MetricCardProps) {
  return (
    <article
      className={cn(
        "rounded-3xl border p-5",
        tone === "brand" &&
          "border-brand-200 bg-brand-50 dark:border-brand-500/30 dark:bg-brand-500/10",
        tone === "accent" &&
          "border-accent-200 bg-accent-50 dark:border-accent-500/30 dark:bg-accent-500/10",
        tone === "neutral" &&
          "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900/90"
      )}
    >
      <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
        {label}
      </p>
      <h3 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-100">
        {value}
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
        {description}
      </p>
    </article>
  );
}
