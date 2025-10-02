export type EventId = string;

export interface EventEntity {
  id: EventId;
  name: string;
  description: string;
  startAt: string; // ISO datetime
  endAt?: string; // ISO datetime
  location: {
    address: string;
    lat?: number;
    lng?: number;
  };
  bannerUrl?: string;
  lineup?: Array<{ time: string; title: string; speaker?: string }>;
}

