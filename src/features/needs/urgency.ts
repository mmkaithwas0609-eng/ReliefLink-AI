import type { NeedPriority } from "@/types";

import { priorityThresholds } from "@/features/needs/constants";
import type { CreateNeedInput } from "@/features/needs/schema";

const criticalKeywords = [
  "critical",
  "bleeding",
  "injured",
  "pregnant",
  "flood",
  "trapped",
  "urgent",
  "oxygen",
  "ambulance",
  "severe"
];

const vulnerableKeywords = [
  "elderly",
  "child",
  "disabled",
  "infant",
  "wheelchair",
  "medicine",
  "diabetes"
];

function countKeywordHits(text: string, keywords: string[]) {
  const normalized = text.toLowerCase();
  return keywords.reduce(
    (count, keyword) => (normalized.includes(keyword) ? count + 1 : count),
    0
  );
}

export function computeUrgency(input: CreateNeedInput): {
  urgencyScore: number;
  priority: NeedPriority;
  urgencyReason: string;
} {
  const combinedText = `${input.title} ${input.description}`;
  const criticalHits = countKeywordHits(combinedText, criticalKeywords);
  const vulnerableHits = countKeywordHits(combinedText, vulnerableKeywords);

  let score = 20;

  if (input.category === "Medical" || input.category === "Rescue") {
    score += 25;
  }

  if (input.requiredSkills.includes("First Aid") || input.requiredSkills.includes("Nursing")) {
    score += 15;
  }

  score += criticalHits * 12;
  score += vulnerableHits * 8;

  if (input.description.length > 120) {
    score += 5;
  }

  const urgencyScore = Math.min(100, score);

  let priority: NeedPriority = "critical";

  if (urgencyScore < priorityThresholds.low) {
    priority = "low";
  } else if (urgencyScore < priorityThresholds.medium) {
    priority = "medium";
  } else if (urgencyScore < priorityThresholds.high) {
    priority = "high";
  }

  const reasons = [
    input.category === "Medical" || input.category === "Rescue"
      ? "high-risk category"
      : null,
    criticalHits > 0 ? `critical indicators detected (${criticalHits})` : null,
    vulnerableHits > 0
      ? `vulnerable people mentioned (${vulnerableHits})`
      : null,
    input.requiredSkills.length > 1 ? "multiple response skills required" : null
  ].filter(Boolean);

  return {
    urgencyScore,
    priority,
    urgencyReason:
      reasons.join(", ") || "Standard community need with no critical indicators."
  };
}
