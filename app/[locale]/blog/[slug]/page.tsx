import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { getLanguage, Link, Locale } from "@/i18n/routing";
import { LocaleSwitcher } from "../../localeSwitcher.client";
import { blogPosts } from "./posts";

const Blog = async ({
  params,
}: {
  params: Promise<{ slug: string; locale: Locale }>;
}) => {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const blogPost = blogPosts.find(
    (post) => encodeURIComponent(post.slug) === slug
  );

  if (!blogPost) {
    notFound();
  }

  return (
    <>
      <h1>{blogPost.title}</h1>
      {Math.floor(Math.random() * 1000)}
      <br />
      {new Date().toISOString()}
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
    </>
  );
};

export const generateStaticParams = ({
  params: { locale },
}: {
  params: { locale: Locale };
}) => {
  const language = getLanguage(locale);
  return blogPosts
    .filter((post) => post.language === language)
    .map((post) => ({ slug: post.slug }));
};
export const dynamicParams = false;
export default Blog;
