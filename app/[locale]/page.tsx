import { Button } from "@/app/[locale]/button";
import { LocaleSwitcher } from "@/app/[locale]/localeSwitcher.client";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("homepage");

  return (
    <>
      {Math.floor(Math.random() * 1000)}
      <br />
      {new Date().toISOString()}
      <br />
      Title: {t("test")}
      <br />
      <Button paths={["/fr-ch/", "/fr/"]}>Invalidate French</Button>
      <Button paths={["/de-ch/", "/"]}>Invalidate German</Button>
      <br />
      <Link href="/somePage">Go to some page</Link>
      <br />
      Server Component:
      <br />
      <Link href="/" locale="de-ch">
        DE
      </Link>
      <Link href="/" locale="fr-ch">
        FR
      </Link>
      <br />
      Client Component:
      <br />
      <LocaleSwitcher />
    </>
  );
}
