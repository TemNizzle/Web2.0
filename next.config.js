/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The blog became /essays. Keep old links working.
      { source: "/blog", destination: "/essays", permanent: true },
      { source: "/blog/:slug", destination: "/essays/:slug", permanent: true },
    ];
  },
};

module.exports = nextConfig;
