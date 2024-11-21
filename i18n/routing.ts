import { createNavigation } from "next-intl/navigation";
import { defineRouting } from "next-intl/routing";

export const LANGUAGES = ["de", "fr", "en"] as const;
export const LOCALES = ["de-ch", "fr-ch", "en-ch"] as const;

export type Locale = "de-ch" | "fr-ch" | "en-ch";
export type Language = (typeof LANGUAGES)[number];

export const routing = defineRouting({
  locales: ["de-ch", "fr-ch"],
  defaultLocale: "de-ch",
  localePrefix: {
    mode: "as-needed",
    prefixes: {
      "de-ch": "/de",
      "fr-ch": "/fr",
    },
  },
  alternateLinks: false,
  domains: [
    // {
    //     domain: '...',
    //     defaultLocale: 'de-de',
    //     locales: ['de-de'],
    // },
    {
      domain: process.env.NEXT_PUBLIC_VERCEL_ENV ?? "localhost:3000",
      defaultLocale: "de-ch",
      locales: ["de-ch", "fr-ch"],
    },
  ],
});

export const getLanguage = (locale: Locale): Language =>
  new Intl.Locale(locale).language.toLowerCase() as Language;

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
