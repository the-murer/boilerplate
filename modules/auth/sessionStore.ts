import { User } from "@/types/userTypes";
import { create } from "zustand";
import { redirect } from "next/navigation";
type SessionStore = {
  user: User | null;
  setUser: (user: User) => void;
};

const useSessionStore = create<SessionStore>((set) => ({
  user: null,
  setUser: (user: User) => set({ user }),
}));

export const useAuthenticatedUser = () => {
  const { user } = useSessionStore();

  if (!user) {
    redirect("/login");
  }

  return user;
};

export default useSessionStore;
