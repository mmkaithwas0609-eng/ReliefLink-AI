"use client";

import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell
} from "recharts";

import { MetricCard } from "@/components/analytics/metric-card";
import { getAnalyticsSnapshot } from "@/features/analytics/analytics-service";

type AnalyticsSnapshot = Awaited<ReturnType<typeof getAnalyticsSnapshot>>;

const priorityColors: Record<string, string> = {
  low: "#94a3b8",
  medium: "#f59e0b",
  high: "#f97316",
  critical: "#dc2626"
};

const volunteerStatusColors: Record<string, string> = {
  available: "#14b8a6",
  assigned: "#f59e0b",
  offline: "#64748b"
};

export function AnalyticsPanel() {
  const [snapshot, setSnapshot] = useState<AnalyticsSnapshot | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSnapshot() {
      try {
        setError(null);
        setIsLoading(true);
        const data = await getAnalyticsSnapshot();
        setSnapshot(data);
      } catch (nextError) {
        setError(
          nextError instanceof Error
            ? nextError.message
            : "Unable to load analytics."
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadSnapshot();
  }, []);

  if (isLoading) {
    return (
      <section className="panel px-6 py-8 sm:px-8">
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Loading analytics...
        </p>
      </section>
    );
  }

  if (error || !snapshot) {
    return (
      <section className="panel px-6 py-8 sm:px-8">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error ?? "Analytics data is unavailable."}
        </div>
      </section>
    );
  }

  return (
    <section className="panel px-6 py-8 sm:px-8">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
          Impact analytics
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Real-time operational metrics
        </h2>
        <p className="mt-2 max-w-3xl text-sm text-slate-600 dark:text-slate-300">
          These analytics summarize intake pressure, response capacity, language
          coverage, and notification activity from the live platform data.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Total needs"
          value={snapshot.totalNeeds}
          description="All submitted community requests currently stored."
          tone="brand"
        />
        <MetricCard
          label="Critical needs"
          value={snapshot.criticalNeeds}
          description="High-severity requests that need immediate action."
          tone="accent"
        />
        <MetricCard
          label="Available volunteers"
          value={snapshot.availableVolunteers}
          description={`${snapshot.totalVolunteers} volunteer profiles in the roster.`}
        />
        <MetricCard
          label="SMS delivery"
          value={`${snapshot.successfulSmsAlerts}/${snapshot.totalSmsAlerts}`}
          description="Successful SMS alerts out of all SMS logs."
        />
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900/90">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Needs by priority
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Average urgency score: {snapshot.averageUrgencyScore}/100
          </p>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={snapshot.needsByPriority}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="priority" stroke="#64748b" />
                <YAxis stroke="#64748b" allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" radius={[12, 12, 0, 0]}>
                  {snapshot.needsByPriority.map((item) => (
                    <Cell
                      key={item.priority}
                      fill={priorityColors[item.priority] ?? "#64748b"}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900/90">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Volunteer status mix
          </h3>
          <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
            Understand current responder capacity at a glance.
          </p>
          <div className="mt-6 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={snapshot.volunteersByStatus}
                  dataKey="count"
                  nameKey="status"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={4}
                >
                  {snapshot.volunteersByStatus.map((item) => (
                    <Cell
                      key={item.status}
                      fill={volunteerStatusColors[item.status] ?? "#64748b"}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900/90">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Top need languages
        </h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
          Useful for multilingual coordination and volunteer coverage planning.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {snapshot.topNeedLanguages.length === 0 ? (
            <div className="rounded-2xl bg-surface px-4 py-4 text-sm text-slate-600 dark:bg-slate-800/80 dark:text-slate-300">
              No language data available yet.
            </div>
          ) : (
            snapshot.topNeedLanguages.map((item) => (
              <div
                key={item.language}
                className="rounded-2xl bg-surface px-4 py-4 text-center dark:bg-slate-800/80"
              >
                <p className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  {item.language}
                </p>
                <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-slate-100">
                  {item.count}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
