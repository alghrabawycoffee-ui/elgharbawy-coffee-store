import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // تم إزالة إعداد eslint لأنه لم يعد مدعوماً في Next.js 16
  // الإعداد التالي يسمح بإكمال البناء حتى في وجود أخطاء TypeScript
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;