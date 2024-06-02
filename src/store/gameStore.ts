import { create } from "zustand";

type States = {
  level: "easy" | "medium" | "hard";
  isGameRunning: boolean;
  matchedTiles: number[];
  board: { card: string; isImage: boolean; content: string }[];
  tempTimestamp: number;
  timeleftStore: number;
};
type Actions = {
  setLevel: (level: "easy" | "medium" | "hard") => void;
  setIsGameRunning: (isGameRunning: boolean) => void;
  setMatchedTiles: (matchedTiles: number[]) => void;
  setBoard: (
    board: { card: string; isImage: boolean; content: string }[],
  ) => void;
  setTempTimestamp: (tempTimestamp: number) => void;
  setTimeleftStore: (timeleftStore: number) => void;
};

const useGameStore = create<States & Actions>((set) => ({
  level: "hard",
  isGameRunning: false,
  matchedTiles: [],
  board: [],
  tempTimestamp: 0,
  timeleftStore: 0,

  setLevel: (level) => set({ level }),
  setIsGameRunning: (isGameRunning) => set({ isGameRunning }),
  setMatchedTiles: (matchedTiles) => set({ matchedTiles }),
  setBoard: (board) => set({ board }),
  setTempTimestamp: (tempTimestamp) => set({ tempTimestamp }),
  setTimeleftStore: (timeleftStore) => set({ timeleftStore }),
}));

export default useGameStore;
