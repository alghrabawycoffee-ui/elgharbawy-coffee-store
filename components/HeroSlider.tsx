"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { ArrowLeft } from 'lucide-react';
import { getSupabase } from '../lib/supabase';

export default function HeroSlider() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = getSupabase();
    const fetchBanners = async () => {
      const { data } = await supabase.from('banners').select('*').eq('is_active', true).order('created_at');
      if (data) setBanners(data);
      setLoading(false);
    };
    fetchBanners();

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

  if (loading) return <div className="h-[85vh] w-full bg-[#1A120B] animate-pulse"></div>;
  if (banners.length === 0) return null;

  return (
    <section className="relative w-full h-[85vh] md:h-[95vh] bg-[#1A120B]">
      <Swiper 
        modules={[Autoplay, EffectFade, Pagination]} 
        effect="fade"
        spaceBetween={0} 
        slidesPerView={1} 
        loop={banners.length > 1}
        autoplay={{ delay: 6000, disableOnInteraction: false }} 
        pagination={{ clickable: true }} 
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="relative w-full h-full">
            
            {/* الخلفية السينمائية */}
            <div className="absolute inset-0">
              <img src={banner.image_url} alt="bg" className="w-full h-full object-cover scale-105 animate-[slowZoom_20s_ease-in-out_infinite]" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1A120B] via-[#1A120B]/80 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-transparent to-transparent"></div>
            </div>
            
            {/* المحتوى */}
            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col justify-center items-start text-right">
              
              <div className="bg-white/10 backdrop-blur-md border border-white/10 text-white text-xs font-bold px-4 py-2 rounded-full mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#D4A373] animate-pulse"></span>
                {banner.tag}
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] mb-6 tracking-tight drop-shadow-2xl max-w-3xl">
                {banner.title} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4A373] to-[#FDFBF7]">{banner.subtitle}</span>
              </h1>
              
              <p className="text-gray-300 text-base md:text-xl mb-10 max-w-lg leading-relaxed font-medium">
                {banner.description}
              </p>
              
              {banner.show_timer && (
                <div className="flex gap-3 md:gap-4 mb-10">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-4 text-center min-w-[70px] md:min-w-[90px]">
                      <span className="block text-3xl md:text-5xl font-black text-white leading-none mb-2">{value}</span>
                      <span className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-widest">{unit === 'days' ? 'يوم' : unit === 'hours' ? 'ساعة' : unit === 'minutes' ? 'دقيقة' : 'ثانية'}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <Link href="#products" className="group bg-[#D4A373] text-[#1A120B] font-black text-lg px-12 py-4 rounded-full transition-all duration-300 hover:bg-white hover:scale-105 flex items-center gap-3">
                تسوق الآن <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-pagination { bottom: 30px !important; }
        .swiper-pagination-bullet { background-color: #fff; opacity: 0.3; width: 8px; height: 8px; transition: 0.3s; }
        .swiper-pagination-bullet-active { background-color: #D4A373; opacity: 1; width: 40px; border-radius: 4px; }
        @keyframes slowZoom { 0% { transform: scale(1); } 50% { transform: scale(1.1); } 100% { transform: scale(1); } }
      `}</style>
    </section>
  );
}