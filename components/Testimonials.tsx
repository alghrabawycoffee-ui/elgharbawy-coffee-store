import { Star } from 'lucide-react';

export default function Testimonials({ content }: { content: any }) {
  const reviews = [
    { name: content.testimonial1_name, text: content.testimonial1_text, avatar: 'https://i.pravatar.cc/150?img=1' },
    { name: content.testimonial2_name, text: content.testimonial2_text, avatar: 'https://i.pravatar.cc/150?img=11' },
    { name: content.testimonial3_name, text: content.testimonial3_text, avatar: 'https://i.pravatar.cc/150?img=5' },
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