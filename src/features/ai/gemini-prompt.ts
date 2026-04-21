import type { CreateNeedInput } from "@/features/needs/schema";

export function buildUrgencyPrompt(input: CreateNeedInput) {
  return `
You are an emergency response triage assistant for an NGO platform.

Analyze the community need and return only valid JSON with this exact shape:
{
  "urgencyScore": number,
  "priority": "low" | "medium" | "high" | "critical",
  "urgencyReason": string,
  "recommendedSkills": string[]
}

Scoring rules:
- 0 to 24 = low
- 25 to 49 = medium
- 50 to 74 = high
- 75 to 100 = critical
- Consider medical danger, vulnerable groups, rescue risk, time sensitivity, safety hazards, and skill complexity.
- Keep urgencyReason concise, practical, and under 35 words.
- recommendedSkills should be realistic emergency-response skills.

Need details:
- Title: ${input.title}
- Description: ${input.description}
- Category: ${input.category}
- Required skills from intake: ${input.requiredSkills.join(", ")}
- Language: ${input.language}
- Address: ${input.address}
- Coordinates: ${input.lat}, ${input.lng}
- Requester: ${input.requesterName}
`.trim();
}
