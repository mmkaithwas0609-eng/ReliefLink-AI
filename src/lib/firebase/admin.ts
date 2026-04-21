import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

import { hasServerFirebaseConfig, serverEnv } from "@/lib/config/env";

function formatPrivateKey(privateKey: string) {
  return privateKey.replace(/\\n/g, "\n");
}

export function getFirebaseAdminApp() {
  if (!hasServerFirebaseConfig()) {
    throw new Error(
      "Firebase Admin configuration is missing. Populate FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, and FIREBASE_PRIVATE_KEY in .env.local."
    );
  }

  if (getApps().length > 0) {
    return getApp();
  }

  return initializeApp({
    credential: cert({
      projectId: serverEnv.FIREBASE_PROJECT_ID,
      clientEmail: serverEnv.FIREBASE_CLIENT_EMAIL,
      privateKey: formatPrivateKey(serverEnv.FIREBASE_PRIVATE_KEY!)
    })
  });
}

export const firebaseAdminApp = getApps().length > 0 ? getApp() : undefined;

export function getAdminDb() {
  return getFirestore(getFirebaseAdminApp());
}

export function getAdminAuth() {
  return getAuth(getFirebaseAdminApp());
}
