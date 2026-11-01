import { Truck, ShieldCheck, Coffee, Headphones } from 'lucide-react';

export default function Features() {
  const features = [
    { icon: Truck, title: 'توصيل سريع', desc: 'لجميع محافظات مصر' },
    { icon: ShieldCheck, title: 'دفع آمن 100%', desc: 'فودافون كاش، فيزا، استلام' },
    { icon: Coffee, title: 'بن مختص', desc: 'محمص طازج يومياً' },
    { icon: Headphones, title: 'دعم فني', desc: 'متواجدين لخدمتك' },
  ];

  return (
    <div className="container mx-auto px-4 md:px-10 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-4 md:p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col items-center md:items-start md:flex-row gap-3 md:gap-4">
            <div className="bg-[#FAFAFA] p-2 md:p-3 rounded-full text-[#8A3324]">
              <feature.icon className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <div className="text-center md:text-right">
              <h4 className="font-bold text-sm md:text-base text-gray-800">{feature.title}</h4>
              <p className="text-[10px] md:text-sm text-gray-500 mt-1">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}