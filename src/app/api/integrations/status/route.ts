import { NextResponse } from "next/server";

import { hasTwilioConfig } from "@/lib/config/env";

export async function GET() {
  return NextResponse.json({
    twilioConfigured: hasTwilioConfig(),
    checkedAt: new Date().toISOString()
  });
}
