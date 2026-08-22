import { create } from "zustand";

export interface MeetingCreationResult {
  meetingId: number;
  title: string;
  dateTime: string;
  place: string;
  capacity: number;
}

interface MeetingCreationResultState {
  result: MeetingCreationResult | null;
  setResult: (result: MeetingCreationResult) => void;
  clear: () => void;
}

export const useMeetingCreationResultStore = create<MeetingCreationResultState>(
  (set) => ({
    result: null,
    setResult: (result) => set({ result }),
    clear: () => set({ result: null }),
  })
);
