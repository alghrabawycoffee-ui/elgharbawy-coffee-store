"use client";

import dynamic from 'next/dynamic';

const CategoriesContent = dynamic(() => import('./CategoriesContent'), {
  ssr: false,
  loading: () => <div className="p-8 text-center font-bold">جاري تحميل الأقسام...</div>,
});

export default function AdminCategoriesPage() {
  return <CategoriesContent />;
}