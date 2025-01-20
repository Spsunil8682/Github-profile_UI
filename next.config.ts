// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   /* config options here */
// };

// export default nextConfig;
/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com'], // Allow GitHub avatar URLs
  },
};

module.exports = nextConfig;
