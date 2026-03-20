import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow requests from specific origins in development
  allowedDevOrigins: [
    // "192.168.218.130", // 👈 your LAN IP or device IP
    "localhost",
    "*.local", // optional wildcard for other local origins
  ],
  images: {
    unoptimized: true,
    domains: ["bvtwhue.com.vn"], // thêm hostname của bạn ở đây
  },
};

export default nextConfig;
