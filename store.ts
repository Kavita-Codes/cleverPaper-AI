import { create } from 'zustand';
import { GeneratedPaper, PaperConfiguration } from './types';

interface AppState {
  currentConfig: PaperConfiguration | null;
  generatedPapers: GeneratedPaper[];
  setConfig: (config: PaperConfiguration) => void;
  addPaper: (paper: GeneratedPaper) => void;
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  currentConfig: null,
  generatedPapers: [],
  isLoading: false,
  setConfig: (config) => set({ currentConfig: config }),
  addPaper: (paper) => set((state) => ({ generatedPapers: [paper, ...state.generatedPapers] })),
  setLoading: (loading) => set({ isLoading: loading }),
}));