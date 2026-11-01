"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { getSupabase } from '../lib/supabase';
import { ArrowLeft } from 'lucide-react';

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

  if (loading) return <div className="h-[500px] w-full bg-gray-200 animate-pulse"></div>;
  if (banners.length === 0) return null;

  return (
    <section className="w-full bg-[#1A120B]">
      <Swiper 
        modules={[Autoplay, Pagination]} 
        spaceBetween={0} 
        slidesPerView={1} 
        loop={banners.length > 1}
        autoplay={{ delay: 5000, disableOnInteraction: false }} 
        pagination={{ clickable: true }} 
        className="w-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row h-auto md:h-[500px] items-center">
              
              {/* النص (يمين) */}
              <div className="w-full md:w-1/2 p-8 md:p-16 text-center md:text-right flex flex-col justify-center">
                <span className="text-[#D4A373] font-bold text-sm mb-4 tracking-widest uppercase">
                  {banner.tag}
                </span>
                <h1 className="text-4xl md:text-5xl font-black text-white leading-tight mb-6">
                  {banner.title} <br />
                  <span className="text-[#D4A373]">{banner.subtitle}</span>
                </h1>
                <p className="text-gray-300 text-sm md:text-base mb-8 leading-relaxed max-w-md mx-auto md:mx-0">
                  {banner.description}
                </p>
                <Link href="#products" className="bg-[#A44222] text-white px-8 py-3 rounded-lg font-bold inline-flex items-center justify-center gap-2 hover:bg-white hover:text-[#1A120B] transition-colors w-fit mx-auto md:mx-0">
                  تسوق الآن <ArrowLeft className="w-5 h-5" />
                </Link>
              </div>

              {/* الصورة (شمال) */}
              <div className="w-full md:w-1/2 h-[300px] md:h-full">
                <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
              </div>

            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <style jsx global>{`
        .swiper-pagination-bullet { background-color: #fff; opacity: 0.3; }
        .swiper-pagination-bullet-active { background-color: #A44222; opacity: 1; width: 24px; border-radius: 4px; }
      `}</style>
    </section>
  );
}