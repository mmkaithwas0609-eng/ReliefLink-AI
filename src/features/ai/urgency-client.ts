"use client";

import type { CreateNeedInput } from "@/features/needs/schema";
import { computeUrgency } from "@/features/needs/urgency";

export type UrgencyScoreResponse = {
  urgencyScore: number;
  priority: "low" | "medium" | "high" | "critical";
  urgencyReason: string;
  recommendedSkills: string[];
  scoringSource: "heuristic" | "gemini";
};

export async function requestUrgencyScore(
  input: CreateNeedInput
): Promise<UrgencyScoreResponse> {
  try {
    const response = await fetch("/api/ai/urgency-score", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    });

    const data = (await response.json()) as
      | UrgencyScoreResponse
      | { error?: string };

    if (!response.ok) {
  const errorMessage =
    "error" in data && data.error
      ? data.error
      : "Unable to score need urgency.";

  throw new Error(errorMessage);
}

    return data as UrgencyScoreResponse;
  } catch {
    const fallback = computeUrgency(input);

    return {
      ...fallback,
      recommendedSkills: input.requiredSkills,
      scoringSource: "heuristic"
    };
  }
}
