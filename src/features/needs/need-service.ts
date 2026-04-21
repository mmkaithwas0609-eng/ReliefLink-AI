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
import { needsCollection } from "@/lib/firebase/firestore";
import { requestUrgencyScore } from "@/features/ai/urgency-client";
import type { NeedRecord } from "@/types/firestore";
import type { CreateNeedInput } from "@/features/needs/schema";

export async function createNeed(
  input: CreateNeedInput,
  createdBy: string
): Promise<NeedRecord> {
  if (!firebaseDb) {
    throw new Error("Firestore is not available. Check Firebase client setup.");
  }

  const urgency = await requestUrgencyScore(input);
  const docRef = await addDoc(
    collection(firebaseDb, firebaseCollections.needs),
    {
      title: input.title,
      description: input.description,
      category: input.category,
      requiredSkills: input.requiredSkills,
      language: input.language,
      priority: urgency.priority,
      urgencyScore: urgency.urgencyScore,
      urgencyReason: urgency.urgencyReason,
      scoringSource: urgency.scoringSource,
      status: "submitted",
      location: {
        lat: input.lat,
        lng: input.lng
      },
      address: input.address,
      requesterName: input.requesterName,
      requesterPhone: input.requesterPhone,
      createdBy,
      assignedVolunteerIds: [],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    }
  );

  const record: NeedRecord = {
    id: docRef.id,
    title: input.title,
    description: input.description,
    category: input.category,
    requiredSkills: input.requiredSkills,
    language: input.language,
    priority: urgency.priority,
    urgencyScore: urgency.urgencyScore,
    urgencyReason: urgency.urgencyReason,
    scoringSource: urgency.scoringSource,
    status: "submitted",
    location: {
      lat: input.lat,
      lng: input.lng
    },
    address: input.address,
    requesterName: input.requesterName,
    requesterPhone: input.requesterPhone,
    createdBy,
    assignedVolunteerIds: [],
    createdAt: null,
    updatedAt: null
  };

  return record;
}

export async function listNeeds() {
  const snapshot = await getDocs(
    query(needsCollection(), orderBy("urgencyScore", "desc"))
  );

  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      ...data,
      id: doc.id
    } as NeedRecord;
  });
}
