import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

import { User } from "../types";

interface AuthState {
  userProfile: User | null;
  allUsers: User[] | never[];
  login: (user: User) => void;
  logout: () => void;
  fetchAllUsers: () => Promise<void>;
}

const authStore = (set: any) =>
  <AuthState>{
    userProfile: null,
    allUsers: [],

    login: (user: User) => set({ userProfile: user }),
    logout: () => set({ userProfile: null }),

    fetchAllUsers: async () => {
      const { data }: { data: User[] } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_PATH}/api/users`
      );

      set({ allUsers: data });
    },
  };

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
