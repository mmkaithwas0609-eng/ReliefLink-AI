"use client";

import { useEffect, useState } from "react";

import { VolunteerCard } from "@/components/volunteers/volunteer-card";
import { listVolunteers } from "@/features/volunteers/volunteer-service";
import type { VolunteerRecord } from "@/types/firestore";

type VolunteerListProps = {
  refreshKey: number;
};

export function VolunteerList({ refreshKey }: VolunteerListProps) {
  const [volunteers, setVolunteers] = useState<VolunteerRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadVolunteers() {
      try {
        setIsLoading(true);
        setError(null);
        const items = await listVolunteers();
        setVolunteers(items);
      } catch (nextError) {
        setError(
          nextError instanceof Error
            ? nextError.message
            : "Unable to load volunteers."
        );
      } finally {
        setIsLoading(false);
      }
    }

    void loadVolunteers();
  }, [refreshKey]);

  if (isLoading) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white px-5 py-10 text-center text-sm text-slate-600">
        Loading volunteer roster...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (volunteers.length === 0) {
    return (
      <div className="rounded-3xl border border-slate-200 bg-white px-5 py-10 text-center">
        <h3 className="text-lg font-semibold text-ink">No volunteers yet</h3>
        <p className="mt-2 text-sm text-slate-600">
          Save a volunteer profile to start building the response roster.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {volunteers.map((volunteer) => (
        <VolunteerCard key={volunteer.id} volunteer={volunteer} />
      ))}
    </div>
  );
}
