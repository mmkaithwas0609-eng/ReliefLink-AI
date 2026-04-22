import { Timestamp, FieldValue } from "firebase/firestore";

import type { GeoPoint, NeedPriority, UserRole } from "@/types";

export type NeedStatus =
  | "submitted"
  | "triaged"
  | "assigned"
  | "in_progress"
  | "resolved";

export type VolunteerStatus = "available" | "assigned" | "offline";

export type AssignmentStatus =
  | "pending"
  | "accepted"
  | "en_route"
  | "completed"
  | "cancelled";

export type NeedRecord = {
  id: string;
  title: string;
  description: string;
  category: string;
  requiredSkills: string[];
  language: string;
  priority: NeedPriority;
  urgencyScore: number;
  urgencyReason: string;
  scoringSource: "heuristic" | "gemini";
  status: NeedStatus;
  location: GeoPoint;
  address: string;
  requesterName: string;
  requesterPhone: string;
  createdBy: string;
  assignedVolunteerIds: string[];
  createdAt: Timestamp | FieldValue | null;
updatedAt: Timestamp | FieldValue | null;
};

export type VolunteerRecord = {
  id: string;
  userId: string;
  fullName: string;
  phoneNumber: string;
  skills: string[];
  languages: string[];
  status: VolunteerStatus;
  availabilityNote: string;
  maxTravelDistanceKm: number;
  location: GeoPoint;
  address: string;
  createdAt: Timestamp | FieldValue | null;
updatedAt: Timestamp | FieldValue | null;
};

export type UserProfile = {
  id: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  role: UserRole;
  preferredLanguage: string;
  createdAt: Timestamp | FieldValue | null;
updatedAt: Timestamp | FieldValue | null;
};

export type AssignmentRecord = {
  id: string;
  needId: string;
  volunteerId: string;
  status: AssignmentStatus;
  distanceKm: number;
  score: number;
  matchReasons: string[];
  createdAt: Timestamp | FieldValue | null;
updatedAt: Timestamp | FieldValue | null;
};

export type NotificationRecord = {
  id: string;
  userId: string;
  needId?: string;
  channel: "sms" | "email" | "in_app";
  to?: string;
  message: string;
  status: "queued" | "sent" | "failed";
  createdAt: Timestamp | FieldValue | null;
updatedAt: Timestamp | FieldValue | null;
};
