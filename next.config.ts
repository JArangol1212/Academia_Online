import type { NextConfig } from "next";

const nextConfig: NextConfig = {
   images:{
    remotePatterns:[
      {
        protocol:"https",
        hostname:"r9m318ohpf.ufs.sh"
      }
    ]
   }
};

export default nextConfig;
