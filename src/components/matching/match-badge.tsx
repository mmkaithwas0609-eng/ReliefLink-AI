import { cn } from "@/lib/utils/cn";

type MatchBadgeProps = {
  tone?: "good" | "warn" | "neutral";
  children: React.ReactNode;
};

export function MatchBadge({
  tone = "neutral",
  children
}: MatchBadgeProps) {
  return (
    <span
      className={cn(
        "rounded-full px-3 py-1 text-xs font-semibold",
        tone === "good" &&
          "bg-brand-100 text-brand-800 dark:bg-brand-500/15 dark:text-brand-200",
        tone === "warn" &&
          "bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300",
        tone === "neutral" &&
          "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
      )}
    >
      {children}
    </span>
  );
}
