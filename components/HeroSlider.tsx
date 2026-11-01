"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { getSupabase } from '../lib/supabase';
import { ArrowLeft } from 'lucide-react';

export default function HeroSlider() {
  const [banners, setBanners] = useState<any[]>([]);

  useEffect(() => {
    const supabase = getSupabase();
    const fetchBanners = async () => {
      const { data } = await supabase.from('banners').select('*').eq('is_active', true).order('created_at');
      if (data) setBanners(data);
    };
    fetchBanners();
  }, []);

  if (banners.length === 0) return null;

  return (
    <section className="relative w-full h-[85vh] md:h-[90vh] bg-[#1A120B] overflow-hidden">
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
            
            {/* الخلفية مع حركة الزووم */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img 
                src={banner.image_url} 
                alt="bg" 
                className="w-full h-full object-cover animate-slow-zoom opacity-80" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-[#1A120B]/40 to-transparent"></div>
            </div>
            
            {/* المحتوى */}
            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col justify-end pb-24 md:pb-32 items-start text-right">
              
              <span className="bg-white/10 backdrop-blur-md text-white text-xs md:text-sm font-medium px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase border border-white/20">
                {banner.tag}
              </span>
              
              <h1 className="text-5xl md:text-7xl lg:text-[7rem] font-bold text-white leading-[1.1] mb-6 tracking-tight drop-shadow-2xl max-w-4xl">
                {banner.title} <br />
                <span className="text-[#D4A373] font-light">{banner.subtitle}</span>
              </h1>
              
              <p className="text-gray-200 text-sm md:text-lg mb-10 max-w-lg leading-relaxed font-light">
                {banner.description}
              </p>
              
              <Link 
                href="#products" 
                className="group bg-white text-[#1A120B] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#D4A373] hover:text-[#1A120B] transition-all duration-300 flex items-center gap-3 transform hover:scale-105"
              >
                تسوق الآن <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-pagination { bottom: 40px !important; text-align: center !important; }
        .swiper-pagination-bullet { background-color: #fff; opacity: 0.4; width: 8px; height: 8px; }
        .swiper-pagination-bullet-active { background-color: #D4A373; opacity: 1; width: 30px; border-radius: 4px; }
      `}</style>
    </section>
  );
}