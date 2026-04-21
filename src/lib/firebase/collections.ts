export const firebaseCollections = {
  needs: "needs",
  volunteers: "volunteers",
  users: "users",
  assignments: "assignments",
  alerts: "alerts",
  activityLogs: "activityLogs",
  analyticsSnapshots: "analyticsSnapshots"
} as const;

export type FirebaseCollectionName =
  (typeof firebaseCollections)[keyof typeof firebaseCollections];
