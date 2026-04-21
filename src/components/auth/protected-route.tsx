"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";

type ProtectedRouteProps = Readonly<{
  children: React.ReactNode;
}>;

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isLoading, pathname, router, user]);

  if (isLoading) {
    return (
      <div className="page-shell justify-center">
        <div className="panel px-6 py-10 text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
            Loading session
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-ink">
            Checking authentication state
          </h1>
          <p className="mt-3 text-slate-600">
            ReliefLink AI is verifying your Firebase session.
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
