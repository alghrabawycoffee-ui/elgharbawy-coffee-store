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

  if (loading) return <div className="h-[500px] w-full bg-[#1A120B] animate-pulse"></div>;
  if (banners.length === 0) return null;

  return (
    <section className="relative w-full h-[550px] md:h-[650px] bg-[#1A120B]">
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
            <div className="absolute inset-0 w-full h-full">
              <img src={banner.image_url} alt="bg" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 md:bg-gradient-to-l md:from-[#1A120B]/95 md:via-[#1A120B]/70 md:to-transparent"></div>
            </div>
            
            {/* المحتوى */}
            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col justify-center items-center md:items-start text-center md:text-right">
              <span className="bg-[#8A3324] text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                {banner.tag}
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4 drop-shadow-xl">
                {banner.title} <br />
                <span className="text-[#D4A373]">{banner.subtitle}</span>
              </h1>
              
              <p className="text-gray-300 text-sm md:text-lg mb-8 max-w-lg leading-relaxed">
                {banner.description}
              </p>
              
              {/* العداد الزجاجي */}
              {banner.show_timer && (
                <div className="flex gap-3 mb-8">
                  {Object.entries(timeLeft).map(([unit, value]) => (
                    <div key={unit} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-2 md:p-3 text-center min-w-[60px] md:min-w-[80px]">
                      <span className="block text-xl md:text-3xl font-black text-white leading-none mb-1">{value}</span>
                      <span className="text-[10px] md:text-xs text-gray-300 font-bold">{unit === 'days' ? 'يوم' : unit === 'hours' ? 'ساعة' : unit === 'minutes' ? 'دقيقة' : 'ثانية'}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <Link href="#products" className="bg-white text-[#1A120B] px-8 py-3 rounded-full font-black flex items-center gap-2 hover:bg-[#D4A373] hover:text-white transition-all hover:scale-105 shadow-xl">
                تسوق الآن <ArrowLeft className="w-5 h-5" />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-pagination { bottom: 30px !important; }
        .swiper-pagination-bullet { background-color: #fff; opacity: 0.3; width: 8px; height: 8px; transition: 0.3s; }
        .swiper-pagination-bullet-active { background-color: #D4A373; opacity: 1; width: 30px; border-radius: 4px; }
      `}</style>
    </section>
  );
}