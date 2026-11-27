/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "torino-api-rezm.onrender.com",
        pathname: "/static/images/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "6500",
        pathname: "/static/images/**",
      },
    ],
  },
};

export default nextConfig;
