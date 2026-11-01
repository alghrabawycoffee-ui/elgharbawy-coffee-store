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
    <section className="relative w-full h-[450px] md:h-[600px] bg-[#3E2723]">
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
            <div className="absolute inset-0 w-full h-full">
              <img src={banner.image_url} alt="bg" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            
            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col justify-center items-start text-right">
              <h1 className="text-3xl md:text-5xl font-semibold text-white leading-tight mb-4">
                {banner.title} <br />
                <span className="text-gray-200 font-light">{banner.subtitle}</span>
              </h1>
              <p className="text-gray-300 text-sm md:text-base mb-8 max-w-md leading-relaxed font-light">
                {banner.description}
              </p>
              <Link href="#products" className="bg-[#A44222] text-white px-8 py-3 rounded-md font-medium text-sm hover:bg-[#852e14] transition-all duration-300">
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