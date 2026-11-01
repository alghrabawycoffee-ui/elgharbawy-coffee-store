import Image from 'next/image';
import { Coffee, Award } from 'lucide-react';

export default function BrandStory() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* الصورة (شمال) */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-[#D4A373] rounded-[3rem] rotate-3 group-hover:rotate-6 transition-transform duration-500 opacity-20"></div>
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
              alt="Brand Story" 
              className="relative z-10 w-full h-[400px] md:h-[500px] object-cover rounded-[3rem] shadow-2xl"
            />
            {/* كارت عائم صغير */}
            <div className="absolute -bottom-8 -right-8 z-20 bg-white p-6 rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 flex items-center gap-4 animate-float">
              <div className="bg-[#8A3324] p-3 rounded-full text-white"><Award className="w-6 h-6" /></div>
              <div>
                <p className="text-sm font-black text-gray-900">أجود أنواع البن</p>
                <p className="text-xs text-gray-500 font-bold">محمص طازج يومياً</p>
              </div>
            </div>
          </div>

          {/* النص (يمين) */}
          <div className="w-full lg:w-1/2 text-center lg:text-right">
            <span className="text-[#8A3324] font-black text-sm tracking-widest uppercase mb-4 block">قصتنا</span>
            <h2 className="text-4xl md:text-6xl font-black text-[#1A120B] leading-[1.1] mb-6">
              شغف القهوة <br />
              <span className="text-[#D4A373]">في كل قطرة.</span>
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
              في "الغرباوي"، إحنا مش بس بنبيع قهوة. إحنا بنقدم تجربة كاملة تبدأ من اختيار أجود الحبوب من المزارع العالمية، وبتعدي بمراحل تحميص دقيقة، لحد ما توصل لك كوب قهوة يستحق كل لحظة.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="border-r-4 border-[#D4A373] pr-4">
                <h4 className="text-3xl font-black text-[#8A3324]">+50</h4>
                <p className="text-sm text-gray-500 font-bold">نوع بن مختص</p>
              </div>
              <div className="border-r-4 border-[#D4A373] pr-4">
                <h4 className="text-3xl font-black text-[#8A3324]">+10k</h4>
                <p className="text-sm text-gray-500 font-bold">عميل سعيد</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}