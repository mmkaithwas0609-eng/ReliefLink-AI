"use client";

import Link from "next/link";
import { ArrowRight, LockKeyhole, UserPlus } from "lucide-react";

import { useI18n } from "@/providers/i18n-provider";

export function AuthCta() {
  const { t } = useI18n();

  return (
    <section className="panel px-6 py-6 sm:px-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
            Authentication module
          </p>
          <h2 className="section-title mt-2">
            Secure sign in for admins, coordinators, and volunteers
          </h2>
          <p className="mt-3 max-w-2xl text-slate-600">
            The platform now includes Firebase email/password authentication,
            Firestore-backed user profiles, and protected dashboard access by role.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <Link
            href="/login"
            className="rounded-3xl border border-slate-200 bg-white px-5 py-5 transition hover:border-brand-200 hover:bg-brand-50"
          >
            <LockKeyhole className="h-5 w-5 text-brand-700" />
            <h3 className="mt-4 text-lg font-semibold text-ink">
              {t("common", "signIn")}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Access the live coordination dashboard.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
              Open login
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>

          <Link
            href="/register"
            className="rounded-3xl border border-slate-200 bg-surface px-5 py-5 transition hover:border-accent-200 hover:bg-accent-50"
          >
            <UserPlus className="h-5 w-5 text-accent-700" />
            <h3 className="mt-4 text-lg font-semibold text-ink">
              {t("common", "createAccount")}
            </h3>
            <p className="mt-2 text-sm text-slate-600">
              Register a new volunteer, coordinator, or admin user.
            </p>
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent-700">
              Open registration
              <ArrowRight className="h-4 w-4" />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
