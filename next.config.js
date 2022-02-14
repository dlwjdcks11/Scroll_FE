/**
 * @type { import('next').NextConfig }
 */

const nextConfig = {
    reactStrictMode: true,
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        return config
    },
}

module.exports = nextConfig;