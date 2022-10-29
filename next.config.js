/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  disable: process.env.NODE_ENV === "development"
});

module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["tesfm.fra1.digitaloceanspaces.com", "i.vimeocdn.com"]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
});
