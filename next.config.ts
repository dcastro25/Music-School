import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "i.pinimg.com",
            },
            {
                protocol: "https",
                hostname: "artwork.art-cdn.com",
            },
            {
                protocol: "https",
                hostname: "*.ufs.sh", 
            },
        ],
    },
};

export default nextConfig;