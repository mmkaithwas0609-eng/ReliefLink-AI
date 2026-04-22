"use client";

import type { SmsAlertInput } from "@/features/notifications/schema";

export type SmsAlertResponse =
  | { ok: true; sid: string; status: string }
  | { ok: false; error: string };

function isSmsAlertResponse(value: unknown): value is SmsAlertResponse {
  if (!value || typeof value !== "object") return false;
  if (!("ok" in value)) return false;
  const ok = (value as { ok?: unknown }).ok;
  return typeof ok === "boolean";
}

export async function sendSmsAlertRequest(
  input: SmsAlertInput
): Promise<{ ok: true; sid: string; status: string }> {
  const response = await fetch("/api/alerts/sms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });

  const json = (await response.json().catch(() => null)) as unknown;
  const data: SmsAlertResponse = isSmsAlertResponse(json)
    ? json
    : { ok: false, error: "Unable to send SMS alert." };

  if (!response.ok || !data.ok) {
    throw new Error(data.ok ? "Unable to send SMS alert." : data.error);
  }

  return data;
}
