import { z } from "zod";

export const createNeedSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters."),
  category: z.string().min(1, "Category is required."),
  requiredSkills: z
    .array(z.string().min(1))
    .min(1, "Select at least one required skill."),
  language: z.string().min(1, "Language is required."),
  address: z.string().min(8, "Address must be at least 8 characters."),
  lat: z.coerce
    .number()
    .min(-90, "Latitude must be valid.")
    .max(90, "Latitude must be valid."),
  lng: z.coerce
    .number()
    .min(-180, "Longitude must be valid.")
    .max(180, "Longitude must be valid."),
  requesterName: z
    .string()
    .min(2, "Requester name must be at least 2 characters."),
  requesterPhone: z
    .string()
    .min(10, "Requester phone must be at least 10 characters.")
});

export type CreateNeedInput = z.infer<typeof createNeedSchema>;
