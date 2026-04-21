"use client";

import { getDocs } from "firebase/firestore";

import {
  alertsCollection,
  needsCollection,
  volunteersCollection
} from "@/lib/firebase/firestore";
import type { NeedRecord, NotificationRecord, VolunteerRecord } from "@/types/firestore";

type PriorityCount = {
  priority: NeedRecord["priority"];
  count: number;
};

type VolunteerStatusCount = {
  status: VolunteerRecord["status"];
  count: number;
};

type LanguageCount = {
  language: string;
  count: number;
};

type AnalyticsSnapshot = {
  totalNeeds: number;
  criticalNeeds: number;
  averageUrgencyScore: number;
  totalVolunteers: number;
  availableVolunteers: number;
  totalSmsAlerts: number;
  successfulSmsAlerts: number;
  needsByPriority: PriorityCount[];
  volunteersByStatus: VolunteerStatusCount[];
  topNeedLanguages: LanguageCount[];
};

function countByKey<T extends string>(values: T[]) {
  const counts = new Map<T, number>();

  values.forEach((value) => {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  });

  return counts;
}

export async function getAnalyticsSnapshot(): Promise<AnalyticsSnapshot> {
  const [needsSnapshot, volunteersSnapshot, alertsSnapshot] = await Promise.all([
    getDocs(needsCollection()),
    getDocs(volunteersCollection()),
    getDocs(alertsCollection())
  ]);

  const needs = needsSnapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id }) as NeedRecord
  );
  const volunteers = volunteersSnapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id }) as VolunteerRecord
  );
  const alerts = alertsSnapshot.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id }) as NotificationRecord
  );

  const needsByPriorityMap = countByKey(needs.map((need) => need.priority));
  const volunteersByStatusMap = countByKey(
    volunteers.map((volunteer) => volunteer.status)
  );
  const languagesMap = countByKey(needs.map((need) => need.language));

  const totalNeeds = needs.length;
  const criticalNeeds = needs.filter((need) => need.priority === "critical").length;
  const averageUrgencyScore =
    totalNeeds === 0
      ? 0
      : Math.round(
          needs.reduce((sum, need) => sum + need.urgencyScore, 0) / totalNeeds
        );
  const totalVolunteers = volunteers.length;
  const availableVolunteers = volunteers.filter(
    (volunteer) => volunteer.status === "available"
  ).length;
  const smsAlerts = alerts.filter((alert) => alert.channel === "sms");
  const successfulSmsAlerts = smsAlerts.filter(
    (alert) => alert.status === "sent"
  ).length;

  return {
    totalNeeds,
    criticalNeeds,
    averageUrgencyScore,
    totalVolunteers,
    availableVolunteers,
    totalSmsAlerts: smsAlerts.length,
    successfulSmsAlerts,
    needsByPriority: Array.from(needsByPriorityMap.entries()).map(
      ([priority, count]) => ({
        priority,
        count
      })
    ),
    volunteersByStatus: Array.from(volunteersByStatusMap.entries()).map(
      ([status, count]) => ({
        status,
        count
      })
    ),
    topNeedLanguages: Array.from(languagesMap.entries())
      .map(([language, count]) => ({
        language,
        count
      }))
      .sort((left, right) => right.count - left.count)
      .slice(0, 5)
  };
}
