import { create } from "zustand";

type States = {
  level: "easy" | "medium" | "hard";
  isGameRunning: boolean;
};
type Actions = {
  setLevel: (level: "easy" | "medium" | "hard") => void;
  setIsGameRunning: (isGameRunning: boolean) => void;
};

const useGameStore = create<States & Actions>((set) => ({
  level: "hard",
  isGameRunning: false,

  setLevel: (level) => set({ level }),
  setIsGameRunning: (isGameRunning) => set({ isGameRunning }),
}));

export default useGameStore;
