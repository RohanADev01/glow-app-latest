import { create } from "zustand";

type PointsStore = {
  totalPoints: number;
  setTotalPoints: (points: number) => void;
};

export const usePointsStore = create<PointsStore>((set: any) => ({
  totalPoints: 0,
  setTotalPoints: (points: any) => set({ totalPoints: points }),
}));
