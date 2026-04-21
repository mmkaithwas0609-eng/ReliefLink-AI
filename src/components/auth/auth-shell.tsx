import Link from "next/link";
import { HeartHandshake, ShieldCheck } from "lucide-react";

type AuthShellProps = Readonly<{
  title: string;
  description: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}>;

export function AuthShell({
  title,
  description,
  children,
  footer
}: AuthShellProps) {
  return (
    <div className="page-shell justify-center">
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <section className="panel overflow-hidden px-6 py-8 sm:px-8">
          <Link href="/" className="inline-flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-600 text-white">
              <HeartHandshake className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
                ReliefLink AI
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                Trusted coordination for urgent community response
              </p>
            </div>
          </Link>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
              Access control
            </p>
            <h1 className="mt-3 text-4xl font-semibold leading-tight text-ink">
              {title}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              {description}
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-surface p-5 dark:border-slate-700 dark:bg-slate-900/80">
              <ShieldCheck className="h-5 w-5 text-brand-700" />
              <h3 className="mt-4 text-lg font-semibold text-ink">
                Role-based access
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Separate workflows for admins, coordinators, and volunteers.
              </p>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-surface p-5 dark:border-slate-700 dark:bg-slate-900/80">
              <HeartHandshake className="h-5 w-5 text-accent-700" />
              <h3 className="mt-4 text-lg font-semibold text-ink">
                Profile-backed sessions
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                Firebase Auth with Firestore user profiles for app context.
              </p>
            </div>
          </div>
        </section>

        <section className="panel px-6 py-8 sm:px-8">
          {children}
          <div className="mt-6 border-t border-slate-200 pt-5 dark:border-slate-700">
            {footer}
          </div>
        </section>
      </div>
    </div>
  );
}
