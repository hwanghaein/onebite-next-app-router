import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // 빌드 시 타입 오류 무시
    ignoreBuildErrors: true,
  },
  images :{
    domains : ["shopping-phinf.pstatic.net"],
  }
};

export default nextConfig;
