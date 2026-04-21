"use client";

import { getDocs } from "firebase/firestore";

import { needsCollection, volunteersCollection } from "@/lib/firebase/firestore";
import type { NeedRecord, VolunteerRecord } from "@/types/firestore";
import { rankVolunteersForNeed } from "@/features/matching/score";

export async function listNeedsForMatching() {
  const snapshot = await getDocs(needsCollection());
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as NeedRecord);
}

export async function listVolunteersForMatching() {
  const snapshot = await getDocs(volunteersCollection());
  return snapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id }) as VolunteerRecord
  );
}

export async function getMatchRecommendations() {
  const [needs, volunteers] = await Promise.all([
    listNeedsForMatching(),
    listVolunteersForMatching()
  ]);

  return needs.map((need) => ({
    need,
    matches: rankVolunteersForNeed(need, volunteers).slice(0, 3)
  }));
}
