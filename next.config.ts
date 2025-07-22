import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "gateway.pinata.cloud", //added pinata gateway domain to allow images to be displayed
    ],
  },
};

export default nextConfig;
