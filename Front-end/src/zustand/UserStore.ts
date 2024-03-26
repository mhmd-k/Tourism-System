import { create } from "zustand";
import { User } from "../types";
import { getStoredUser } from "../utils";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  setImage: (image: string | null) => void;
}

export const userStore = create<UserStore>((set) => ({
  user: getStoredUser(),
  setUser: (user) =>
    set((state) => {
      localStorage.setItem("user", JSON.stringify(user));
      return { ...state, user: user };
    }),
  setImage: (image) => {
    set((state) => {
      if (state.user) {
        const updatedUser = { ...state.user, image: image };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return { ...state, user: updatedUser };
      }
      return state;
    });
  },
}));
