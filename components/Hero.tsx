"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // بنحدد وقت انتهاء العرض (مثلاً بعد 3 أيام من الآن)
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative mx-4 md:mx-10 mt-6 rounded-2xl overflow-hidden bg-[#1A120B] flex items-center min-h-[400px] md:h-[500px]">
      {/* خلفية البنر */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
          alt="Coffee Beans Background" 
          className="w-full h-full object-cover opacity-30 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-[#1A120B] via-[#1A120B]/80 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full px-6 md:px-16 flex flex-col justify-center h-full">
        <span className="bg-[#E53935] text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full w-fit mb-4 flex items-center gap-1">
          🔥 عرض محدود جداً!
        </span>
        
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
          عروض الافتتاح <br />
          <span className="text-[#D4A373]">الكبرى وصلت!</span>
        </h1>
        
        <p className="text-gray-300 text-sm md:text-lg mb-6 max-w-lg leading-relaxed">
          خصم يصل إلى <strong>50%</strong> على مجموعات القهوة المختصة وأدوات التقطير الاحترافية. العرض لفترة محدودة!
        </p>

        {/* العداد التنازلي */}
        <div className="flex gap-2 md:gap-4 mb-8">
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 md:p-3 text-center min-w-[60px]">
            <span className="block text-xl md:text-3xl font-black text-[#D4A373] leading-none">{timeLeft.days}</span>
            <span className="text-[10px] md:text-xs text-gray-300">يوم</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 md:p-3 text-center min-w-[60px]">
            <span className="block text-xl md:text-3xl font-black text-[#D4A373] leading-none">{timeLeft.hours}</span>
            <span className="text-[10px] md:text-xs text-gray-300">ساعة</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 md:p-3 text-center min-w-[60px]">
            <span className="block text-xl md:text-3xl font-black text-[#D4A373] leading-none">{timeLeft.minutes}</span>
            <span className="text-[10px] md:text-xs text-gray-300">دقيقة</span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 md:p-3 text-center min-w-[60px]">
            <span className="block text-xl md:text-3xl font-black text-[#D4A373] leading-none">{timeLeft.seconds}</span>
            <span className="text-[10px] md:text-xs text-gray-300">ثانية</span>
          </div>
        </div>

        {/* الأزرار */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4">
          <Link href="#products" className="bg-[#8A3324] hover:bg-[#5A1F14] text-white font-bold text-center px-8 py-3 rounded-lg transition-colors border-2 border-[#8A3324]">
            تسوق الآن
          </Link>
          <Link href="#products" className="bg-transparent hover:bg-white hover:text-[#1A120B] text-white font-bold text-center px-8 py-3 rounded-lg transition-colors border-2 border-white">
            اكتشف المجموعات
          </Link>
        </div>
      </div>
    </section>
  );
}