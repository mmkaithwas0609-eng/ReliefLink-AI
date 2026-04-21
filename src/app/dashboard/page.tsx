"use client";

import { AiScoringPanel } from "@/components/ai/ai-scoring-panel";
import { AnalyticsPanel } from "@/components/analytics/analytics-panel";
import { ProtectedRoute } from "@/components/auth/protected-route";
import { UserMenu } from "@/components/auth/user-menu";
import { AppShell } from "@/components/layout/app-shell";
import { MapPanel } from "@/components/maps/map-panel";
import { MatchingPanel } from "@/components/matching/matching-panel";
import { NeedModule } from "@/components/needs/need-module";
import { SmsPanel } from "@/components/notifications/sms-panel";
import { VolunteerModule } from "@/components/volunteers/volunteer-module";
import { useI18n } from "@/providers/i18n-provider";

const dashboardCards = [
  {
    title: "Authenticated session",
    description:
      "Firebase Auth is active, so upcoming feature modules can rely on a real user session."
  },
  {
    title: "Profile-linked access",
    description:
      "User role, phone number, and preferred language are loaded from Firestore."
  },
  {
    title: "Need intake ready",
    description:
      "Coordinators can submit structured needs that are stored in Firestore with urgency metadata."
  },
  {
    title: "Volunteer roster ready",
    description:
      "Responders can now store skills, availability, languages, and service radius for operational planning."
  },
  {
    title: "AI triage ready",
    description:
      "Submitted needs can now be scored by Gemini with a server-side fallback when AI is unavailable."
  },
  {
    title: "Matching ready",
    description:
      "The dashboard now ranks volunteers for each need using skills, distance, language, and availability."
  },
  {
    title: "Map ready",
    description:
      "Needs, volunteers, and top recommendation routes can now be visualized on Google Maps."
  },
  {
    title: "SMS ready",
    description:
      "Coordinators can now trigger Twilio-based alerts from the dashboard."
  },
  {
    title: "Analytics ready",
    description:
      "Live dashboard metrics now summarize needs, volunteer capacity, languages, and SMS activity."
  }
];

export default function DashboardPage() {
  const { t } = useI18n();

  return (
    <ProtectedRoute>
      <AppShell>
        <div className="space-y-6">
          <UserMenu />

          <section className="panel px-6 py-8 sm:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
              Operations dashboard
            </p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">
              {t("dashboard", "title")}
            </h1>
            <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">
              {t("dashboard", "description")}
            </p>

            <div className="mt-8 grid gap-4 lg:grid-cols-9">
              {dashboardCards.map((card) => (
                <article
                  key={card.title}
                  className="rounded-3xl border border-slate-200 bg-surface p-5 dark:bg-slate-900"
                >
                  <h2 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
                    {card.title}
                  </h2>
                  <p className="mt-3 max-w-3xl text-slate-600 dark:text-slate-300">
                    {card.description}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <AiScoringPanel />
          <NeedModule />
          <VolunteerModule />
          <MatchingPanel />
          <MapPanel />
          <SmsPanel />
          <AnalyticsPanel />
        </div>
      </AppShell>
    </ProtectedRoute>
  );
}
