import { Button } from "@/app/[locale]/button";
import { LocaleSwitcher } from "@/app/[locale]/localeSwitcher.client";
import { getLanguage, Link, Locale } from "@/i18n/routing";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { blogPosts } from "./blog/[slug]/posts";

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("homepage");
  const language = getLanguage(locale as Locale);
  const blogPost = blogPosts.find((post) => post.language === language);

  return (
    <>
      {Math.floor(Math.random() * 1000)}
      <br />
      {new Date().toISOString()}
      <br />
      Title: {t("test")}
      <br />
      <br />
      {/* @ts-expect-error */}
      BlogPost: <Link href={`/blog/${blogPost?.slug}`}>{blogPost?.title}</Link>
      <br />
      <br />
      Server Component:
      <br />
      {/* @ts-expect-error */}
      <Link href="/" locale="de-ch">
        DE
      </Link>
      {/* @ts-expect-error */}
      <Link href="/" locale="fr-ch">
        FR
      </Link>
      <br />
      Client Component:
      <br />
      <LocaleSwitcher />
      <br />
      <br />
      <Button paths={["/fr-ch/", "/fr/"]}>
        Invalidate "/fr-ch/" and "/fr/"
      </Button>
      <Button paths={["/de-ch/", "/"]}>Invalidate "/de-ch/" and "/"</Button>
    </>
  );
}

export const revalidate = 10;
