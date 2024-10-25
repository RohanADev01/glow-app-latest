import { create } from "zustand";

type ThemeState = {
  isDarkMode: boolean;
  toggleTheme: () => void;
};

export const useThemeStore = create<ThemeState>((set: any) => ({
  isDarkMode: false,
  toggleTheme: () => set((state: any) => ({ isDarkMode: !state.isDarkMode })),
}));
