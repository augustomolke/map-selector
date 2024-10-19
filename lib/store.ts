import { create } from "zustand";

type Store = {
  selected: number;
  setSelected: () => void;
};

export const useStore = create<Store>()((set) => ({
  selected: null,
  closeBtn: () => {},
  setSelected: (newSelected) => set((state) => ({ selected: newSelected })),
  setCloseBtn: (fn) => set((state) => ({ closeBtn: fn })),
}));
