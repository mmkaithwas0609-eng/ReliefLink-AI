import { z } from "zod";

export const volunteerProfileSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters."),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters."),
  skills: z.array(z.string().min(1)).min(1, "Select at least one skill."),
  languages: z.array(z.string().min(1)).min(1, "Select at least one language."),
  status: z.enum(["available", "assigned", "offline"]),
  availabilityNote: z
    .string()
    .min(5, "Availability note must be at least 5 characters."),
  maxTravelDistanceKm: z.coerce
    .number()
    .min(1, "Travel distance must be at least 1 km.")
    .max(200, "Travel distance seems too large."),
  address: z.string().min(8, "Address must be at least 8 characters."),
  lat: z.coerce
    .number()
    .min(-90, "Latitude must be valid.")
    .max(90, "Latitude must be valid."),
  lng: z.coerce
    .number()
    .min(-180, "Longitude must be valid.")
    .max(180, "Longitude must be valid.")
});

export type VolunteerProfileInput = z.infer<typeof volunteerProfileSchema>;
