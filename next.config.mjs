/** @type {import('next').NextConfig} */
const nextConfig = {
  react: {
    compiler: false, // Disable React Compiler
  },
  images: {
    domains: ['media2.dev.to'], 
  },
};

export default nextConfig;
