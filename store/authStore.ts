import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

import { User } from "../types";

const authStore = (set: any) => ({
  userProfile: null || {
    _id: "",
    _type: "",
    userName: "",
    image: "",
  },
  allUsers: [],

  login: (user: User) => set({ userProfile: user }),
  logout: () => set({ userProfile: null }),

  fetchAllUsers: async () => {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_PATH}/api/users`
    );

    set({ allUsers: data });
  },
});

const useAuthStore = create(
  persist(authStore, {
    name: "auth",
  })
);

export default useAuthStore;
