import React, { FC, PropsWithChildren } from "react";
import { getMessages, setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Locale, routing } from "@/i18n/routing";

const PublicLayout: FC<
  PropsWithChildren & {
    children: React.ReactNode;
    params: Promise<{ locale: Locale }>;
  }
> = async ({ children, params }) => {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages} locale={locale}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
};

export const generateStaticParams = () =>
  routing.locales.map((locale) => ({ locale }));

export default PublicLayout;
