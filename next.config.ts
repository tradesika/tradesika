import type { NextConfig } from "next";

// Build target switches by env var, so the SAME codebase serves two deploys:
//   • default               → "standalone" Node bundle (.next/standalone) for Docker / Coolify.
//   • BUILD_TARGET=export    → fully static site in /out for GitHub Pages (commited as /docs).
const isExport = process.env.BUILD_TARGET === "export";

const nextConfig: NextConfig = {
  output: isExport ? "export" : "standalone",
  images: {
    // A static export has no server-side image optimizer.
    unoptimized: isExport,
    remotePatterns: [{ protocol: "https", hostname: "placeholders.io" }],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  allowedDevOrigins: ["*"],
  // Custom headers require a server; they don't apply to a static export
  // (GitHub Pages sets its own caching headers).
  ...(isExport
    ? {}
    : {
        async headers() {
          return [
            {
              source: "/images/:path*",
              headers: [{ key: "Cache-Control", value: "public, max-age=2592000" }],
            },
            {
              source: "/files/:path*",
              headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
            },
          ];
        },
      }),
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: [
          '**/node_modules/**',
          '**/.next/**',
          '**/.git/**',
          '**/out/**',
          '**/docs/**',
          '**/playwright-screenshots/**',
          '**/.playwright-mcp/**',
          '**/playwright-dev-server.log',
          '**/npm-start.log',
          '**/frontend.log',
          '**/project-docs/**',
        ],
      };
    }
    return config;
  },
};

export default nextConfig;
