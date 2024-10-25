import { create } from "zustand";

interface GlowResult {
  // Define the structure of your glow result here
  // For example:
  glowScore: number;
  insights: string[];
  // Add other properties as needed
}

interface GlowResultStore {
  glowResult: GlowResult | null;
  setGlowResult: (result: GlowResult) => void;
}

export const useGlowResultStore = create<GlowResultStore>((set) => ({
  glowResult: null,
  setGlowResult: (result) => set({ glowResult: result }),
}));
