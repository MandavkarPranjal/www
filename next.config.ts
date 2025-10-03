import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: '/git',
                destination: 'https://github.com/mandavkarpranjal',
                permanent: true
            },
            {
                source: '/x',
                destination: 'https://x.com/pr5dev',
                permanent: true
            },
        ]
    }
};

export default nextConfig;
