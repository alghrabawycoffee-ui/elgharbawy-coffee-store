"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { getSupabase } from '../lib/supabase';

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
    <section className="relative w-full h-[400px] md:h-[550px] bg-[#3E2723] overflow-hidden">
      <Swiper 
        modules={[Autoplay, EffectFade, Pagination]} 
        effect="fade"
        spaceBetween={0} 
        slidesPerView={1} 
        loop={banners.length > 1}
        autoplay={{ delay: 5000, disableOnInteraction: false }} 
        pagination={{ clickable: true }} 
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="relative w-full h-full">
            
            {/* الخلفية مع حركة الزووم */}
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img src={banner.image_url} alt="bg" className="w-full h-full object-cover animate-slow-zoom" />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            
            {/* المحتوى مع حركة الطلوع */}
            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col justify-center items-start text-right animate-fade-in-up">
              <h1 className="text-3xl md:text-5xl font-black text-white leading-[1.3] mb-4 drop-shadow-md">
                {banner.title} <br />
                <span className="text-white">{banner.subtitle}</span>
              </h1>
              <p className="text-gray-100 text-sm md:text-base mb-8 max-w-md leading-relaxed drop-shadow-sm">
                {banner.description}
              </p>
              <Link href="#products" className="bg-[#A44222] text-white px-8 py-3 rounded-md font-bold text-sm md:text-base hover:bg-white hover:text-[#A44222] transition-all duration-300 transform hover:scale-105">
                متجر القهوة
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-pagination { bottom: 20px !important; text-align: left !important; padding-left: 60px !important; }
        .swiper-pagination-bullet { background-color: #fff; opacity: 0.5; }
        .swiper-pagination-bullet-active { background-color: #A44222; opacity: 1; width: 25px; border-radius: 4px; }
      `}</style>
    </section>
  );
}