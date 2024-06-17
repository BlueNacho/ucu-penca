/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/auth/login",
        permanent: false,
      },
    ];
  },
};
