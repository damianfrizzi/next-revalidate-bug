import { getLanguage, Locale, LOCALES, routing } from "@/i18n/routing";
import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let locale = (await requestLocale) as any;

  if (!locale || !isValidLocale(locale)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`@/messages/${getLanguage(locale)}.json`)).default,
  };
});

const isValidLocale = (locale: string): locale is Locale =>
  LOCALES.includes(locale as Locale);
