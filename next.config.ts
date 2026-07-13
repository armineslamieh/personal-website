import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "picsum.photos",
                pathname: "/**",
            },
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                pathname: "/armineslamieh/**",
            },
            {
                protocol: "https",
                hostname: "opengraph.githubassets.com",
                pathname: "/**",
            },
        ],
    },

    allowedDevOrigins: ["*.trycloudflare.com"],
};

export default nextConfig;