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

  if (loading) return <div className="h-[500px] w-full bg-[#3E2723] animate-pulse"></div>;
  if (banners.length === 0) return null;

  return (
    <section className="relative w-full h-[500px] md:h-[600px] bg-[#3E2723]">
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
            
            {/* الخلفية */}
            <div className="absolute inset-0 w-full h-full">
              <img src={banner.image_url} alt="bg" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
            
            {/* المحتوى (نفس تقسيمة بن مصر) */}
            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col justify-center items-start text-right">
              <h1 className="text-4xl md:text-6xl font-black text-white leading-[1.3] mb-4 drop-shadow-lg">
                {banner.title} <br />
                {banner.subtitle}
              </h1>
              <p className="text-gray-100 text-sm md:text-lg mb-8 max-w-lg leading-relaxed drop-shadow-md">
                {banner.description}
              </p>
              <Link href="#products" className="bg-[#D35400] text-white px-8 py-3 rounded-md font-bold text-lg hover:bg-[#A04000] transition-colors shadow-lg">
                متجر القهوة
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-pagination { bottom: 20px !important; text-align: left !important; padding-left: 50px !important; }
        .swiper-pagination-bullet { background-color: #fff; opacity: 0.5; width: 8px; height: 8px; }
        .swiper-pagination-bullet-active { background-color: #D35400; opacity: 1; width: 25px; border-radius: 4px; }
      `}</style>
    </section>
  );
}