import create from "zustand";

interface wroldStore {
    position:number[];
    setPostition:(position:number[]) => void;
}

export const useWorldPosition = create<wroldStore>((set) => ({
  position: [0, 0, 0],
  setPostition: (position: number[]) => set({ position }),
}));
