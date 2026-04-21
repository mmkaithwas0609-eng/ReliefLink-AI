import type { Timestamp } from "firebase-admin/firestore";

import { firebaseService } from "@/services/firebase/firebase-service";

export type FirestoreEntity = {
  id: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
};

export abstract class BaseRepository<T extends FirestoreEntity> {
  constructor(private readonly collectionName: string) {}

  protected get collection() {
    return firebaseService.db.collection(this.collectionName);
  }

  async getById(id: string) {
    const snapshot = await this.collection.doc(id).get();

    if (!snapshot.exists) {
      return null;
    }

    return snapshot.data() as T;
  }

  async list() {
    const snapshot = await this.collection.get();
    return snapshot.docs.map((doc) => doc.data() as T);
  }

  async set(id: string, payload: T) {
    await this.collection.doc(id).set(payload, { merge: true });
    return payload;
  }
}
