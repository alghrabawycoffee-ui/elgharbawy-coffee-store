import { Truck, ShieldCheck, Coffee, Headphones } from 'lucide-react';

export default function Features() {
  const features = [
    { icon: Truck, title: 'توصيل سريع', desc: 'لجميع المحافظات' },
    { icon: ShieldCheck, title: 'دفع آمن', desc: 'حماية 100%' },
    { icon: Coffee, title: 'بن مختص', desc: 'محمص طازج' },
    { icon: Headphones, title: 'دعم فني', desc: 'متواجدين دائماً' },
  ];

  return (
    <div className="container mx-auto px-4 md:px-10 py-10 relative z-20 -mt-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white/80 backdrop-blur-md p-6 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 flex flex-col items-center text-center group border border-white cursor-pointer hover:-translate-y-2">
            <div className="bg-[#FDFBF7] p-4 rounded-full mb-4 group-hover:bg-[#8A3324] transition-colors duration-300 shadow-inner">
              <feature.icon className="w-7 h-7 text-[#8A3324] group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
            </div>
            <h4 className="font-bold text-sm md:text-base text-[#1A120B] mb-1">{feature.title}</h4>
            <p className="text-xs text-gray-500 font-medium">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}