import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Theme {
  type: string;
  color: string;
}

const AvailableThemes: Theme[] = [{
  type: 'light',
  color: 'radial-gradient(circle at bottom right, #a1a300 0%, #000000 65%)' // Deep black with bright yellow corner
}, {
  type: 'dark',
  color: 'radial-gradient(circle at bottom right, #a1a300 0%, #000000 65%)' // Deep black with bright yellow corner
}];

interface ThemeStore {
  themes: Theme[];
  theme: Theme;
  nextTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      themes: [...AvailableThemes],
      theme: AvailableThemes[0],
      nextTheme: () => {
        const themes = get().themes;
        const activeThemeIndex = themes.findIndex(theme => theme.type === get().theme.type);
        const nextThemeIndex = (activeThemeIndex + 1) % themes.length;
        set(() => ({ theme: themes[nextThemeIndex] }));
      },
    }),
    {
      name: "theme-storage",
      partialize: (state) => ({ theme: state.theme }),
    }
  )
);