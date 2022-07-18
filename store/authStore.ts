import create from "zustand";
import { persist } from "zustand/middleware";

const authStore = (set: any) => ({
  userProfile: null,

  login: (user: any) => set({ userProfile: user }),
  logout: () => set({ userProfile: null }),
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;