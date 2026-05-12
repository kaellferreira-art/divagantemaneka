import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    localPatterns: [
      {
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
