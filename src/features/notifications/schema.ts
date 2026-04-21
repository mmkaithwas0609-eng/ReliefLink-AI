import { z } from "zod";

export const smsAlertSchema = z.object({
  to: z.string().min(8, "Recipient phone number is required."),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters.")
    .max(500, "Message must be under 500 characters."),
  needId: z.string().optional(),
  userId: z.string().optional()
});

export type SmsAlertInput = z.infer<typeof smsAlertSchema>;
