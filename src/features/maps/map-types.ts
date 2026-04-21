import type { NeedRecord, VolunteerRecord } from "@/types/firestore";
import type { VolunteerMatch } from "@/features/matching/score";

export type MapRecommendation = {
  need: NeedRecord;
  matches: VolunteerMatch[];
};

export type MapDataset = {
  needs: NeedRecord[];
  volunteers: VolunteerRecord[];
  recommendations: MapRecommendation[];
};
