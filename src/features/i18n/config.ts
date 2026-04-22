import en from "@/messages/en";
import hi from "@/messages/hi";
import { TranslationMessages } from "./types";


export const locales = ["en", "hi"] as const;

export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = "en";


export const messages: Record<AppLocale, TranslationMessages> = {
  en,
  hi  
};

export const languageNameToLocale: Record<string, AppLocale> = {
  English: "en",
  Hindi: "hi"
};

export function isAppLocale(value: string): value is AppLocale {
  return locales.includes(value as AppLocale);
}
