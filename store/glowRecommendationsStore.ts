import { create } from "zustand";

interface RecommendationsState {
  recommendations: any; // Replace 'any' with a more specific type if you know the structure
  setRecommendations: (recommendations: any) => void;
}

export const useRecommendationsStore = create<RecommendationsState>((set) => ({
  recommendations: null,
  setRecommendations: (recommendations) => set({ recommendations }),
}));
