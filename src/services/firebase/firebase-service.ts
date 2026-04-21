import { getAdminAuth, getAdminDb } from "@/lib/firebase/admin";
import { firebaseCollections } from "@/lib/firebase/collections";

export class FirebaseService {
  get db() {
    return getAdminDb();
  }

  get auth() {
    return getAdminAuth();
  }

  collection(name: keyof typeof firebaseCollections) {
    return this.db.collection(firebaseCollections[name]);
  }
}

export const firebaseService = new FirebaseService();
