import { Truck, Leaf, CheckSquare, Box } from 'lucide-react';

export default function Features() {
  const features = [
    { icon: Truck, title: 'توصيل سريع', desc: 'قهوة طازجة حتى باب منزلك.' },
    { icon: Leaf, title: 'محمص طازج', desc: 'رائحة غنية في كل كوب.' },
    { icon: CheckSquare, title: 'قهوة فاخرة', desc: 'ناعم، غني، ومتوازن.' },
    { icon: Box, title: 'قهوتك على ذوقك', desc: 'قهوة تركية، إسبريسو، أو حبوب كاملة.' },
  ];

  return (
    <div className="bg-[#FDFBF7] py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              <div className="text-gray-800 mb-2">
                <feature.icon className="w-8 h-8" strokeWidth={1} />
              </div>
              <h4 className="font-bold text-sm md:text-base text-gray-900">{feature.title}</h4>
              <p className="text-[11px] md:text-xs text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}