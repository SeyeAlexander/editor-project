import { create } from "zustand";
import { persist } from "zustand/middleware";

export type AvatarOption = {
  name: string;
  gradient: string;
};

export type UserState = {
  displayName: string;
  email: string;
  avatarOption: AvatarOption | null;
  workspaceName: string;
  isAuthenticated: boolean;
  isOnboarded: boolean;
  setDisplayName: (name: string) => void;
  setEmail: (email: string) => void;
  setAvatarOption: (avatar: AvatarOption) => void;
  setWorkspaceName: (name: string) => void;
  setOnboarded: (value: boolean) => void;
  setAuthenticated: (value: boolean) => void;
  reset: () => void;
};

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      displayName: "",
      email: "",
      avatarOption: null,
      workspaceName: "",
      isAuthenticated: false,
      isOnboarded: false,

      setDisplayName: (name) => set(() => ({ displayName: name })),
      setEmail: (email) => set(() => ({ email: email })),
      setAvatarOption: (avatar) => set(() => ({ avatarOption: avatar })),
      setWorkspaceName: (name) => set(() => ({ workspaceName: name })),
      setOnboarded: (value) => set(() => ({ isOnboarded: value })),
      setAuthenticated: (value) => set(() => ({ isAuthenticated: value })),
      reset: () =>
        set(() => ({
          displayName: "",
          email: "",
          avatarOption: null,
          workspaceName: "",
          isAuthenticated: false,
          isOnboarded: false,
        })),
    }),
    {
      name: "user-storage",
    }
  )
);
