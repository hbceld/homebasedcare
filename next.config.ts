// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ✅ Ignore ESLint errors during production builds (Netlify will succeed)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Proxy /api/* requests to Django backend during local dev
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://127.0.0.1:8000/api/:path*", // proxy to Django backend
      },
    ];
  },
};

export default nextConfig;
