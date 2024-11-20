import type { NextConfig } from "next";
import nextIntlPlugin from "next-intl/plugin";

const withNextIntl = nextIntlPlugin();

const nextConfig: NextConfig = {
  trailingSlash: true,
};

export default withNextIntl(nextConfig);
