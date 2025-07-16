import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface UIState {
  loading: boolean;
  searchLoading: boolean;
  error: string | null;
  searchTerm: string;
  selectedLanguage: string;
  selectedDifficulty: string;

  // Actions
  setLoading: (loading: boolean) => void;
  setSearchLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setSearchTerm: (term: string) => void;
  setSelectedLanguage: (language: string) => void;
  setSelectedDifficulty: (difficulty: string) => void;
  resetFilters: () => void;
  clearError: () => void;
}

export const useUIStore = create<UIState>()(
  subscribeWithSelector((set) => ({
    loading: true,
    searchLoading: false,
    error: null,
    searchTerm: "",
    selectedLanguage: "all",
    selectedDifficulty: "all",

    setLoading: (loading) => set({ loading }),

    setSearchLoading: (searchLoading) => set({ searchLoading }),

    setError: (error) => set({ error }),

    setSearchTerm: (searchTerm) => set({ searchTerm }),

    setSelectedLanguage: (selectedLanguage) => set({ selectedLanguage }),

    setSelectedDifficulty: (selectedDifficulty) => set({ selectedDifficulty }),

    resetFilters: () =>
      set({
        searchTerm: "",
        selectedLanguage: "all",
        selectedDifficulty: "all",
      }),

    clearError: () => set({ error: null }),
  }))
);
