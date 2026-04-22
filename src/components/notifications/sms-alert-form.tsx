"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";
import { sendSmsAlertRequest } from "@/features/notifications/alert-client";
import type { SmsAlertInput } from "@/features/notifications/schema";
import { smsAlertSchema } from "@/features/notifications/schema";
import { useAuth } from "@/hooks/use-auth";

export function SmsAlertForm() {
  const { user } = useAuth();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<SmsAlertInput>({
    defaultValues: {
      to: "",
      message:
        "ReliefLink AI alert: A new urgent case needs attention. Please open the coordinator dashboard for details."
    }
  });

  async function onSubmit(values: SmsAlertInput) {
    const parsed = smsAlertSchema.safeParse(values);

    if (!parsed.success) {
      setSubmitError(parsed.error.issues[0]?.message ?? "Invalid SMS payload.");
      return;
    }

    try {
      setSubmitError(null);
      setSubmitSuccess(null);

      const response = await sendSmsAlertRequest({
        ...parsed.data,
        userId: user?.uid
      });

      setSubmitSuccess(`SMS sent successfully. SID: ${response.sid}`);

      reset({
        to: "",
        message:
          "ReliefLink AI alert: A new urgent case needs attention. Please open the coordinator dashboard for details."
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Failed to send SMS alert."
      );
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <h2 className="text-2xl font-semibold text-ink">Send SMS alert</h2>
        <p className="mt-2 text-sm text-slate-600">
          Trigger coordinator or volunteer notifications through Twilio for demo
          and escalation flows.
        </p>
      </div>

      <FormField label="Recipient phone" error={errors.to?.message}>
        <Input
          placeholder="+91 9876543210"
          {...register("to", { required: true })}
        />
      </FormField>

      <FormField label="Message" error={errors.message?.message}>
        <textarea
          className="min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-brand-400 focus:ring-4 focus:ring-brand-100"
          placeholder="Enter the alert message"
          {...register("message", { required: true })}
        />
      </FormField>

      {submitError ? (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {submitError}
        </div>
      ) : null}

      {submitSuccess ? (
        <div className="rounded-2xl border border-brand-200 bg-brand-50 px-4 py-3 text-sm text-brand-800">
          {submitSuccess}
        </div>
      ) : null}

      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? "Sending alert..." : "Send SMS alert"}
      </Button>
    </form>
  );
}
