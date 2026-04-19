"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UIState {
  theme: "light" | "dark";
  accent: "violet" | "emerald" | "amber" | "ink";
  density: "comfortable" | "compact";
  setTheme: (t: UIState["theme"]) => void;
  setAccent: (a: UIState["accent"]) => void;
  setDensity: (d: UIState["density"]) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      theme: "light",
      accent: "violet",
      density: "comfortable",
      setTheme: (theme) => set({ theme }),
      setAccent: (accent) => set({ accent }),
      setDensity: (density) => set({ density }),
    }),
    { name: "gioco-ui" },
  ),
);

interface WizardState {
  currentStep: number;
  setStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

export const useWizardStore = create<WizardState>((set) => ({
  currentStep: 1,
  setStep: (currentStep) => set({ currentStep }),
  nextStep: () =>
    set((s) => ({ currentStep: Math.min(6, s.currentStep + 1) })),
  prevStep: () => set((s) => ({ currentStep: Math.max(1, s.currentStep - 1) })),
  reset: () => set({ currentStep: 1 }),
}));

interface CampaignDetailUIState {
  chartView: "combined" | "by_platform";
  setChartView: (v: CampaignDetailUIState["chartView"]) => void;
  active: boolean;
  setActive: (v: boolean) => void;
}

export const useCampaignDetailUI = create<CampaignDetailUIState>((set) => ({
  chartView: "by_platform",
  setChartView: (chartView) => set({ chartView }),
  active: true,
  setActive: (active) => set({ active }),
}));
