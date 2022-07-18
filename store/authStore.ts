import create from "zustand";
import { persist } from "zustand/middleware";

import { User } from "../types";

const authStore = (set: any) => ({
  userProfile: null || {
    _id: "",
    _type: "",
    userName: "",
    image: "",
  },

  login: (user: User) => set({ userProfile: user }),
  logout: () => set({ userProfile: null }),
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
