import { create } from "zustand";

interface ScanResults {
  glowScore: {
    scores: {
      overall: number;
      potential: number;
      skinHealth: number;
      glowFactor: number;
      featureHarmony: number;
      authenticity: number;
    };
    percentile: number;
    facialCharacteristics: Record<string, string>;
    skinAnalysis: Record<string, string>;
  };
  recommendations: {
    result: Array<{
      userFeaturesSummary?: string;
      userSkinSummary?: string;
      userMakeupSummary?: string;
      steps: Array<any>;
    }>;
  };
}

interface ScanResultsStore {
  scanResults: ScanResults | null;
  setScanResults: (results: ScanResults) => void;
}

export const useScanResultsStore = create<ScanResultsStore>((set) => ({
  scanResults: null,
  setScanResults: (results) => set({ scanResults: results }),
}));
