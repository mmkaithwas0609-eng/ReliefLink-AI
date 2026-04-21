import { NextResponse } from "next/server";

import {
  hasClientFirebaseConfig,
  hasServerFirebaseConfig
} from "@/lib/config/env";

export async function GET() {
  return NextResponse.json({
    ok: true,
    firebase: {
      clientConfigured: hasClientFirebaseConfig(),
      adminConfigured: hasServerFirebaseConfig()
    }
  });
}
