import type { UserRole } from "@/types";

export const roleLabels: Record<UserRole, string> = {
  admin: "Admin",
  coordinator: "Coordinator",
  volunteer: "Volunteer"
};

export const roleDescriptions: Record<UserRole, string> = {
  admin: "Manage operations, assignments, analytics, and escalations.",
  coordinator: "Review incoming needs and coordinate field response.",
  volunteer: "Receive assignments based on location, skills, and availability."
};
