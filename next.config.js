/**
 * @type { import('next').NextConfig }
 */

const dotenv = require('dotenv-webpack');

const nextConfig = {
    reactStrictMode: true,
    
    webpack: (config) => {
        config.plugins.push(new dotenv({ silent: true })); // .env파일이 없을 때 에러 일으키지 않음

        return config;
    }
};

module.exports = nextConfig;