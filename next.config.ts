import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    images: {
        unoptimized: true,
    },
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
            {
                source: '/mail',
                destination: 'https://mail.google.com/mail/?view=cm&fs=1&to=contact@pr5.dev&su=connect&body=hi%20pranjal%2C%20I%20saw%20your%20work%20bro%2C%20thanks%20for%20contributing%20lol',
                permanent: true
            },
            {
                source: '/0',
                destination: 'https://0.email/mail/compose?to=contact@pr5.dev&subject=connect&body=hi%20pranjal%2C%20I%20saw%20your%20work%20bro%2C%20thanks%20for%20contributing%20lol',
                permanent: true
            },
        ]
    }
};

export default nextConfig;
