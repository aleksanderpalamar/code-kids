import { ProcessedVideo } from "@/types";

export const uiActions = (set: any) => ({
  setVideos: (videos: ProcessedVideo[]) => set({ videos }),
  setFilteredVideos: (filteredVideos: ProcessedVideo[]) =>
    set({ filteredVideos }),
  setLoading: (loading: boolean) => set({ loading }),
  setSearchLoading: (searchLoading: boolean) => set({ searchLoading }),
  setError: (error: string | null) => set({ error }),
  setSearchTerm: (searchTerm: string) => set({ searchTerm }),
  setSelectedLanguage: (selectedLanguage: string) => set({ selectedLanguage }),
  setSelectedDifficulty: (selectedDifficulty: string) =>
    set({ selectedDifficulty }),
  resetFilters: () =>
    set({
      searchTerm: "",
      selectedLanguage: "all",
      selectedDifficulty: "all",
    }),
  clearError: () => set({ error: null }),
});
