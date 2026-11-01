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
    <section className="relative w-full h-[600px] md:h-[700px] bg-[#1A120B]">
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
            
            {/* الخلفية */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={banner.image_url} 
                alt="bg" 
                className="w-full h-full object-cover" 
              />
              {/* تظليل أقوى عشان النص يبان */}
              <div className="absolute inset-0 bg-black/50"></div>
            </div>
            
            {/* المحتوى - في النص بالظبط عشان يبقى متوازن */}
            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-16 flex flex-col justify-center items-center text-center">
              
              <span className="bg-[#8B3A1A] text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-6 tracking-widest uppercase shadow-lg">
                {banner.tag}
              </span>
              
              {/* خط عنوان ضخم بس متحكم فيه */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-snug mb-6 max-w-4xl drop-shadow-lg">
                {banner.title} <br />
                <span className="text-[#D4A373]">{banner.subtitle}</span>
              </h1>
              
              <p className="text-gray-200 text-sm md:text-base mb-10 max-w-xl leading-relaxed">
                {banner.description}
              </p>
              
              <Link 
                href="#products" 
                className="group bg-white text-[#1A120B] px-10 py-4 rounded-full font-bold text-lg hover:bg-[#D4A373] transition-all duration-300 flex items-center gap-3 shadow-xl"
              >
                تسوق الآن <ArrowLeft className="w-5 h-5 group-hover:-translate-x-2 transition-transform" />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-pagination { bottom: 30px !important; }
        .swiper-pagination-bullet { background-color: #fff; opacity: 0.4; width: 8px; height: 8px; }
        .swiper-pagination-bullet-active { background-color: #D4A373; opacity: 1; width: 30px; border-radius: 4px; }
      `}</style>
    </section>
  );
}