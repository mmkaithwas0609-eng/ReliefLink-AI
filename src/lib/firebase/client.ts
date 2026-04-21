import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { clientEnv, hasClientFirebaseConfig } from "@/lib/config/env";

const firebaseConfig = {
  apiKey: clientEnv.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: clientEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: clientEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: clientEnv.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: clientEnv.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: clientEnv.NEXT_PUBLIC_FIREBASE_APP_ID
};

export function getFirebaseClientApp() {
  if (!hasClientFirebaseConfig()) {
    throw new Error(
      "Firebase client configuration is missing. Populate NEXT_PUBLIC_FIREBASE_* values in .env.local."
    );
  }

  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

export const firebaseClientApp =
  typeof window === "undefined" ? null : getFirebaseClientApp();

export const firebaseAuth =
  typeof window === "undefined" ? null : getAuth(getFirebaseClientApp());

export const firebaseDb =
  typeof window === "undefined" ? null : getFirestore(getFirebaseClientApp());
