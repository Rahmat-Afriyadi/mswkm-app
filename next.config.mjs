/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        // Matches any image hosted on localhost:3002
        protocol: "http",
        hostname: "localhost",
        port: "3002",
        pathname: "/images/**", // Match any path under /images/
      },
    ],
  },
};

export default nextConfig;
