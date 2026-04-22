"use client";

import { useEffect, useState } from "react";
import { BellRing, MessageSquareWarning, Smartphone } from "lucide-react";

import { SmsAlertForm } from "@/components/notifications/sms-alert-form";
type TwilioResponse =
  | { ok: true; twilioConfigured: boolean }
  | { ok: false; error: string };
export function SmsPanel() {
  const [twilioConfigured, setTwilioConfigured] = useState<boolean | null>(null);
  const [configError, setConfigError] = useState<string | null>(null);

  useEffect(() => {
    async function loadStatus() {
      try {
        setConfigError(null);
        const response = await fetch("/api/integrations/status", {
          cache: "no-store"
        });

        const data = (await response.json()) as TwilioResponse;

        if (!data.ok) {
  throw new Error(data.error);
}

setTwilioConfigured(data.twilioConfigured);
      } catch (error) {
        setConfigError(
          error instanceof Error
            ? error.message
            : "Unable to check Twilio configuration."
        );
        setTwilioConfigured(false);
      }
    }

    void loadStatus();
  }, []);

  return (
    <section className="panel px-6 py-8 sm:px-8">
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-brand-700">
            SMS alerts
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-ink">
            Notify responders through Twilio
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            This module sends operational alerts from the server and stores alert
            records for later audit and analytics work.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl bg-surface px-4 py-3 text-sm text-slate-700">
            <div className="inline-flex items-center gap-2 font-semibold text-ink">
              <Smartphone className="h-4 w-4 text-brand-700" />
              Channel
            </div>
            <p className="mt-1">Twilio SMS</p>
          </div>
          <div className="rounded-2xl bg-surface px-4 py-3 text-sm text-slate-700">
            <div className="inline-flex items-center gap-2 font-semibold text-ink">
              <BellRing className="h-4 w-4 text-brand-700" />
              Status
            </div>
            <p className="mt-1">
              {twilioConfigured === null
                ? "Checking..."
                : twilioConfigured
                  ? "Configured"
                  : "Pending"}
            </p>
          </div>
          <div className="rounded-2xl bg-surface px-4 py-3 text-sm text-slate-700">
            <div className="inline-flex items-center gap-2 font-semibold text-ink">
              <MessageSquareWarning className="h-4 w-4 text-brand-700" />
              Trigger mode
            </div>
            <p className="mt-1">Manual demo + future automation</p>
          </div>
        </div>
      </div>

      {configError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-5 text-sm text-red-700">
          {configError}
        </div>
      ) : twilioConfigured === null ? (
        <div className="rounded-2xl border border-slate-200 bg-white px-5 py-5 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
          Checking Twilio configuration...
        </div>
      ) : !twilioConfigured ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-5 text-sm text-amber-800">
          Add `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, and `TWILIO_PHONE_NUMBER`
          to enable live SMS alerts.
        </div>
      ) : (
        <SmsAlertForm />
      )}
    </section>
  );
}
