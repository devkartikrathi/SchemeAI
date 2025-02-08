import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*/",
        destination: "https://schemeai.onrender.com/:path*/",
      },
      {
        source: "/api/:path*",
        destination: "https://schemeai.onrender.com/:path*",
      },
    ];
  },
};

export default nextConfig;
