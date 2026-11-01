import { Star } from 'lucide-react';

export default function Testimonials() {
  const reviews = [
    { name: 'أميرة س.', text: 'القهوة التركية غنية وناعمة، مع رائحة منعشة منذ لحظة فتح الكيس. القهوة التركية غنية وناعمة، مع رائحة منعشة منذ لحظة فتح الكيس.', avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: 'كريم ح.', text: 'يتميز الإسبريسو بكرملة كثيفة ونكهة نظيفة، مما يجعله متعة من أول رشفة لآخر قطرة.', avatar: 'https://i.pravatar.cc/150?img=11' },
    { name: 'ليلى م.', text: 'حبوب البن تفوح منها رائحة منعشة ويتم تحضيرها بشكل مثالي. رائحة القهوة طازجة جداً.', avatar: 'https://i.pravatar.cc/150?img=5' },
  ];

  return (
    <div className="bg-[#FDFBF7] py-16">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex text-[#A44222] mb-4">
                {[1,2,3,4,5].map(star => <Star key={star} className="w-4 h-4 fill-current" />)}
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">"{review.text}"</p>
              <div className="flex items-center gap-3">
                <img src={review.avatar} alt={review.name} className="w-10 h-10 rounded-full object-cover" />
                <span className="font-bold text-sm text-gray-800">{review.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}