import {
  type CollectionReference,
  collection,
  serverTimestamp
} from "firebase/firestore";

import { firebaseCollections } from "@/lib/firebase/collections";
import { createFirestoreConverter } from "@/lib/firebase/converters";
import { firebaseDb } from "@/lib/firebase/client";
import type {
  AssignmentRecord,
  NeedRecord,
  NotificationRecord,
  UserProfile,
  VolunteerRecord
} from "@/types/firestore";

function ensureDb() {
  if (!firebaseDb) {
    throw new Error(
      "Firestore client is unavailable on the server. Use this helper from client components or create a server-side repository with the Admin SDK."
    );
  }

  return firebaseDb;
}

export const timestamps = {
  now: () => serverTimestamp()
};

export function needsCollection() {
  return collection(
    ensureDb(),
    firebaseCollections.needs
  ).withConverter(createFirestoreConverter<NeedRecord>());
}

export function volunteersCollection() {
  return collection(
    ensureDb(),
    firebaseCollections.volunteers
  ).withConverter(createFirestoreConverter<VolunteerRecord>());
}

export function usersCollection() {
  return collection(
    ensureDb(),
    firebaseCollections.users
  ).withConverter(createFirestoreConverter<UserProfile>());
}

export function assignmentsCollection() {
  return collection(
    ensureDb(),
    firebaseCollections.assignments
  ).withConverter(createFirestoreConverter<AssignmentRecord>());
}

export function alertsCollection() {
  return collection(
    ensureDb(),
    firebaseCollections.alerts
  ).withConverter(createFirestoreConverter<NotificationRecord>());
}

export type AppCollectionReference<T> = CollectionReference<T>;
