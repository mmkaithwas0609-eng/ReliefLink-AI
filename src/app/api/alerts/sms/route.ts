import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";

import { smsAlertSchema } from "@/features/notifications/schema";
import { sendSmsAlert } from "@/features/notifications/twilio-service";
import { firebaseCollections } from "@/lib/firebase/collections";
import { hasServerFirebaseConfig, hasTwilioConfig } from "@/lib/config/env";
import { getAdminDb } from "@/lib/firebase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = smsAlertSchema.parse(body);

    if (!hasTwilioConfig()) {
      return NextResponse.json(
        {
          ok: false,
          error:
            "Twilio is not configured. Add TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, and TWILIO_PHONE_NUMBER."
        },
        { status: 400 }
      );
    }

    const result = await sendSmsAlert(input);

    if (hasServerFirebaseConfig()) {
      await getAdminDb().collection(firebaseCollections.alerts).add({
        id: result.sid,
        userId: input.userId ?? "",
        needId: input.needId ?? "",
        channel: "sms",
        to: input.to,
        message: input.message,
        status: result.status ?? "sent",
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp()
      });
    }

    return NextResponse.json({
      ok: true,
      sid: result.sid,
      status: result.status ?? "sent"
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Unable to send SMS alert." },
      { status: 500 }
    );
  }
}
