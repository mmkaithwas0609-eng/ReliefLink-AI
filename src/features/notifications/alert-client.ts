"use client";

import type { SmsAlertInput } from "@/features/notifications/schema";

export async function sendSmsAlertRequest(input: SmsAlertInput) {
  const response = await fetch("/api/alerts/sms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });

  const data = (await response.json()) as
    | { ok: true; sid: string; status: string }
    | { error?: string };

  if (!response.ok) {
    throw new Error(data.error ?? "Unable to send SMS alert.");
  }

  return data;
}
