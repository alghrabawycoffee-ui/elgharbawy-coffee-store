"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// استدعاء تنسيقات Swiper
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function HeroSlider() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // العداد التنازلي (بيحسب لآخر اليوم أو لوقت محدد)
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3); // العرض لمدة 3 أيام

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

  // هنا بنحط العروض بتاعتك (تقدر تزود براحتك)
  const banners = [
    {
      id: 1,
      tag: "عرض محدود جداً!",
      title: "عروض الافتتاح الكبرى!",
      desc: "خصم يصل إلى 50% على مجموعات القهوة المختصة.",
      bgImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      showTimer: true,
    },
    {
      id: 2,
      tag: "خصم خاص",
      title: "أدوات التقطير الاحترافية",
      desc: "كل اللي محتاجه عشان تعمل قهوة احترافية في البيت.",
      bgImage: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      showTimer: false,
    },
    {
      id: 3,
      tag: "وصل حديثاً",
      title: "بن مختص طازج",
      desc: "أجود حبوب البن المحمصة بعناية لتناسب ذوقك.",
      bgImage: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      showTimer: false,
    }
  ];

  return (
    <section className="relative mx-4 md:mx-10 mt-6 rounded-2xl overflow-hidden shadow-lg h-[450px] md:h-[500px]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-full flex items-center">
              {/* خلفية البنر */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={banner.bgImage} 
                  alt={banner.title} 
                  className="w-full h-full object-cover opacity-30 mix-blend-overlay"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-[#1A120B] via-[#1A120B]/80 to-transparent"></div>
              </div>

              {/* محتوى البنر */}
              <div className="relative z-10 w-full px-6 md:px-16 flex flex-col justify-center h-full pb-10 md:pb-0">
                <span className="bg-[#E53935] text-white text-xs md:text-sm font-bold px-3 py-1 rounded-full w-fit mb-4 flex items-center gap-1">
                  🔥 {banner.tag}
                </span>
                
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
                  {banner.title.split(' ').map((word, i) => 
                    i === banner.title.split(' ').length - 1 ? <span key={i} className="text-[#D4A373]">{word}</span> : word + ' '
                  )}
                </h1>
                
                <p className="text-gray-300 text-sm md:text-lg mb-6 max-w-lg leading-relaxed">
                  {banner.desc}
                </p>

                {/* العداد التنازلي - بيظهر بس لو showTimer = true */}
                {banner.showTimer && (
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
                )}

                <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                  <Link href="#products" className="bg-[#8A3324] hover:bg-[#5A1F14] text-white font-bold text-center px-8 py-3 rounded-lg transition-colors border-2 border-[#8A3324]">
                    تسوق الآن
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* تنسيقات إضافية عشان النقط بتاعة السلايدر تبان بلون مناسب */}
      <style jsx global>{`
        .swiper-pagination-bullet { background-color: #fff; opacity: 0.5; }
        .swiper-pagination-bullet-active { background-color: #D4A373; opacity: 1; width: 24px; border-radius: 8px; }
      `}</style>
    </section>
  );
}