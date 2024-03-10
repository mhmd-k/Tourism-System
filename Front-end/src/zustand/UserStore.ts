import { create } from "zustand";
import { User } from "../types";
import { getStoredUser } from "../utils";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const userStore = create<UserStore>((set) => ({
  user: getStoredUser(),
  setUser: (user) =>
    set(() => {
      localStorage.setItem("user", JSON.stringify(user));
      return { user: user };
    }),
}));
