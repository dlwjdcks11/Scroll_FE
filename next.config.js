/**
 * @type { import('next').NextConfig }
 */

const nextConfig = {
    reactStrictMode: true,
    webpack: config => {
        config.module.rules.push({
            test: /\.svg$/,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"]
        });
        return config;
    },
    compiler: {
        styledComponents: true,
    },
    env: {
        URL: 'http://3.38.141.82:3000'
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

module.exports = nextConfig;