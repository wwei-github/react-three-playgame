import create from "zustand";

interface speedStore {
  speed: number;
  addSpeed: () => void;
  reduceSpeed: () => void;
}

export const useSpeedStore = create<speedStore>((set) => ({
  speed: 0.1,
  addSpeed: () =>
    set((state) => ({
      speed: state.speed === 0.5 ? state.speed : (state.speed += 0.1),
    })),
  reduceSpeed: () =>
    set((state) => ({
      speed: state.speed === 0.1 ? state.speed : (state.speed -= 0.1),
    })),
}));
