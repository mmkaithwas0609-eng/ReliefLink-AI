import twilio from "twilio";

import type { SmsAlertInput } from "@/features/notifications/schema";
import { hasTwilioConfig } from "@/lib/config/env";

export async function sendSmsAlert(input: SmsAlertInput) {
  if (!hasTwilioConfig()) {
    throw new Error(
      "Twilio is not configured. Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER."
    );
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
  );

  const response = await client.messages.create({
    to: input.to,
    from: process.env.TWILIO_PHONE_NUMBER!,
    body: input.message
  });

  return {
    sid: response.sid,
    status: response.status,
    to: response.to,
    from: response.from,
    body: response.body
  };
}
