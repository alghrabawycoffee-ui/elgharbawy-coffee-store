"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ArrowLeft } from 'lucide-react';
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
    <section className="relative w-full h-[500px] md:h-[600px] bg-[#1A120B]">
      <Swiper 
        modules={[Autoplay, Pagination]} 
        spaceBetween={0} 
        slidesPerView={1} 
        loop={banners.length > 1}
        autoplay={{ delay: 5000, disableOnInteraction: false }} 
        pagination={{ clickable: true }} 
        className="w-full h-full"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner.id} className="relative w-full h-full">
            
            {/* الخلفية - مضمونة إنها متغطيش على النص */}
            <div className="absolute inset-0 w-full h-full">
              <img 
                src={banner.image_url} 
                alt={banner.title} 
                className="w-full h-full object-cover" 
              />
              {/* طبقة تظليل قوية لضمان قراءة النص */}
              <div className="absolute inset-0 bg-black/60 md:bg-gradient-to-l md:from-[#1A120B]/95 md:via-[#1A120B]/70 md:to-transparent"></div>
            </div>
            
            {/* المحتوى */}
            <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-6 md:px-10 flex flex-col justify-center items-center md:items-start text-center md:text-right">
              <span className="bg-[#8A3324] text-white text-xs md:text-sm font-bold px-4 py-1.5 rounded-full mb-6">
                {banner.tag}
              </span>
              
              <h1 className="text-4xl md:text-6xl font-black text-white leading-tight mb-4">
                {banner.title} <br />
                <span className="text-[#D4A373]">{banner.subtitle}</span>
              </h1>
              
              <p className="text-gray-300 text-sm md:text-lg mb-8 max-w-lg leading-relaxed">
                {banner.description}
              </p>
              
              <Link href="#products" className="bg-white text-[#1A120B] px-8 py-3 rounded-full font-bold flex items-center gap-2 hover:bg-[#D4A373] transition-colors">
                تسوق الآن <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}