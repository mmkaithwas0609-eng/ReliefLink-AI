import { z } from "zod";

export const geminiUrgencySchema = z.object({
  urgencyScore: z.number().min(0).max(100),
  priority: z.enum(["low", "medium", "high", "critical"]),
  urgencyReason: z.string().min(8),
  recommendedSkills: z.array(z.string()).default([])
});

export type GeminiUrgencyResult = z.infer<typeof geminiUrgencySchema>;
