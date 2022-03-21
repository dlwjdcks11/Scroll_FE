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
        URL: 'http://54.180.93.229:3000'
    },
};

module.exports = nextConfig;