/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: ["localhost"],
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        // Matches any image hosted on localhost:3002
        protocol: "http",
        hostname: "localhost",
        port: "3002",
        pathname: "/images/**", // Match any path under /images/
      },
      {
        // Matches any image hosted on localhost:3002
        protocol: "http",
        hostname: "192.168.70.17",
        port: "3002",
        pathname: "/images/**", // Match any path under /images/
      },
      {
        // Matches any image hosted on localhost:3002
        protocol: "http",
        hostname: "192.168.70.17",
        port: "3003",
        pathname: "/uploads/**", // Match any path under /images/
      },
      {
        // Matches any image hosted on localhost:3002
        protocol: "http",
        hostname: "localhost",
        port: "3003",
        pathname: "/uploads/**", // Match any path under /images/
      },
    ],
  },
};

export default nextConfig;
