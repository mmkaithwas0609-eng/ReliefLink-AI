"use client";

import { createContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "firebase/auth";

import {
  getUserProfile,
  loginWithEmail,
  logoutUser,
  registerWithEmail,
  subscribeToAuthChanges
} from "@/features/auth/firebase-auth-service";
import type { LoginInput, RegisterInput } from "@/features/auth/schema";
import type { UserProfile } from "@/types/firestore";

type AuthContextValue = {
  user: User | null;
  profile: UserProfile | null;
  isLoading: boolean;
  login: (input: LoginInput) => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined
);

type AuthProviderProps = Readonly<{
  children: React.ReactNode;
}>;

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let active = true;

    let unsubscribe: () => void = () => {};

    try {
      unsubscribe = subscribeToAuthChanges(async (nextUser) => {
        if (!active) {
          return;
        }

        setUser(nextUser);

        if (!nextUser) {
          setProfile(null);
          setIsLoading(false);
          return;
        }

        const nextProfile = await getUserProfile(nextUser.uid);

        if (!active) {
          return;
        }

        setProfile(nextProfile);
        setIsLoading(false);
      });
    } catch {
      setUser(null);
      setProfile(null);
      setIsLoading(false);
    }

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  async function login(input: LoginInput) {
    setIsLoading(true);
    await loginWithEmail(input);
    router.push("/dashboard");
  }

  async function register(input: RegisterInput) {
    setIsLoading(true);
    await registerWithEmail(input);
    router.push("/dashboard");
  }

  async function logout() {
    setIsLoading(true);
    await logoutUser();
    setProfile(null);
    router.push("/login");
  }

  const value = {
    user,
    profile,
    isLoading,
    login,
    register,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
