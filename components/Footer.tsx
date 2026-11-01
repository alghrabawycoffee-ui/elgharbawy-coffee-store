"use client";

import { useState, useEffect } from 'react'; // 1. استيراد useState و useEffect
import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

export default function Footer() {
  // 2. تعريف حالة للسنة، بتبدأ بقيمة فاضية
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  // 3. تحديث السنة بعد ما المكون يتركب على المتصفح
  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 pb-8 mt-auto">
      {/* ... باقي الكود زي ما هو ... */}
      
      <div className="text-center border-t border-gray-800 pt-6 text-gray-500 text-sm">
        {/* 4. عرض السنة لو موجودة، أو 2026 كقيمة افتراضية */}
        &copy; {currentYear || 2026} متجر الغرباوي. صنع في مصر ❤️
      </div>
    </footer>
  );
}