"use client";

import { LogOut, Shield, UserCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { roleLabels } from "@/features/auth/constants";
import { useAuth } from "@/hooks/use-auth";
import { useI18n } from "@/providers/i18n-provider";

export function UserMenu() {
  const { t } = useI18n();
  const { profile, logout, isLoading } = useAuth();

  return (
    <div className="panel flex flex-col gap-4 px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-100 text-brand-700">
          <UserCircle2 className="h-6 w-6" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-ink">
            {profile?.displayName ?? "Authenticated user"}
          </h2>
          <p className="text-sm text-slate-600">
            {profile?.email ?? "No email loaded"}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:items-end">
        <div className="inline-flex items-center gap-2 rounded-full bg-surface px-4 py-2 text-sm font-medium text-slate-700">
          <Shield className="h-4 w-4 text-brand-700" />
          {profile ? roleLabels[profile.role] : "Role unavailable"}
        </div>
        <Button
          variant="secondary"
          onClick={() => void logout()}
          disabled={isLoading}
          className="gap-2"
        >
          <LogOut className="h-4 w-4" />
          {t("common", "signOut")}
        </Button>
      </div>
    </div>
  );
}
