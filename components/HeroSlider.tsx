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

  const banners = [
    {
      id: 1,
      tag: "عرض محدود",
      title: "عروض الافتتاح",
      subtitle: "الكبرى وصلت!",
      desc: "خصم يصل إلى 50% على مجموعات القهوة المختصة وأدوات التقطير الاحترافية.",
      // صورة كيس بن مقطوعة (Transparent)
      image: "https://png.pngtree.com/png-clipart/20230814/original/pngtree-coffee-bean-bag-mockup-png-image_10416557.png", 
      showTimer: true,
    },
    {
      id: 2,
      tag: "تجهيز احترافي",
      title: "أدوات التقطير",
      subtitle: "الاحترافية",
      desc: "كل اللي محتاجه عشان تعمل قهوة احترافية في البيت بأقل مجهود.",
      image: "https://png.pngtree.com/png-clipart/20230814/original/pngtree-coffee-maker-equipment-png-image_10416558.png", 
      showTimer: false,
    }
  ];

  return (
    <section className="mx-4 md:mx-8 mt-4 rounded-[2.5rem] overflow-hidden shadow-2xl h-[600px] md:h-[650px] relative bg-[#FDFBF7]">
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
            <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-10 overflow-hidden">
              
              {/* خلفية Mesh Gradient مودرن */}
              <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#D4A373] rounded-full mix-blend-multiply filter blur-[120px] opacity-40"></div>
              <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] bg-[#E8D5C4] rounded-full mix-blend-multiply filter blur-[100px] opacity-60"></div>

              {/* النص (يمين) */}
              <div className="relative z-10 w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-right">
                <span className="bg-white text-[#8A3324] text-xs md:text-sm font-black px-4 py-2 rounded-full mb-6 shadow-sm border border-gray-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                  {banner.tag}
                </span>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#1A120B] leading-[1.1] mb-4 tracking-tighter">
                  {banner.title} <br />
                  <span className="text-[#8A3324]">{banner.subtitle}</span>
                </h1>
                
                <p className="text-gray-600 text-base md:text-lg mb-8 max-w-md leading-relaxed font-medium">
                  {banner.desc}
                </p>

                {/* العداد الزجاجي */}
                {banner.showTimer && (
                  <div className="flex gap-3 mb-10">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                      <div key={unit} className="bg-white/60 backdrop-blur-xl border border-white/80 rounded-2xl p-3 md:p-4 text-center min-w-[70px] md:min-w-[85px] shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                        <span className="block text-2xl md:text-4xl font-black text-[#1A120B] leading-none mb-1">{value}</span>
                        <span className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-wider">
                          {unit === 'days' ? 'يوم' : unit === 'hours' ? 'ساعة' : unit === 'minutes' ? 'دقيقة' : 'ثانية'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <Link href="#products" className="group bg-[#1A120B] text-white font-bold text-lg px-10 py-4 rounded-full transition-all duration-300 shadow-[0_10px_20px_rgba(26,18,11,0.3)] hover:bg-[#8A3324] hover:shadow-[0_10px_20px_rgba(138,51,36,0.4)] flex items-center gap-3">
                  اكتشف الآن
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* الصورة الطايرة (شمال) */}
              <div className="relative z-10 w-full md:w-1/2 h-full hidden md:flex items-center justify-center">
                <img 
                  src={banner.image} 
                  alt={banner.title} 
                  className="w-[90%] object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.2)] animate-[float_6s_ease-in-out_infinite]"
                />
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .swiper-pagination-bullet { background-color: #1A120B; opacity: 0.2; width: 8px; height: 8px; transition: 0.3s; }
        .swiper-pagination-bullet-active { background-color: #8A3324; opacity: 1; width: 30px; border-radius: 4px; }
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(2deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
    </section>
  );
}