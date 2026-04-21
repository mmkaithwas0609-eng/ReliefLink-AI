"use client";

import { getDocs } from "firebase/firestore";

import { needsCollection, volunteersCollection } from "@/lib/firebase/firestore";
import { rankVolunteersForNeed } from "@/features/matching/score";
import type { MapDataset } from "@/features/maps/map-types";
import type { NeedRecord, VolunteerRecord } from "@/types/firestore";

async function listNeeds() {
  const snapshot = await getDocs(needsCollection());
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as NeedRecord);
}

async function listVolunteers() {
  const snapshot = await getDocs(volunteersCollection());
  return snapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id }) as VolunteerRecord
  );
}

export async function getMapDataset(): Promise<MapDataset> {
  const [needs, volunteers] = await Promise.all([listNeeds(), listVolunteers()]);

  return {
    needs,
    volunteers,
    recommendations: needs.map((need) => ({
      need,
      matches: rankVolunteersForNeed(need, volunteers).slice(0, 3)
    }))
  };
}
