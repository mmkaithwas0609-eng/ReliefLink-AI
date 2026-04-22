"use client";

import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type User
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  Timestamp,
  FieldValue,
  setDoc
} from "firebase/firestore";

import type { LoginInput, RegisterInput } from "@/features/auth/schema";
import { firebaseAuth, firebaseDb } from "@/lib/firebase/client";
import { firebaseCollections } from "@/lib/firebase/collections";
import type { UserProfile } from "@/types/firestore";

function requireAuthDependencies() {
  if (!firebaseAuth || !firebaseDb) {
    throw new Error(
      "Firebase Auth is unavailable. Check your client Firebase environment configuration."
    );
  }

  return { auth: firebaseAuth, db: firebaseDb };
}

export async function registerWithEmail(input: RegisterInput) {
  const { auth, db } = requireAuthDependencies();
  const credentials = await createUserWithEmailAndPassword(
    auth,
    input.email,
    input.password
  );

  const profileRef = doc(db, firebaseCollections.users, credentials.user.uid);

  await setDoc(profileRef, {
    id: credentials.user.uid,
    email: input.email,
    displayName: input.displayName,
    phoneNumber: input.phoneNumber,
    role: input.role,
    preferredLanguage: input.preferredLanguage,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  } satisfies UserProfile);

  return credentials.user;
}

export async function loginWithEmail(input: LoginInput) {
  const { auth } = requireAuthDependencies();
  const credentials = await signInWithEmailAndPassword(
    auth,
    input.email,
    input.password
  );

  return credentials.user;
}

export async function logoutUser() {
  const { auth } = requireAuthDependencies();
  await signOut(auth);
}

export function subscribeToAuthChanges(callback: (user: User | null) => void) {
  const { auth } = requireAuthDependencies();
  return onAuthStateChanged(auth, callback);
}

export async function getUserProfile(uid: string) {
  const { db } = requireAuthDependencies();
  const profileRef = doc(db, firebaseCollections.users, uid);
  const snapshot = await getDoc(profileRef);

  if (!snapshot.exists()) {
    return null;
  }

  return snapshot.data() as UserProfile;
}
