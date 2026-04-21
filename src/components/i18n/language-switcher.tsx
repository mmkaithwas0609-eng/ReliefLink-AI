"use client";

import { Languages } from "lucide-react";

import { useI18n } from "@/providers/i18n-provider";

const options = [
  { value: "en", label: "English" },
  { value: "hi", label: "हिंदी" }
] as const;

export function LanguageSwitcher() {
  const { locale, setLocale, t } = useI18n();

  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
      <Languages className="h-4 w-4 text-brand-700" />
      <span>{t("language", "label")}</span>
      <select
        value={locale}
        onChange={(event) => setLocale(event.target.value as "en" | "hi")}
        className="bg-transparent outline-none dark:text-slate-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
