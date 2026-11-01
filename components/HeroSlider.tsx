"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

export default function HeroSlider() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 3);

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;
      if (distance < 0) { clearInterval(interval); return; }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const banners = [
    {
      id: 1,
      tag: "عرض محدود جداً!",
      title: "عروض الافتتاح",
      subtitle: "الكبرى وصلت!",
      desc: "خصم يصل إلى 50% على مجموعات القهوة المختصة وأدوات التقطير الاحترافية.",
      bgImage: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      showTimer: true,
    },
    {
      id: 2,
      tag: "تجهيز احترافي",
      title: "أدوات التقطير",
      subtitle: "الاحترافية",
      desc: "كل اللي محتاجه عشان تعمل قهوة احترافية في البيت بأقل مجهود.",
      bgImage: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      showTimer: false,
    },
    {
      id: 3,
      tag: "وصل حديثاً",
      title: "بن مختص",
      subtitle: "طازج يومياً",
      desc: "أجود حبوب البن المحمصة بعناية لتناسب ذوقك وتعدل يومك.",
      bgImage: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      showTimer: false,
    }
  ];

  return (
    <section className="mx-4 md:mx-10 mt-6 rounded-3xl overflow-hidden shadow-2xl h-[500px] md:h-[550px] relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true, dynamicBullets: true }}
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-full flex items-center">
              {/* الخلفية */}
              <div className="absolute inset-0 z-0">
                <img src={banner.bgImage} alt="bg" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-l from-[#1A120B]/95 via-[#1A120B]/70 to-[#1A120B]/30"></div>
              </div>

              {/* المحتوى */}
              <div className="relative z-10 w-full px-6 md:px-20 flex flex-col justify-center h-full pb-10">
                <span className="bg-[#E53935] text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full w-fit mb-6 flex items-center gap-2 shadow-lg">
                  🔥 {banner.tag}
                </span>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-2 drop-shadow-xl">
                  {banner.title} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A373] to-[#f5e6d3]">{banner.subtitle}</span>
                </h1>
                
                <p className="text-gray-300 text-sm md:text-xl mb-8 max-w-xl leading-relaxed drop-shadow-md">
                  {banner.desc}
                </p>

                {/* العداد */}
                {banner.showTimer && (
                  <div className="flex gap-3 md:gap-4 mb-8">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                      <div key={unit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 md:p-4 text-center min-w-[70px] shadow-lg">
                        <span className="block text-2xl md:text-3xl font-black text-[#D4A373] leading-none mb-1">{value}</span>
                        <span className="text-[10px] md:text-xs text-gray-300 font-bold">
                          {unit === 'days' ? 'يوم' : unit === 'hours' ? 'ساعة' : unit === 'minutes' ? 'دقيقة' : 'ثانية'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <Link href="#products" className="bg-[#8A3324] hover:bg-[#5A1F14] text-white font-black text-lg text-center px-10 py-4 rounded-xl transition-all shadow-[0_10px_20px_rgba(138,51,36,0.4)] hover:-translate-y-1 w-fit">
                  تسوق الآن
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet { background-color: #fff; opacity: 0.5; width: 10px; height: 10px; transition: 0.3s; }
        .swiper-pagination-bullet-active { background-color: #D4A373; opacity: 1; width: 30px; border-radius: 8px; }
      `}</style>
    </section>
  );
}