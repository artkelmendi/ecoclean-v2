import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repo = "ecoclean-v2";
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? `/${repo}` : "")).replace(/\/+$/, "");

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
