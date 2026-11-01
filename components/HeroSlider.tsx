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
      tag: "🔥 عرض محدود",
      title: "عروض الافتتاح",
      subtitle: "الكبرى وصلت!",
      desc: "خصم يصل إلى 50% على مجموعات القهوة المختصة وأدوات التقطير الاحترافية.",
      image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // صورة كيس البن
      showTimer: true,
    },
    {
      id: 2,
      tag: "✨ تجهيز احترافي",
      title: "أدوات التقطير",
      subtitle: "الاحترافية",
      desc: "كل اللي محتاجه عشان تعمل قهوة احترافية في البيت بأقل مجهود.",
      image: "https://images.unsplash.com/photo-1610889556528-9a770e32642f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", // صورة أداة التقطير
      showTimer: false,
    }
  ];

  return (
    <section className="mx-4 md:mx-10 mt-6 rounded-[2.5rem] overflow-hidden shadow-2xl h-[550px] md:h-[600px] relative bg-[#1A120B]">
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
            <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-10">
              
              {/* تأثير الإضاءة في الخلفية */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#D4A373] opacity-20 blur-[120px] rounded-full z-0 pointer-events-none"></div>

              {/* النص */}
              <div className="relative z-10 w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-right mt-10 md:mt-0">
                <span className="bg-white/10 backdrop-blur-md text-[#D4A373] text-xs md:text-sm font-bold px-4 py-2 rounded-full mb-6 border border-white/10">
                  {banner.tag}
                </span>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.1] mb-4 tracking-tight">
                  {banner.title} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A373] to-[#fdfbf7]">{banner.subtitle}</span>
                </h1>
                
                <p className="text-gray-400 text-sm md:text-lg mb-8 max-w-md leading-relaxed">
                  {banner.desc}
                </p>

                {banner.showTimer && (
                  <div className="flex gap-2 md:gap-4 mb-8">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                      <div key={unit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-3 md:p-4 text-center min-w-[65px] md:min-w-[80px] shadow-lg">
                        <span className="block text-2xl md:text-4xl font-black text-white leading-none mb-1">{value}</span>
                        <span className="text-[10px] md:text-xs text-gray-400 font-medium">
                          {unit === 'days' ? 'يوم' : unit === 'hours' ? 'ساعة' : unit === 'minutes' ? 'دقيقة' : 'ثانية'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <Link href="#products" className="bg-white text-[#1A120B] hover:bg-[#D4A373] hover:text-white font-black text-lg px-10 py-4 rounded-full transition-all duration-300 shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:shadow-[0_0_40px_rgba(212,163,115,0.5)] hover:-translate-y-1">
                  اكتشف الآن
                </Link>
              </div>

              {/* الصورة العائمة */}
              <div className="relative z-10 w-full md:w-1/2 h-full hidden md:flex items-center justify-center">
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-[80%] object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] animate-float"
                />
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet { background-color: #fff; opacity: 0.3; width: 8px; height: 8px; transition: 0.3s; }
        .swiper-pagination-bullet-active { background-color: #D4A373; opacity: 1; width: 24px; border-radius: 4px; }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
}