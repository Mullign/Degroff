import type { NextConfig } from "next";

const basePathEnv = process.env.NEXT_PUBLIC_BASE_PATH;
const assetPrefixEnv = process.env.NEXT_PUBLIC_ASSET_PREFIX ?? basePathEnv;

const normalize = (value?: string) => {
  if (!value) return undefined;
  if (value === "/") return undefined;
  return value.startsWith("/") ? value : `/${value}`;
};

const nextConfig: NextConfig = {
  output: "export",
  basePath: normalize(basePathEnv),
  assetPrefix: normalize(assetPrefixEnv),
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
