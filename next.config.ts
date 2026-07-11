import type { NextConfig } from "next";


const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "picsum.photos" },
        ],
    },
    allowedDevOrigins: [
        "*.trycloudflare.com",
    ],

};

export default nextConfig;
