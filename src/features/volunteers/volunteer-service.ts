"use client";

import {
  collection,
  addDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp
} from "firebase/firestore";

import { firebaseDb } from "@/lib/firebase/client";
import { firebaseCollections } from "@/lib/firebase/collections";
import { volunteersCollection } from "@/lib/firebase/firestore";
import type { VolunteerProfileInput } from "@/features/volunteers/schema";
import type { VolunteerRecord } from "@/types/firestore";

export async function upsertVolunteerProfile(
  input: VolunteerProfileInput,
  userId: string
): Promise<VolunteerRecord> {
  if (!firebaseDb) {
    throw new Error("Firestore is not available. Check Firebase client setup.");
  }
  const now = serverTimestamp();
  const docRef = await addDoc(
  collection(firebaseDb, firebaseCollections.volunteers),
  {
    userId,
    fullName: input.fullName,
    phoneNumber: input.phoneNumber,
    skills: input.skills,
    languages: input.languages,
    status: input.status,
    availabilityNote: input.availabilityNote,
    maxTravelDistanceKm: input.maxTravelDistanceKm,
    location: {
      lat: input.lat,
      lng: input.lng
    },
    address: input.address,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  }
);

  return {
    id: docRef.id,
    userId,
    fullName: input.fullName,
    phoneNumber: input.phoneNumber,
    skills: input.skills,
    languages: input.languages,
    status: input.status,
    availabilityNote: input.availabilityNote,
    maxTravelDistanceKm: input.maxTravelDistanceKm,
    location: {
      lat: input.lat,
      lng: input.lng
    },
    address: input.address,
    createdAt: null,
    updatedAt: null
  };
}

export async function listVolunteers() {
  const snapshot = await getDocs(
    query(volunteersCollection(), orderBy("status", "asc"))
  );

  return snapshot.docs.map((docSnapshot) => {
    const data = docSnapshot.data();

    return {
      ...data,
      id: docSnapshot.id
    } as VolunteerRecord;
  });
}
