"use client";

import dynamic from 'next/dynamic';

// بنجبر Next.js ميعملش Prerender للصفحة دي ويشغلها في المتصفح بس
const BannersContent = dynamic(() => import('./BannersContent'), {
  ssr: false,
  loading: () => <div className="p-8 text-center font-bold">جاري تحميل البنرات...</div>,
});

export default function AdminBannersPage() {
  return <BannersContent />;
}