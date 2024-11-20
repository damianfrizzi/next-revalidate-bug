"use client";

import { revalidate } from "@/app/[locale]/actions";
import { FC, PropsWithChildren } from "react";

export const Button: FC<PropsWithChildren<{ paths: string[] }>> = ({
  paths,
  children,
}) => (
  <button
    onClick={() => {
      revalidate(paths);
    }}
  >
    {children}
  </button>
);
