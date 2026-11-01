"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'lucide-react';
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

  if (loading) return <div className="h-[600px] w-full bg-[#FDFBF7] animate-pulse"></div>;
  if (banners.length === 0) return null;

  return (
    <section className="relative w-full h-[600px] md:h-[700px] bg-[#FDFBF7] overflow-hidden">
      <Swiper 
        modules={[Autoplay, EffectFade]} 
        effect="fade"
        spaceBetween={0} 
        slidesPerView={1} 
        loop={banners.length > 1}
        autoplay={{ delay: 5000, disableOnInteraction: false }} 
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="relative w-full h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full w-full max-w-7xl mx-auto px-4 md:px-10 items-center">
              
              {/* النص (يمين) */}
              <div className="order-2 md:order-1 flex flex-col justify-center h-full pt-10 md:pt-0 z-10">
                <span className="text-[#8A3324] font-black text-sm tracking-widest uppercase mb-4 flex items-center gap-2">
                  <span className="w-8 h-[2px] bg-[#8A3324]"></span>
                  {banner.tag}
                </span>
                
                <h1 className="text-5xl md:text-7xl lg:text-[5rem] font-black text-[#1A120B] leading-[1.1] mb-6 tracking-tighter">
                  {banner.title} <br />
                  <span className="text-[#D4A373]">{banner.subtitle}</span>
                </h1>
                
                <p className="text-gray-500 text-base md:text-lg mb-8 max-w-md leading-relaxed font-medium">
                  {banner.description}
                </p>
                
                <Link href="#products" className="group bg-[#1A120B] text-white w-fit px-8 py-4 rounded-full font-bold flex items-center gap-3 hover:bg-[#8A3324] transition-colors">
                  اكتشف المجموعة <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* الصورة (شمال) */}
              <div className="order-1 md:order-2 relative h-[300px] md:h-full flex items-center justify-center">
                {/* خلفية دائرية ملونة */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-[#EBE3DB] rounded-full blur-3xl opacity-50"></div>
                <img 
                  src={banner.image_url} 
                  alt={banner.title} 
                  className="relative z-10 w-full h-full object-contain drop-shadow-2xl"
                />
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}