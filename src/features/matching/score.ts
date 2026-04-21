import { calculateDistanceKm } from "@/features/matching/geo";
import type { NeedRecord, VolunteerRecord } from "@/types/firestore";

export type VolunteerMatch = {
  volunteer: VolunteerRecord;
  score: number;
  distanceKm: number;
  skillOverlap: string[];
  languageMatch: boolean;
  withinTravelRadius: boolean;
  reasons: string[];
};

export function scoreVolunteerMatch(
  need: NeedRecord,
  volunteer: VolunteerRecord
): VolunteerMatch {
  const distanceKm = calculateDistanceKm(need.location, volunteer.location);
  const skillOverlap = volunteer.skills.filter((skill) =>
    need.requiredSkills.includes(skill)
  );
  const languageMatch = volunteer.languages.includes(need.language);
  const withinTravelRadius = distanceKm <= volunteer.maxTravelDistanceKm;

  let score = 0;

  if (volunteer.status === "available") {
    score += 25;
  } else if (volunteer.status === "assigned") {
    score += 5;
  }

  score += Math.min(skillOverlap.length * 20, 40);

  if (languageMatch) {
    score += 15;
  }

  if (withinTravelRadius) {
    score += 15;
  } else {
    score -= 20;
  }

  const distanceScore = Math.max(0, 20 - distanceKm);
  score += distanceScore;

  if (need.priority === "critical" && volunteer.status === "available") {
    score += 10;
  }

  const normalizedScore = Math.max(0, Math.min(100, Math.round(score)));
  const reasons = [
    skillOverlap.length > 0
      ? `${skillOverlap.length} required skill match${skillOverlap.length > 1 ? "es" : ""}`
      : "no direct skill overlap",
    languageMatch ? "matches requester language" : "language mismatch",
    withinTravelRadius
      ? "within travel radius"
      : "outside preferred travel radius",
    `${distanceKm.toFixed(1)} km away`,
    `current status: ${volunteer.status}`
  ];

  return {
    volunteer,
    score: normalizedScore,
    distanceKm,
    skillOverlap,
    languageMatch,
    withinTravelRadius,
    reasons
  };
}

export function rankVolunteersForNeed(
  need: NeedRecord,
  volunteers: VolunteerRecord[]
) {
  return volunteers
    .map((volunteer) => scoreVolunteerMatch(need, volunteer))
    .sort((left, right) => right.score - left.score);
}
