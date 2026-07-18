/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // Using unoptimized images since thumbnails are served from an external
    // video host (e.g. Cloudflare Stream) rather than Next.js image optimization.
    unoptimized: true,
  },
};

export default nextConfig;
