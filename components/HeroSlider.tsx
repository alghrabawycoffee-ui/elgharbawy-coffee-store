"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { ArrowLeft } from 'lucide-react';

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

  // استخدام صور خلفيات سينمائية من Unsplash (مضمونة)
  const banners = [
    {
      id: 1,
      tag: "عرض محدود",
      title: "عروض الافتتاح",
      subtitle: "الكبرى وصلت!",
      desc: "خصم يصل إلى 50% على مجموعات القهوة المختصة وأدوات التقطير الاحترافية.",
      image: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", 
      showTimer: true,
    },
    {
      id: 2,
      tag: "تجهيز احترافي",
      title: "أدوات التقطير",
      subtitle: "الاحترافية",
      desc: "كل اللي محتاجه عشان تعمل قهوة احترافية في البيت بأقل مجهود.",
      image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80", 
      showTimer: false,
    }
  ];

  return (
    <section className="mx-4 md:mx-8 mt-4 rounded-[2rem] overflow-hidden shadow-2xl h-[600px] md:h-[650px] relative bg-[#1A120B]">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="relative w-full h-full flex items-center">
              
              {/* صورة الخلفية السينمائية */}
              <div className="absolute inset-0 z-0">
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-full h-full object-cover"
                />
                {/* طبقة تظليل مودرن (Gradient Overlay) عشان النص يبان */}
                <div className="absolute inset-0 bg-gradient-to-l from-[#1A120B]/95 via-[#1A120B]/70 to-[#1A120B]/30"></div>
              </div>

              {/* المحتوى */}
              <div className="relative z-10 w-full px-6 md:px-20 flex flex-col items-center md:items-start text-center md:text-right mt-20 md:mt-0">
                <span className="bg-white/10 backdrop-blur-md text-[#D4A373] border border-white/20 text-xs md:text-sm font-bold px-4 py-2 rounded-full mb-6 flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  {banner.tag}
                </span>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.2] mb-4 tracking-tight drop-shadow-lg">
                  {banner.title} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A373] to-[#FDFBF7]">{banner.subtitle}</span>
                </h1>
                
                <p className="text-gray-300 text-sm md:text-lg mb-8 max-w-lg leading-relaxed font-medium drop-shadow-md">
                  {banner.desc}
                </p>

                {/* العداد الزجاجي (Glassmorphism) */}
                {banner.showTimer && (
                  <div className="flex gap-2 md:gap-4 mb-10">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                      <div key={unit} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 md:p-4 text-center min-w-[65px] md:min-w-[80px] shadow-[0_8px_30px_rgb(0,0,0,0.2)]">
                        <span className="block text-2xl md:text-4xl font-black text-white leading-none mb-1">{value}</span>
                        <span className="text-[10px] md:text-xs text-gray-300 font-bold uppercase tracking-wider">
                          {unit === 'days' ? 'يوم' : unit === 'hours' ? 'ساعة' : unit === 'minutes' ? 'دقيقة' : 'ثانية'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <Link href="#products" className="group bg-[#8A3324] text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 shadow-[0_10px_20px_rgba(138,51,36,0.4)] hover:bg-white hover:text-[#1A120B] hover:shadow-[0_10px_20px_rgba(255,255,255,0.2)] flex items-center gap-3 hover:-translate-y-1">
                  اكتشف الآن
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet { background-color: #fff; opacity: 0.3; width: 8px; height: 8px; transition: 0.3s; }
        .swiper-pagination-bullet-active { background-color: #D4A373; opacity: 1; width: 30px; border-radius: 4px; }
      `}</style>
    </section>
  );
}