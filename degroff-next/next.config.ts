import type { NextConfig } from "next";

const repoName = "Degroff";
const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  assetPrefix: isProd ? `/${repoName}` : undefined,
  basePath: isProd ? `/${repoName}` : undefined,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
