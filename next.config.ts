import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone', // Cần thiết để deploy với Docker
};

export default nextConfig;
