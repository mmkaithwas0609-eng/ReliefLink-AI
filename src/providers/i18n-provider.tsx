"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState
} from "react";

import {
  defaultLocale,
  isAppLocale,
  messages,
  type AppLocale
} from "@/features/i18n/config";
import type { TranslationMessages } from "@/features/i18n/types";

type I18nContextValue = {
  locale: AppLocale;
  setLocale: (locale: AppLocale) => void;
  t: <S extends keyof TranslationMessages, K extends keyof TranslationMessages[S]>(
    section: S,
    key: K
  ) => TranslationMessages[S][K];
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

type I18nProviderProps = Readonly<{
  children: React.ReactNode;
}>;

const storageKey = "relieflink-locale";

export function I18nProvider({ children }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<AppLocale>(defaultLocale);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);

    if (stored && isAppLocale(stored)) {
      setLocaleState(stored);
    }
  }, []);

  function setLocale(nextLocale: AppLocale) {
    setLocaleState(nextLocale);
    window.localStorage.setItem(storageKey, nextLocale);
  }

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      setLocale,
      t: (section, key) => messages[locale][section][key]
    }),
    [locale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider.");
  }

  return context;
}
