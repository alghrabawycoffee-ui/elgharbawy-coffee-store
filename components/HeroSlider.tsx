"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { getSupabase } from '../lib/supabase';

export default function HeroSlider() {
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
            
            <div className="absolute inset-0 w-full h-full">
              <img src={banner.image_url} alt="bg" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A120B] via-transparent to-[#1A120B]/30"></div>
            </div>
            
            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col justify-center items-center text-center">
              <span className="bg-[#A44222] text-white text-xs font-bold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase">
                {banner.tag}
              </span>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-[1.2] mb-6">
                {banner.title} <br />
                <span className="text-[#D4A373]">{banner.subtitle}</span>
              </h1>
              
              <p className="text-gray-300 text-sm md:text-lg mb-8 max-w-xl leading-relaxed">
                {banner.description}
              </p>

              <Link href="#products" className="bg-white text-[#1A120B] px-10 py-4 rounded-full font-black text-lg hover:bg-[#D4A373] hover:text-[#1A120B] transition-all hover:scale-105">
                تسوق الآن
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-pagination { bottom: 30px !important; }
        .swiper-pagination-bullet { background-color: #fff; opacity: 0.3; width: 8px; height: 8px; }
        .swiper-pagination-bullet-active { background-color: #A44222; opacity: 1; width: 30px; border-radius: 4px; }
      `}</style>
    </section>
  );
}