import { serverEnv } from "@/lib/config/env";
import { geminiUrgencySchema, type GeminiUrgencyResult } from "@/features/ai/gemini-schema";
import { buildUrgencyPrompt } from "@/features/ai/gemini-prompt";
import type { CreateNeedInput } from "@/features/needs/schema";

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

function extractTextPayload(data: GeminiResponse) {
  return (
    data.candidates?.[0]?.content?.parts
      ?.map((part) => part.text ?? "")
      .join("")
      .trim() ?? ""
  );
}

function extractJsonBlock(text: string) {
  const fencedMatch = text.match(/```json\s*([\s\S]*?)```/i);

  if (fencedMatch?.[1]) {
    return fencedMatch[1].trim();
  }

  const jsonMatch = text.match(/\{[\s\S]*\}/);

  if (!jsonMatch) {
    throw new Error("Gemini response did not contain valid JSON.");
  }

  return jsonMatch[0];
}

export async function scoreNeedWithGemini(
  input: CreateNeedInput
): Promise<GeminiUrgencyResult> {
  if (!serverEnv.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is missing.");
  }

  const model = serverEnv.GEMINI_MODEL ?? "gemini-2.5-flash";
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": serverEnv.GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: buildUrgencyPrompt(input)
              }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json"
        }
      }),
      cache: "no-store"
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Gemini request failed: ${response.status} ${errorText}`);
  }

  const data = (await response.json()) as GeminiResponse;
  const rawText = extractTextPayload(data);
  const parsed = JSON.parse(extractJsonBlock(rawText));
  return geminiUrgencySchema.parse(parsed);
}
