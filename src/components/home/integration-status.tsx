import { CheckCircle2, Database, ServerCog } from "lucide-react";

import {
  hasClientFirebaseConfig,
  hasServerFirebaseConfig
} from "@/lib/config/env";

const checks = [
  {
    label: "Client SDK",
    description: "Browser authentication and Firestore access",
    ready: hasClientFirebaseConfig(),
    icon: Database
  },
  {
    label: "Admin SDK",
    description: "Secure server-side Firestore and Auth operations",
    ready: hasServerFirebaseConfig(),
    icon: ServerCog
  }
];

export function IntegrationStatus() {
  return (
    <section className="panel px-6 py-6 sm:px-8">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
          Backend readiness
        </p>
        <h2 className="section-title">Firebase integration status</h2>
        <p className="text-slate-600">
          This module wires the application to Firebase on both the client and
          server, so upcoming auth and data features share one typed foundation.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {checks.map(({ label, description, ready, icon: Icon }) => (
          <div
            key={label}
            className="rounded-3xl border border-slate-200 bg-surface p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="rounded-2xl bg-white p-3 text-brand-700">
                <Icon className="h-5 w-5" />
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  ready
                    ? "bg-brand-100 text-brand-800"
                    : "bg-accent-100 text-accent-800"
                }`}
              >
                {ready ? "Configured" : "Pending"}
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-ink">{label}</h3>
            <p className="mt-2 text-sm text-slate-600">{description}</p>
            <div className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-slate-700">
              <CheckCircle2 className="h-4 w-4 text-brand-700" />
              {ready ? "Environment values detected" : "Add credentials to .env.local"}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
