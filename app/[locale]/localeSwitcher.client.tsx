"use client";

import { Link, usePathname } from "@/i18n/routing";

export const LocaleSwitcher = () => {
  const pathname = usePathname();
  return (
    <>
      <Link href={pathname} locale="de-ch">
        DE
      </Link>
      <Link href={pathname} locale="fr-ch">
        FR
      </Link>
    </>
  );
};
