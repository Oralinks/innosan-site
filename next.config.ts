import type { NextConfig } from "next";

// GITHUB_PAGES=true builds a static export served from https://<user>.github.io/innosan-site/
const pages = process.env.GITHUB_PAGES === "true";
const basePath = pages ? (process.env.NEXT_PUBLIC_BASE_PATH ?? "/innosan-site") : "";

const nextConfig: NextConfig = {
  ...(pages
    ? { output: "export" as const, basePath, trailingSlash: true }
    : { cacheComponents: true, partialPrefetching: true }),
  images: {
    // GitHub Pages has no image optimizer, so the static export serves the original files.
    unoptimized: pages,
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
