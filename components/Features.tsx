import { Truck, ShieldCheck, Coffee, Headphones } from 'lucide-react';

export default function Features() {
  const features = [
    { icon: Truck, title: 'توصيل سريع', desc: 'لجميع محافظات مصر' },
    { icon: ShieldCheck, title: 'دفع آمن 100%', desc: 'فودافون كاش، فيزا، استلام' },
    { icon: Coffee, title: 'بن مختص', desc: 'محمص طازج يومياً' },
    { icon: Headphones, title: 'دعم فني', desc: 'متواجدين لخدمتك' },
  ];

  return (
    <div className="container mx-auto px-4 md:px-10 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col items-center text-center group border border-gray-50">
            <div className="bg-[#8A3324]/5 p-4 rounded-full mb-4 group-hover:bg-[#8A3324] transition-colors duration-300">
              <feature.icon className="w-8 h-8 text-[#8A3324] group-hover:text-white transition-colors duration-300" />
            </div>
            <h4 className="font-black text-sm md:text-lg text-gray-800 mb-1">{feature.title}</h4>
            <p className="text-xs md:text-sm text-gray-500 font-medium">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}