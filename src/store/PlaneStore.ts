import create from "zustand";
import { GROUND_SIZE } from "../config/globalConfig";

interface planeStore {
  planeZ1: number;
  planeZ2: number;
  addZ: (num: number) => void;
}

export const planeStore = create<planeStore>((set) => ({
  planeZ1: -GROUND_SIZE / 2,
  planeZ2: -GROUND_SIZE * 1.5,
  addZ: (num: number) => {
    num === 1
      ? set((state) => ({ planeZ1: state.planeZ1 - GROUND_SIZE * 2 }))
      : set((state) => ({ planeZ2: state.planeZ2 - GROUND_SIZE * 2 }));
  },
}));
