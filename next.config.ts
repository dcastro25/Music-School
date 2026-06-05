import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "a704hq7mg4.ufs.sh",
            },
        ],
    },
};

export default nextConfig;