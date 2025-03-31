import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.APOLLO_API_URL || 'http://localhost:8000/graphql',
  },
};

export default nextConfig;
