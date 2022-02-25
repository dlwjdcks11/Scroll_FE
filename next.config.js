/**
 * @type { import('next').NextConfig }
 */

const nextConfig = {
    reactStrictMode: true,
    compiler: {
        styledComponents: true,
    },
    images: {
        domains: ['image.tmdb.org'],
    },
    env: {
        API_KEY: "a60c1a27ae0e0940afb23c616e968475",
    },
};

module.exports = nextConfig;