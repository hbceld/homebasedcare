// next.config.js (or next.config.ts if using TS)
// Proxy /api/* requests to your local Django backend during dev
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
