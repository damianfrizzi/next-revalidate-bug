import { Button } from "@/app/[locale]/button";
import { Link } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";

export default async function SomePage({
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
      <Button paths={["/fr-ch/somePage/", "/fr/somePage/"]}>
        Invalidate French
      </Button>
      <Button paths={["/de-ch/somePage/", "/somePage/"]}>
        Invalidate German
      </Button>
      <br />
      <Link href="/">Go to homepage</Link>
      <br />
      <Link href="/somePage" locale="de-ch">
        DE
      </Link>
      <Link href="/somePage" locale="fr-ch">
        FR
      </Link>
    </>
  );
}
