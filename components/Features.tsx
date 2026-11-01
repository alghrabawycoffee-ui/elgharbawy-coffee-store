import { Truck, Leaf, CheckSquare, Box } from 'lucide-react';

export default function Features({ content }: { content: any }) {
  const features = [
    { icon: Truck, title: content.feature1_title, desc: content.feature1_desc },
    { icon: Leaf, title: content.feature2_title, desc: content.feature2_desc },
    { icon: CheckSquare, title: content.feature3_title, desc: content.feature3_desc },
    { icon: Box, title: content.feature4_title, desc: content.feature4_desc },
  ];

  return (
    <div className="bg-[#FDFBF7] py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center gap-3">
              <div className="text-gray-800 mb-2"><feature.icon className="w-8 h-8" strokeWidth={1} /></div>
              <h4 className="font-bold text-sm md:text-base text-gray-900">{feature.title}</h4>
              <p className="text-[11px] md:text-xs text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}