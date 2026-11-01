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

  if (loading) return <div className="h-[600px] w-full bg-[#F9F6F0] animate-pulse"></div>;
  if (banners.length === 0) return null;

  return (
    <section className="relative w-full h-auto min-h-[600px] md:h-[700px] bg-[#F9F6F0] overflow-hidden">
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
          <SwiperSlide key={banner.id} className="relative w-full h-full flex items-center">
            
            <div className="max-w-7xl mx-auto w-full px-6 md:px-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-20 md:py-0">
              
              {/* النص - الجزء الأيمن */}
              <div className="order-2 md:order-1 text-center md:text-right z-10">
                <span className="text-[#8A3324] font-bold tracking-[0.2em] text-xs md:text-sm uppercase mb-4 block">
                  {banner.tag}
                </span>
                
                <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-light text-[#1C1512] leading-[1.1] mb-6">
                  {banner.title} <br />
                  <span className="font-black text-[#8A3324]">{banner.subtitle}</span>
                </h1>
                
                <p className="text-gray-500 text-sm md:text-lg mb-10 max-w-md mx-auto md:mx-0 leading-relaxed">
                  {banner.description}
                </p>
                
                {/* العداد الفاخر - بدون صناديق */}
                {banner.show_timer && (
                  <div className="flex justify-center md:justify-start gap-6 mb-10 text-center">
                    {Object.entries(timeLeft).map(([unit, value]) => (
                      <div key={unit} className="flex flex-col items-center">
                        <span className="text-3xl md:text-4xl font-light text-[#1C1512]">{value}</span>
                        <span className="text-[10px] md:text-xs text-gray-400 font-bold uppercase tracking-wider mt-1">
                          {unit === 'days' ? 'أيام' : unit === 'hours' ? 'ساعات' : unit === 'minutes' ? 'دقائق' : 'ثواني'}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
                
                <Link href="#products" className="inline-flex items-center gap-3 border-b-2 border-[#1C1512] pb-2 text-[#1C1512] font-bold text-lg hover:text-[#8A3324] hover:border-[#8A3324] transition-all group">
                  اكتشف المجموعة
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
                </Link>
              </div>

              {/* الصورة - الجزء الأيسر */}
              <div className="order-1 md:order-2 relative h-[300px] md:h-[500px] flex items-center justify-center">
                {/* دايرة ذهبية باهتة في الخلفية */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[450px] md:h-[450px] bg-[#D4A373]/20 rounded-full blur-3xl"></div>
                <img 
                  src={banner.image_url} 
                  alt={banner.title} 
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl animate-float"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-pagination { bottom: 20px !important; }
        .swiper-pagination-bullet { background-color: #8A3324; opacity: 0.2; width: 6px; height: 6px; }
        .swiper-pagination-bullet-active { opacity: 1; width: 20px; border-radius: 4px; }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }
      `}</style>
    </section>
  );
}