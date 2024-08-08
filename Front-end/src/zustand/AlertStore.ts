import { create } from "zustand";

interface Alert {
  text: string;
  type: "warning" | "success" | "error";
}

interface AlertStore {
  alert: Alert | null;
  setAlert: (alert: Alert | null) => void;
}

export const alertStore = create<AlertStore>((set) => ({
  alert: null,
  setAlert: (alert) => set({ alert }),
}));
