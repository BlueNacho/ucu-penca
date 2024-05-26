module.exports = {
  webpack: (config, { dev, isServer }) => {
    // Enable hot reloading
    if (dev) {
      config.watchOptions = {
        poll: 500, // Check for changes every second
        aggregateTimeout: 300, // Delay before rebuilding
      };
    }

    return config;
  },
};
