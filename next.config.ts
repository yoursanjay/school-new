import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "/img/**",
      },
      {
        pathname: "/images/**",
      },
      {
        pathname: "/img/**",
        search: "?v=20261020",
      },
    ],
  },
};

export default nextConfig;
