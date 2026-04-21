"use client";

import Link from "next/link";
import { BellRing, LayoutDashboard, MapPinned } from "lucide-react";

import { LanguageSwitcher } from "@/components/i18n/language-switcher";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { useI18n } from "@/providers/i18n-provider";

type NavKey = "overview" | "modules" | "analytics";
const navItems: {
  href: string;
  key: NavKey;
  icon: any;
}[] = [
  { href: "#overview", key: "overview", icon: LayoutDashboard },
  { href: "#modules", key: "modules", icon: BellRing },
  { href: "#analytics", key: "analytics", icon: MapPinned }
];

export function Header() {
  const { t } = useI18n();

  return (
    <header className="panel sticky top-4 z-30 flex items-center justify-between gap-6 px-5 py-4">
      <Link href="/" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-600 text-white">
          <MapPinned className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.24em] text-brand-700">
            {t("common", "appName")}
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Intelligent coordination for crisis response
          </p>
        </div>
      </Link>

      <nav className="hidden items-center gap-2 md:flex">
        {navItems.map(({ href, key, icon: Icon }) => (
          <Link
            key={href}
            href={href as any}
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 hover:text-slate-900 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-white"
            >
  <Icon className="h-4 w-4" />
  {t("common", key)}
</Link>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </header>
  );
}
