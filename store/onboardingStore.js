import { create } from "zustand";

export const useQuestionStore = create((set) => ({
  showQuestions: false, 
  setShowQuestions: (value) => set({ showQuestions: value }),
}));
