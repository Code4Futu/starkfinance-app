import { create } from "zustand";

export const useWeb3Store = create<{
  txHash: string | undefined;
}>((set) => ({
  txHash: undefined,
}));

type DrawerStore = {
  open: boolean;
  toggleDrawer: () => void;
};

export const useDrawerStore = create<DrawerStore>()((set) => ({
  open: false,
  toggleDrawer: () => set((state) => ({ open: !state.open })),
}));
