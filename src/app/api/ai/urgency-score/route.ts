import { NextResponse } from "next/server";

import { geminiUrgencySchema } from "@/features/ai/gemini-schema";
import { scoreNeedWithGemini } from "@/features/ai/gemini-service";
import { createNeedSchema } from "@/features/needs/schema";
import { computeUrgency } from "@/features/needs/urgency";
import { hasGeminiConfig } from "@/lib/config/env";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input = createNeedSchema.parse(body);

    if (!hasGeminiConfig()) {
      const fallback = computeUrgency(input);
      return NextResponse.json({
        ok: true,
        ...fallback,
        recommendedSkills: input.requiredSkills,
        scoringSource: "heuristic"
      });
    }

    const result = await scoreNeedWithGemini(input);
    const parsed = geminiUrgencySchema.parse(result);

    return NextResponse.json({
      ok: true,
      ...parsed,
      scoringSource: "gemini"
    });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { ok: false, error: "Unable to score need urgency." },
      { status: 500 }
    );
  }
}
