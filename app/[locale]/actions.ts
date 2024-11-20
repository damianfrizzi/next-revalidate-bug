"use server";

import { revalidatePath } from "next/cache";

export const revalidate = async (paths: string[]) => {
  paths.forEach((path) => {
    console.log("Revalidate: ", getNormalizedPath(path));
    revalidatePath(getNormalizedPath(path));
  });
};

/**
 * Normalize the path based on environment.
 * Handles trailing slash differences between local and Vercel environments.
 * See https://github.com/vercel/next.js/issues/59836
 */
const getNormalizedPath = (path: string) => {
  if (path === "/") {
    return path;
  }

  const shouldRemoveTrailingSlash =
    process.env.NEXT_PUBLIC_VERCEL_ENV === "preview" ||
    process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

  // Normalize leading and trailing slashes
  let normalizedPath = path;
  if (shouldRemoveTrailingSlash) {
    normalizedPath = path.endsWith("/") ? path.slice(0, -1) : path;
  } else {
    normalizedPath = path.endsWith("/") ? path : path + "/";
  }

  return normalizedPath;
};
