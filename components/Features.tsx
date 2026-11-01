import { Truck, ShieldCheck, Coffee, Headphones } from 'lucide-react';

export default function Features() {
  const features = [
    { icon: Truck, title: 'توصيل سريع', desc: 'لجميع المحافظات' },
    { icon: ShieldCheck, title: 'دفع آمن', desc: 'حماية 100%' },
    { icon: Coffee, title: 'بن مختص', desc: 'محمص طازج' },
    { icon: Headphones, title: 'دعم فني', desc: 'متواجدين دائماً' },
  ];

  return (
    <div className="border-y border-gray-200 bg-white py-8">
      <div className="container mx-auto px-4 md:px-10">
        <div className="flex flex-wrap justify-center md:justify-between items-center gap-6 md:gap-0">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3 group cursor-pointer">
              <div className="bg-gray-50 p-2.5 rounded-full group-hover:bg-[#8A3324] transition-colors duration-300">
                <feature.icon className="w-5 h-5 text-[#8A3324] group-hover:text-white transition-colors duration-300" strokeWidth={2} />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-900">{feature.title}</h4>
                <p className="text-[11px] text-gray-500 font-medium">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}